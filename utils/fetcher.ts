import type { HTTPMethod } from '../api-helpers/api-hofs';

type FetcherConfig = {
  readonly method: HTTPMethod;
  readonly body?: unknown;
  readonly config?: RequestInit;
};

export async function fetcher<T>(
  path: string,
  { method, body, config }: FetcherConfig = { method: 'GET' },
): Promise<T> {
  try {
    const response = await fetch(path, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method,
      ...(body && { body: JSON.stringify(body) }),
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
