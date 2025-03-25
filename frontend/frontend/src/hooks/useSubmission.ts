import { useState } from 'react';

export type SubmissionAction = () => Promise<Response>;

export default function useSubmission(
    showSnackbar: (message: string, type: 'success' | 'error') => void
) {
    const [isSubmittingData, setIsSubmittingData] = useState(false);

    const runSubmission = async (action: SubmissionAction) => {
        setIsSubmittingData(true);
        try {
            const response = await action();
            if (response.ok) {
                showSnackbar('Data submitted successfully', 'success');
            } else {
                let errorMessage = 'Error submitting data';
                try {
                    const data = await response.json();
                    errorMessage = JSON.stringify(data) || errorMessage;
                } catch (err) {
                    console.log('JSON parsing error of response data');
                }
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error('Failed data submission.', error);
            showSnackbar(error.message || 'An error occurred', 'error');
        } finally {
            setIsSubmittingData(false);
        }
    };

    return { isSubmittingData, runSubmission };
}
