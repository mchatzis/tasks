import { Task } from '../types/task';
import { makeApiRequest } from '../utils/apiRequests';
import { getTokensOrRedirect } from './_guest.login_actions';

export const addRandomTasks = async () => {
  const authTokens = await getTokensOrRedirect();
  const response = await makeApiRequest({
    method: 'POST',
    url: `http://localhost:8000/tasks/`,
    token: authTokens.access,
  })

  return response
}

export const saveEditedTasks = async (tasks: Task[]) => {
  const authTokens = await getTokensOrRedirect();
  let responses;

  responses = await Promise.all(
    tasks.map((task) =>
      makeApiRequest({
        method: 'PUT',
        url: `http://localhost:8000/tasks/${task.id}/`,
        data: task,
        token: authTokens.access,
      })
    )
  );

  const failedResponses = responses.filter(response => !response.ok);
  if (failedResponses.length === 0) {
    return responses[0]
  }

  return failedResponses[0];
}

export const createComment = async (taskId: number, content: string) => {
  const authTokens = await getTokensOrRedirect();
  const response = await makeApiRequest({
    method: 'POST',
    url: `http://localhost:8000/comments/`,
    data: { task: taskId, content },
    token: authTokens.access,
  });
  return response;
}

export const deleteComment = async (commentId: number) => {
  const authTokens = await getTokensOrRedirect();
  const response = await makeApiRequest({
    method: 'DELETE',
    url: `http://localhost:8000/comments/${commentId}/`,
    token: authTokens.access,
  });

  return response
}

