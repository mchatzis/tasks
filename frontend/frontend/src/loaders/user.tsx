import { Task } from '@/types/task';
import { getTokensOrRedirect, refreshTokens } from '../actions/_guest.login_actions';
import { makeApiRequest } from '../utils/apiRequests';

interface LoaderFunctionArgs {
  request: Request;
  params: Record<string, string>;
  context?: any;
}
export const UserLoader = async ({ request }: LoaderFunctionArgs): Promise<Task[]> => {
  const url = new URL(request.url);

  if (!url.searchParams.get('page')) {
    url.searchParams.set('page', '1');
  }
  const queryString = url.searchParams.toString();

  const authTokens = await getTokensOrRedirect();
  let response = await makeApiRequest({
    method: 'GET',
    url: `http://localhost:8000/tasks/?${queryString}`,
    token: authTokens.access,
  });

  if (response.status == 401) {
    console.log("401 handled")
    const newAuthTokens = await refreshTokens();

    response = await makeApiRequest({
      method: 'GET',
      url: `http://localhost:8000/tasks/?${queryString}`,
      token: newAuthTokens.access,
    });
  }

  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }

  const data = await response.json()

  return data
}
