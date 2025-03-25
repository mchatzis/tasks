import { Task, TaskChange } from '@/types/task';
import { useCallback, useEffect, useState } from 'react';


function applyDiffs(tasks: Task[], diffs: TaskChange[]): Task[] {
    // Applies the given diffs/changes sequentially, like Git applying multiple diffs
    return diffs.reduce((accum, current) => accum.map(task =>
        task.id === current.taskId ? { ...task, ...current.changes, isEdited: true } : task)
        , tasks)
};

export default function useTaskHistory(initialTasks: Task[]) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [undoStack, setUndoStack] = useState<TaskChange[]>([]);
    const [redoStack, setRedoStack] = useState<TaskChange[]>([]);
    const hasChanges = undoStack.length > 0;

    useEffect(() => {
        // Limitation: For multiple concurrent user sessions, an extra check should be added 
        // to check incoming data compatibility with local changes. (like Git pull merge conflicts) 
        const newTasks = applyDiffs(initialTasks, undoStack);
        setTasks(newTasks);
    }, [initialTasks]);

    const addChange = useCallback((change: TaskChange) => {
        setUndoStack((prev) => {
            const newUndo = [...prev, change];
            setTasks(applyDiffs(initialTasks, newUndo));
            return newUndo;
        });
        setRedoStack([]); // New branch: clear redo history.
    }, [initialTasks]);

    const undo = useCallback(() => {
        setUndoStack(prev => {
            if (prev.length === 0) return prev;
            const lastChange = prev[prev.length - 1];
            const newUndo = prev.slice(0, prev.length - 1);
            setRedoStack(prevRedo => [...prevRedo, lastChange]);
            setTasks(applyDiffs(initialTasks, newUndo));
            return newUndo;
        });
    }, [initialTasks]);

    const redo = useCallback(() => {
        setRedoStack(prev => {
            if (prev.length === 0) return prev;
            const lastRedoChange = prev[prev.length - 1];
            setUndoStack(prevUndo => {
                const newUndo = [...prevUndo, lastRedoChange];
                setTasks(applyDiffs(initialTasks, newUndo));
                return newUndo;
            });
            return prev.slice(0, prev.length - 1);
        });
    }, [initialTasks]);

    const discardChanges = useCallback(() => {
        setTasks(initialTasks);
        setUndoStack([]);
        setRedoStack([]);
    }, [initialTasks]);

    return { tasks, setTasks, undoStack, setUndoStack, redoStack, setRedoStack, addChange, undo, redo, discardChanges, hasChanges };
}
