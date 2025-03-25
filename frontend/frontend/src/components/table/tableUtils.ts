import { Task } from '@/types/task';
import { ColumnKey } from './tableConstants';

export const filterTasks = (
    tasks: Task[],
    filters: Record<string, string>
): Task[] => {
    return tasks.filter((task) => {
        if (
            filters.title &&
            !task.title.toLowerCase().includes(filters.title.toLowerCase())
        )
            return false;
        if (
            filters.category &&
            !task.category.toLowerCase().includes(filters.category.toLowerCase())
        )
            return false;
        if (
            filters.deadline &&
            !task.deadline.includes(filters.deadline)
        )
            return false;
        if (filters.comments) {
            const commentsStr = task.comments
                .map((c) => c.content)
                .join(' ')
                .toLowerCase();
            if (!commentsStr.includes(filters.comments.toLowerCase())) return false;
        }
        return true;
    });
};

export const sortTasks = (
    tasks: Task[],
    sortColumn: ColumnKey,
    sortOrder: 'asc' | 'desc'
): Task[] => {
    return [...tasks].sort((a, b) => {
        let aVal: any, bVal: any;
        if (sortColumn === 'title') {
            aVal = a.title.toLowerCase();
            bVal = b.title.toLowerCase();
        } else if (sortColumn === 'category') {
            aVal = a.category.toLowerCase();
            bVal = b.category.toLowerCase();
        } else if (sortColumn === 'favorite') {
            // Convert booleans to numbers for sorting
            aVal = a.is_favorite ? 1 : 0;
            bVal = b.is_favorite ? 1 : 0;
        } else if (sortColumn === 'deadline') {
            // Compare as dates or strings (ISO strings are lexicographically sortable)
            aVal = new Date(a.deadline);
            bVal = new Date(b.deadline);
        } else {
            aVal = '';
            bVal = '';
        }

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
};
