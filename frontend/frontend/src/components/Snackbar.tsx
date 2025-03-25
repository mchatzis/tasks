import { SnackbarState } from "@/hooks/useSnackbar";

export default function Snackbar({ snackbar, className = '' }: { snackbar: SnackbarState, className?: string }) {
    return (
        <div className={`fixed left-3/4 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50
                ${snackbar.type === 'success' ? 'bg-blue-500' : 'bg-red-500'} text-white
                transition-all duration-300 ease-out
                ${snackbar.open
                ? 'bottom-5 opacity-100'
                : '-bottom-20 opacity-0'}
                ${className}`
        }
        >
            {snackbar.message}
        </div>
    )
}