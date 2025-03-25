import { Task, TaskCategory, TaskChange } from '@/types/task';
import { useCallback } from 'react';

interface UseTableHandlersProps {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addChange: (change: TaskChange) => void;
}

export function useTableHandlers({ setTasks, addChange }: UseTableHandlersProps) {
    const updateLocalTasks = useCallback(({ taskId, changes }: TaskChange) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, ...changes, isEdited: true } : task
            )
        );
        addChange({ taskId, changes });
    }, [setTasks, addChange]);

    const handleEditTitle = useCallback((taskId: number, currTitle: string, newTitle: string) => {
        const trimmedNewTitle = newTitle.trim();
        if (trimmedNewTitle === currTitle) return;
        updateLocalTasks({ taskId, changes: { title: newTitle } })
    }, [updateLocalTasks]);

    const handleSetCategory = useCallback((taskId: number, newCategory: TaskCategory) => {
        updateLocalTasks({ taskId, changes: { category: newCategory } });
    }, [updateLocalTasks]);

    const handleSetIsFavorite = useCallback((taskId: number, newValue: boolean) => {
        updateLocalTasks({ taskId, changes: { is_favorite: newValue } });
    }, [updateLocalTasks]);

    const handleEditDeadline = useCallback((taskId: number, newDeadline: string) => {
        updateLocalTasks({ taskId, changes: { deadline: newDeadline } });
    }, [updateLocalTasks]);

    const handleSetCompleted = useCallback((taskId: number, newValue: boolean) => {
        updateLocalTasks({ taskId, changes: { completed: newValue } });
    }, [updateLocalTasks]);

    return {
        handleEditTitle,
        handleSetCategory,
        handleSetIsFavorite,
        handleEditDeadline,
        handleSetCompleted,
    };
}