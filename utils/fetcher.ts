type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export async function fetcher<T>(
  path: string,
  method: HTTPMethod = 'GET',
  init?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method,
      ...init,
      ...(init?.body && { body: JSON.stringify(init.body) }),
    });
    if (response.ok) {
      const data = (await response.json()) as T;
      return data;
    }
    throw new ResponseError(response.statusText, response.status);
  } catch (err) {
    if (err instanceof ResponseError) {
      throw err;
    }
    throw new ResponseError('Something went wrong during fetching!');
  }
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    // eslint-disable-next-line functional/no-this-expression
    this.name = 'ResponseError';
    // eslint-disable-next-line functional/no-this-expression
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
