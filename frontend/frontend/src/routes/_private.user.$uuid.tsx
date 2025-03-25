import Snackbar from '@/components/Snackbar'
import CustomSearchDialog, { SearchFormState } from '@/components/table/CustomSearchDialog'
import useTaskHistory from '@/components/table/useTaskHistory'
import useSnackbar from '@/hooks/useSnackbar'
import useSubmission from '@/hooks/useSubmission'
import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning'
import { mapApiDataToTasks, PaginatedTasksResponse } from '@/types/task'
import { Button } from '@material-tailwind/react'
import { useMemo, useState } from 'react'
import { useLoaderData, useRevalidator, useSearchParams } from 'react-router-dom'
import {
  addRandomTasks,
  saveEditedTasks
} from '../actions/_private.tasks'
import { TableWithStripedRows } from '../components/table/Table'
import { useAuth } from '../hooks/auth'

export default function UserProfile(): JSX.Element {
  const revalidator = useRevalidator()
  const auth = useAuth()
  if (!auth) {
    throw Error("Unhandled authentication error")
  }
  const userName = auth.user ? auth.user.email.split('@')[0] : 'user';

  const fetchedData = useLoaderData() as PaginatedTasksResponse; //TODO: Use a type-guard instead of casting
  const { data, ...paginationData } = fetchedData;
  const initialTasks = useMemo(() => mapApiDataToTasks(data), [fetchedData]);
  const {
    tasks,
    setTasks,
    undoStack,
    setUndoStack,
    redoStack,
    setRedoStack,
    addChange,
    undo,
    redo,
    discardChanges,
    hasChanges
  } = useTaskHistory(initialTasks);

  const ongoingTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);
  useUnsavedChangesWarning(hasChanges);

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const currentPage = parseInt(urlSearchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(paginationData.count / paginationData.pageSize);

  const getInitialSearchForm = (): SearchFormState => ({
    category: urlSearchParams.get('category') || '',
    is_favorite: urlSearchParams.get('is_favorite') === 'true',
    ordering: urlSearchParams.get('ordering') || '',
    search: urlSearchParams.get('search') || ''
  });
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchFormState>(getInitialSearchForm());

  const { snackbar, showSnackbar } = useSnackbar();
  const { isSubmittingData, runSubmission } = useSubmission(showSnackbar);

  const handleAddRandomTasks = async () => {
    await runSubmission(async () => {
      const response = await addRandomTasks();
      revalidator.revalidate(); //TODO: Check for race conditions here
      return response;
    });
  };

  const handleSaveEditedTasks = async () => {
    const editedTasks = tasks.filter(task => task.isEdited);
    if (editedTasks.length === 0) return;

    await runSubmission(async () => {
      const response = await saveEditedTasks(editedTasks);
      setUndoStack([]);
      setRedoStack([]);
      revalidator.revalidate();
      return response;
    });
  };

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      urlSearchParams.get('category') ||
      urlSearchParams.get('is_favorite') ||
      urlSearchParams.get('ordering') ||
      urlSearchParams.get('search')
    );
  }, [urlSearchParams]);

  const handleOpenSearchDialog = () => {
    if (hasChanges) {
      alert("You have unsaved changes. Please save or discard them before searching.");
      return;
    }
    setSearchForm(getInitialSearchForm());
    setSearchDialogOpen(true);
  };

  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false);
  };

  const handleSearchSubmit = (searchForm: SearchFormState) => {
    // TODO: Fix: If is_favorite is false it won't be added.
    const newParams: Record<string, string> = {};
    if (searchForm.category) {
      newParams.category = searchForm.category;
    }
    if (searchForm.is_favorite) {
      newParams.is_favorite = 'true';
    }
    if (searchForm.ordering.trim()) {
      newParams.ordering = searchForm.ordering;
    }
    if (searchForm.search.trim()) {
      newParams.search = searchForm.search;
    }
    newParams.page = '1';

    setUrlSearchParams(newParams);
    setRedoStack([]);
    setSearchDialogOpen(false);
  };

  const handleClearAllFilters = () => {
    if (hasChanges) {
      alert("You have unsaved changes. Please save or discard them");
      return;
    }
    setUrlSearchParams({});
    setRedoStack([]);
    setSearchForm(getInitialSearchForm());
  };

  const handlePreviousPage = () => {
    if (hasChanges) {
      alert("Please save or discard changes first");
      return;
    }
    if (currentPage <= 1) return;
    const newParams = {
      ...Object.fromEntries(urlSearchParams.entries()),
      page: (currentPage - 1).toString()
    };
    setUrlSearchParams(newParams);
    setRedoStack([]);
  };

  const handleNextPage = () => {
    if (hasChanges) {
      alert("Please save or discard changes first");
      return;
    }
    if (currentPage >= totalPages) return;
    const newParams = {
      ...Object.fromEntries(urlSearchParams.entries()),
      page: (currentPage + 1).toString()
    };
    setUrlSearchParams(newParams);
    setRedoStack([]);
  };

  const buttonClass = "font-gotham-light px-5 py-2 normal-case text-sm text-text hover:text-accent border-text";
  return (
    <div className="flex flex-col w-full h-full gap-5 p-5 items-start bg-gray-100">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl">Hello {userName}</h1>
        <div className='w-48'>
          <Button className={buttonClass} variant="outlined"
            onClick={handleOpenSearchDialog}
          >
            Custom Search
          </Button>
          {(hasActiveFilters && !isSubmittingData) && (
            <Button variant="outlined"
              onClick={handleClearAllFilters}
              className="ml-2 px-2 py-1 rounded-full border border-gray-300 hover:scale-110 duration-200"
              title="Clear all filters"
            >
              ✕
            </Button>
          )}
        </div>
        <Button className={buttonClass} variant="outlined"
          onClick={auth.logoutUser}
        >
          Log Out
        </Button>
      </div>
      <TableWithStripedRows
        tasks={ongoingTasks}
        setTasks={setTasks}
        addChange={addChange}
      />
      <div className="flex gap-10">
        <Button className={buttonClass} variant="outlined"
          disabled={isSubmittingData}
          onClick={handleAddRandomTasks}
        >
          Add random tasks
        </Button>
        <Button className={buttonClass} variant="outlined"
          disabled={!hasChanges}
          onClick={discardChanges}
        >
          Discard changes
        </Button>
        <Button className={buttonClass} variant="outlined"
          disabled={isSubmittingData || !hasChanges}
          onClick={handleSaveEditedTasks}
        >
          Save changes
        </Button>
        <p className='px-5 py-2'>edits: {undoStack.length}</p>
        {!isSubmittingData &&
          <>
            <img
              className={`hover:scale-125 hover:cursor-pointer duration-200 ${!hasChanges ? 'opacity-0 pointer-events-none' : ''}`}
              src='/undo.svg'
              height={30}
              width={30}
              onClick={undo}
              alt="Undo change"
            />
            <img
              className={`hover:scale-125 hover:cursor-pointer duration-200 ${redoStack.length <= 0 ? 'opacity-0 pointer-events-none' : ''}`}
              src='/redo.svg'
              height={30}
              width={30}
              onClick={redo}
              alt="Redo change"
            />
          </>
        }

      </div>
      <div className="fixed bottom-5 right-5 flex items-center gap-2">
        <Button variant="outlined" size="sm"
          className='hover:scale-110'
          disabled={currentPage <= 1 || isSubmittingData}
          onClick={handlePreviousPage}>
          &lt;
        </Button>
        <span className="text-base">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="outlined" size="sm"
          className='hover:scale-110'
          disabled={currentPage >= totalPages || isSubmittingData}
          onClick={handleNextPage}>
          &gt;
        </Button>
      </div>
      <CustomSearchDialog
        open={searchDialogOpen}
        initialSearchForm={searchForm}
        onClose={handleCloseSearchDialog}
        onSubmit={handleSearchSubmit}
      />
      <Snackbar snackbar={snackbar} />
    </div>
  )
}
