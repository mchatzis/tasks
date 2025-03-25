import { Task, TaskChange } from '@/types/task';
import { Card, Typography } from '@material-tailwind/react';
import { useMemo, useState } from 'react';
import TaskRow from './TaskRow';
import { ColumnKey, filterableCols, sortableCols, tableCols } from './tableConstants';
import { filterTasks, sortTasks } from './tableUtils';


interface TableWithStripedRowsProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addChange: (change: TaskChange) => void;
}

export function TableWithStripedRows({
  tasks,
  setTasks,
  addChange
}: TableWithStripedRowsProps) {
  const [filters, setFilters] = useState(filterableCols);
  const [sortColumn, setSortColumn] = useState<ColumnKey | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleClickSort = (columnKey: ColumnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (columnKey: ColumnKey, value: string) => {
    setFilters((prev) => ({ ...prev, [columnKey]: value }));
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortColumn ? sortTasks(filtered, sortColumn, sortOrder) : filtered;
  }, [tasks, filters, sortColumn, sortOrder]);

  return (
    <div className='relative h-[80%] w-full'>
      <Card className="h-full w-full rounded-r-lg overflow-y-auto">
        <button className='absolute z-20 left-0 translate-x-4 translate-y-10 line-through'
          onClick={() => setSortColumn(null)}
        >⇅
        </button>
        <table className="text-left table-fixed">
          <thead className="sticky top-0 z-10">
            <tr className='relative'>
              {(Object.keys(tableCols) as ColumnKey[]).map((col) => (
                <th
                  key={col}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {tableCols[col].label}
                      </Typography>
                      {col in sortableCols ?
                        <span className="ml-1 cursor-pointer"
                          onClick={() => handleClickSort(col)}
                        >
                          {sortColumn === col ? (sortOrder === 'asc' ? '↑' : '↓') : '⇅'}
                        </span> : null
                      }
                    </div>
                    <div className="mt-1 h-8">
                      {col in filterableCols ? (
                        <input
                          type="text"
                          value={filters[col as keyof typeof filters]}
                          onChange={(e) => handleFilterChange(col, e.target.value)}
                          placeholder={`Filter ${tableCols[col].label}`}
                          className="p-1 border rounded w-full"
                        />
                      ) : null}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks.map((task, index) => (
              <TaskRow
                key={task.id}
                index={index}
                task={task}
                setTasks={setTasks}
                addChange={addChange}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
