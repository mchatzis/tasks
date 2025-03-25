import { TaskCategory } from '@/types/task';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

export type SearchFormState = {
    category: string;
    is_favorite: boolean;
    ordering: string;
    search: string;
};

interface CustomSearchDialogProps {
    open: boolean;
    initialSearchForm: SearchFormState;
    onClose: () => void;
    onSubmit: (searchForm: SearchFormState) => void;
}

const CustomSearchDialog: React.FC<CustomSearchDialogProps> = ({
    open,
    initialSearchForm,
    onClose,
    onSubmit
}) => {
    const [searchForm, setSearchForm] = useState<SearchFormState>(initialSearchForm);

    useEffect(() => {
        setSearchForm(initialSearchForm);
    }, [initialSearchForm]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleClearSearchForm = () => {
        setSearchForm({
            category: '',
            is_favorite: false,
            ordering: '',
            search: ''
        });
    };

    const handleSubmit = () => {
        onSubmit(searchForm);
        onClose();
    };

    return (
        <Dialog open={open} handler={onClose}>
            <DialogHeader>Search Tasks</DialogHeader>
            <DialogBody className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="search">
                        Search Term
                    </label>
                    <Input
                        id="search"
                        name="search"
                        value={searchForm.search}
                        onChange={handleInputChange}
                        placeholder="Enter search term"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={searchForm.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="">Any</option>
                        {Object.values(TaskCategory).map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_favorite"
                        name="is_favorite"
                        checked={searchForm.is_favorite}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <label htmlFor="is_favorite" className="text-sm font-medium">
                        Favorite Only
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="ordering">
                        Ordering
                    </label>
                    <select
                        id="ordering"
                        name="ordering"
                        value={searchForm.ordering}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="">Default</option>
                        <option value="title">Title</option>
                        <option value="category">Category</option>
                        <option value="is_favorite">Favorite</option>
                        <option value="deadline">Deadline</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <Button variant="text" onClick={handleClearSearchForm}>
                        Clear All
                    </Button>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="outlined" color="red" onClick={onClose} className="mr-2">
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleSubmit}>
                    Search
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default CustomSearchDialog;
