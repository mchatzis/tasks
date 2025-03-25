import { useTableHandlers } from '@/components/table/useTableHandlers';
import { Task, TaskCategory, TaskChange } from '@/types/task';
import { Button, Typography } from '@material-tailwind/react';
import { memo, useEffect, useMemo, useState } from 'react';
import CommentsDialog from './CommentsDialog';

interface TaskRowProps {
    index: number;
    task: Task;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addChange: (change: TaskChange) => void;
}
const TaskRow = memo(
    ({
        index,
        task,
        setTasks,
        addChange
    }: TaskRowProps) => {
        const { id, title, category, is_favorite, deadline, comments, completed } = task;

        const [titleInputValue, setTitleInputValue] = useState(title);
        useEffect(() => {
            setTitleInputValue(title);
        }, [title]);

        const [isCommentsOpen, setIsCommentsOpen] = useState(false);
        const {
            handleEditTitle,
            handleSetCategory,
            handleSetIsFavorite,
            handleSetCompleted,
            handleEditDeadline
        } = useTableHandlers({ setTasks, addChange });

        const categoryOptions = useMemo(() => (
            Object.values(TaskCategory).map((cat) => (
                <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
            ))
        ), []);

        return (
            <>
                <tr className="even:bg-blue-gray-50/50">
                    <td className="px-2">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {index + 1}
                        </Typography>
                    </td>
                    <td className="p-1">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            <textarea
                                className="bg-transparent p-1 text-base w-full text-wrap"
                                value={titleInputValue}
                                maxLength={50}
                                onChange={(e) => setTitleInputValue(e.target.value)}
                                onBlur={() => handleEditTitle(id, title, titleInputValue)}
                            />
                        </Typography>
                    </td>
                    <td className="p-1">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            <select
                                className="bg-transparent p-3 text-base w-full cursor-pointer"
                                value={category}
                                onChange={(e) => handleSetCategory(id, e.target.value as TaskCategory)}
                            >
                                {categoryOptions}
                            </select>
                        </Typography>
                    </td>
                    <td className="p-1">
                        <div className='flex justify-center items-center'>
                            <input
                                type="checkbox"
                                checked={is_favorite}
                                onChange={(e) => handleSetIsFavorite(id, e.target.checked)}
                            />
                        </div>
                    </td>
                    <td
                        className={`p-1 ${!completed && new Date(deadline) < new Date() ? 'text-red-400' : ''}`}
                    >
                        <input
                            type="datetime-local"
                            value={new Date(deadline).toISOString().slice(0, 16)} // convert ISO to datetime-local format
                            onChange={(e) => handleEditDeadline(id, e.target.value)}
                            className="bg-transparent p-3 text-base w-full"
                        />
                    </td>
                    <td className="p-1">
                        <div className='flex justify-center'>
                            <div className="relative inline-block">
                                <img
                                    className="opacity-85 hover:opacity-100 hover:cursor-pointer duration-200"
                                    src="/comment.svg"
                                    height={25}
                                    width={25}
                                    onClick={() => setIsCommentsOpen(true)}
                                    alt="Comments"
                                />
                                {comments.length > 0 && (
                                    <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
                                )}
                            </div>
                        </div>
                    </td>
                    <td className="p-1 text-right">
                        <Button
                            className="bg-transparent py-2 normal-case text-sm text-text border border-text "
                            onClick={() => handleSetCompleted(id, !completed)}
                        >
                            Complete
                        </Button>
                    </td>
                </tr>
                <CommentsDialog
                    taskId={id}
                    comments={comments}
                    isCommentsOpen={isCommentsOpen}
                    setIsCommentsOpen={setIsCommentsOpen}
                />
            </>
        );
    }
);

export default TaskRow;
