import { refreshTokens } from "@/actions/_guest.login_actions";

type ApiRequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: Record<string, any> | null;
  queryParams?: Record<string, any> | null;
  token?: string | null;
};

const buildRequestUrl = (
  url: string,
  queryParams?: Record<string, any> | null
): string => {
  if (!queryParams) return url;
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join('&');
  return queryString ? `${url}?${queryString}` : url;
};

const buildRequestOptions = (
  method: ApiRequestConfig['method'],
  token: string | null,
  data: Record<string, any> | null
): RequestInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const options: RequestInit = { method, headers };
  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  return options;
};

export const makeApiRequest = async ({
  method,
  url,
  data = null,
  queryParams = null,
  token = null
}: ApiRequestConfig): Promise<Response> => {
  const requestUrl = buildRequestUrl(url, queryParams);
  let requestOptions = buildRequestOptions(method, token, data);
  let response: Response;

  try {
    response = await fetch(requestUrl, requestOptions);
  } catch (error: any) {
    throw new Error(`API request failed: ${error.message}`);
  }

  if (response.status === 401 && token) {
    try {
      const newTokens = await refreshTokens();
      token = newTokens.access;

      requestOptions = buildRequestOptions(method, token, data);
      response = await fetch(requestUrl, requestOptions);
    } catch (refreshError: any) {
      throw new Error(`Token refresh failed: ${refreshError.message}`);
    }
  }

  if (!response.ok) {
    console.error(`API request failed with status ${response.status}: ${response.statusText}`);
  }

  return response;
};
