// TODO: It would be nice to get these from the backend instead
export const tableCols = {
    index: { label: 'index', sortable: false, filterable: false },
    title: { label: 'Title', sortable: true, filterable: true },
    category: { label: 'Category', sortable: true, filterable: true },
    favorite: { label: 'Favorite', sortable: true, filterable: false },
    deadline: { label: 'Deadline', sortable: true, filterable: true },
    comments: { label: 'Comments', sortable: false, filterable: true },
    completed: { label: '', sortable: false, filterable: false }
} as const;
export type ColumnKey = keyof typeof tableCols;

export const filterableCols = Object.entries(tableCols).reduce((acc, [key, value]) => {
    if (value.filterable) {
        acc[key] = '';
    }
    return acc;
}, {} as Record<string, string>);
export const sortableCols = Object.entries(tableCols).reduce((acc, [key, value]) => {
    if (value.sortable) {
        acc[key] = '';
    }
    return acc;
}, {} as Record<string, string>);