import type { AnySchema, InferType } from 'yup';

import type { HTTPMethod } from '../api-helpers/api-hofs';

type FetcherConfig<S extends AnySchema> = {
  readonly method: HTTPMethod;
  readonly schema: S;
  readonly body?: object;
  readonly config?: RequestInit;
};

export async function fetcher<S extends AnySchema>(
  path: string,
  { method, body, config, schema }: FetcherConfig<S>,
): Promise<InferType<S>> {
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
      /* eslint-disable @typescript-eslint/no-unsafe-return */
      return schema.cast(await response.json().catch(() => {}));
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
