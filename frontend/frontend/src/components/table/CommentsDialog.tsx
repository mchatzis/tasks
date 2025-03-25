import { createComment, deleteComment } from '@/actions/_private.tasks';
import useSnackbar from '@/hooks/useSnackbar';
import useSubmission from '@/hooks/useSubmission';
import { Comment } from '@/types/task';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router-dom';
import Snackbar from '../Snackbar';

interface CommentsDialogProps {
    taskId: number;
    comments: Comment[];
    isCommentsOpen: boolean;
    setIsCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CommentsDialog({ taskId, comments, isCommentsOpen, setIsCommentsOpen }: CommentsDialogProps) {
    const [localComments, setLocalComments] = useState<Comment[]>(comments);
    const [newComment, setNewComment] = useState<string>('');
    const revalidator = useRevalidator()

    useEffect(() => {
        setLocalComments(comments);
    }, [comments]);

    const { snackbar, showSnackbar } = useSnackbar();
    const { isSubmittingData, runSubmission } = useSubmission(showSnackbar);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        await runSubmission(async () => {
            const response = await createComment(taskId, newComment);
            const addedComment = await response.json()
            setLocalComments(prev => [...prev, addedComment]);
            setNewComment('');
            return response;
        });
    };

    const handleDeleteComment = async (commentId: number) => {
        await runSubmission(async () => {
            const response = await deleteComment(commentId);
            setLocalComments(prev => prev.filter(comment => comment.id !== commentId));
            return response;
        });
    };

    const handleClickClose = () => {
        setIsCommentsOpen(false)
        revalidator.revalidate()
    };

    return (
        <>
            <Dialog open={isCommentsOpen} handler={setIsCommentsOpen}>
                <DialogHeader>Comments</DialogHeader>
                <DialogBody divider>
                    {localComments.length > 0 ? (
                        localComments.map((comment) => (
                            <div key={comment.id} className="mb-2 flex items-center justify-between">
                                <Typography variant="small">
                                    <strong>{comment.user}:</strong> {comment.content}
                                </Typography>
                                <Button
                                    variant="text"
                                    color="red"
                                    size="sm"
                                    disabled={isSubmittingData}
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))
                    ) : (
                        <Typography variant="small">No comments available.</Typography>
                    )}
                    <div className="mt-4 flex gap-2">
                        <Input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment"
                        />
                        <Button
                            onClick={handleAddComment}
                            disabled={isSubmittingData}
                        >Add</Button>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={() => handleClickClose()} className="mr-1">
                        <span>Close</span>
                    </Button>
                </DialogFooter>
                <Snackbar snackbar={snackbar} />
            </Dialog>
        </>
    )
}