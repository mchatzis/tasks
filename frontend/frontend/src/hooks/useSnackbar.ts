import { useState } from 'react';

export type SnackbarType = 'success' | 'error';

export type SnackbarState = {
    open: boolean;
    message: string;
    type: SnackbarType;
}

export default function useSnackbar() {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        type: 'success',
    });

    const showSnackbar = (message: string, type: SnackbarType) => {
        const duration = type === 'success' ? 1000 : 5000;
        setSnackbar({ open: true, message, type });
        setTimeout(() => {
            setSnackbar(prev => ({ ...prev, open: false }));
        }, duration);
    };

    return { snackbar, showSnackbar };
}
