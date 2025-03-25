import { makeApiRequest } from '../utils/apiRequests'

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const submission = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const response = await makeApiRequest({
    method: request.method,
    url: 'http://localhost:8000/auth/token/',
    data: submission,
  })
  if (response.status == 401) {
    return response.json()
  }
  if (!response.ok) {
    return { error: response.statusText }
  }
  return { success: await response.json() }
}

export const refreshTokens = async () => {
  const storedTokens = localStorage.getItem('authTokens');
  if (!storedTokens) {
    // redirect to login logic
    throw Error("login redirection logic not yet implemented")
  }

  const authTokens = JSON.parse(storedTokens);
  const response = await makeApiRequest({
    method: 'POST',
    url: 'http://localhost:8000/auth/token/refresh/',
    data: {
      refresh: authTokens.refresh,
    }
  })

  const tokenResponse = await response.json()
  const newAuthTokens = {
    refresh: authTokens.refresh,
    access: tokenResponse.access
  }
  localStorage.setItem('authTokens', JSON.stringify(newAuthTokens));

  return newAuthTokens
}

export const getTokensOrRedirect = async () => {
  const storedTokens = localStorage.getItem('authTokens');
  if (!storedTokens) {
    // redirect to login logic
    throw Error("login redirection logic not yet implemented")
  }

  const authTokens = JSON.parse(storedTokens);
  const accessToken = authTokens?.access;
  if (!accessToken) {
    console.log("No access token found, trying to get a new one with refresh token");
    return await refreshTokens();
  }

  return authTokens
}
