/* eslint-disable @typescript-eslint/restrict-plus-operands */
import type { ProjectTypes } from '@polskifrontend/types';
import { difference } from 'ramda';
import type { QueryConfig } from 'react-query';
import { usePaginatedQuery } from 'react-query';

import type { Get } from './fetcherTypes';

type Method =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

type BodyType<
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = Get<
  ProjectTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'requestBody']
> extends infer R
  ? R
  : undefined;

type ParamsType<
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = Get<
  ProjectTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'requestPathParams']
> extends infer R
  ? R
  : undefined;

type QueryType<
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = Get<
  ProjectTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'requestQuery']
> extends infer R
  ? R
  : undefined;

type ResponseType<
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = Get<
  ProjectTypes['pathsDefinitions'],
  readonly [CurrentPath, CurrentMethod, 'response']
> extends infer R
  ? R extends string // Swagger types empty responses as "string" but we never respond with just strings
    ? never
    : R
  : never;

type FetcherConfigCommon = { readonly config?: RequestInit };
type FetcherConfig<
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
> = FetcherConfigCommon &
  (BodyType<CurrentPath, CurrentMethod> extends object
    ? { readonly body: BodyType<CurrentPath, CurrentMethod> }
    : { readonly body?: never }) &
  (ParamsType<CurrentPath, CurrentMethod> extends object
    ? { readonly params: ParamsType<CurrentPath, CurrentMethod> }
    : { readonly params?: never }) &
  (QueryType<CurrentPath, CurrentMethod> extends object
    ? { readonly query: QueryType<CurrentPath, CurrentMethod> }
    : { readonly query?: never });

export function findMismatchingParams(requiredParams: readonly string[], params: object) {
  const providedParams = Object.keys(params);

  const excessParams = difference(providedParams, requiredParams);
  const missingParams = difference(requiredParams, providedParams);
  return {
    excessParams,
    missingParams,
  };
}

const PARAMS_PATTERN = /{(\w+)}/g;
export function compileUrl<CurrentPath extends keyof ProjectTypes['pathsDefinitions']>(
  path: CurrentPath,
  params?: Record<string, string>,
  query?: Record<string, string>,
): string {
  const queryString = query ? '?' + new URLSearchParams(query).toString() : '';

  if (!params) {
    return process.env.NEXT_PUBLIC_API_URL + path + queryString;
  }
  const requiredParams = [...path.matchAll(PARAMS_PATTERN)].map((match) => match[1]);
  const { excessParams, missingParams } = findMismatchingParams(requiredParams, params);
  if (excessParams.length > 0 || missingParams.length > 0) {
    throw new Error(
      `Invalid params. Excessive params: ${JSON.stringify(
        excessParams,
      )}; Missing params: ${JSON.stringify(missingParams)}`,
    );
  }

  const compiledPath = path.replace(PARAMS_PATTERN, (_, param: string) => params[param]);
  return process.env.NEXT_PUBLIC_API_URL + compiledPath + queryString;
}

export async function fetcher<
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
>(
  path: CurrentPath,
  method: CurrentMethod,
  { body, params, config, query }: FetcherConfig<CurrentPath, CurrentMethod>,
): Promise<ResponseType<CurrentPath, CurrentMethod>> {
  const url = compileUrl(path, params as Record<string, string>, query as Record<string, string>);
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...(body && { body: JSON.stringify(body) }),
    ...config,
  });
  const data = await getJSON(response);
  if (response.ok) {
    return data as ResponseType<CurrentPath, CurrentMethod>;
  }

  throw new ResponseError(response.statusText, response.status, data);
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status: number, public readonly data: unknown) {
    super(message);
    // eslint-disable-next-line functional/no-this-expression
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

// eslint-disable-next-line require-await
async function getJSON(response: Response): Promise<unknown | undefined> {
  const contentType = response.headers.get('Content-Type');
  const emptyCodes = [204, 205];
  if (!emptyCodes.includes(response.status) && contentType?.includes('json')) {
    return response.json();
  } else {
    return undefined;
  }
}

export const useToWQuery = <
  CurrentPath extends keyof ProjectTypes['pathsDefinitions'],
  CurrentMethod extends Method
>(
  [path, method, config]: readonly [
    CurrentPath,
    CurrentMethod,
    FetcherConfig<CurrentPath, CurrentMethod>,
  ],
  queryConfig?: QueryConfig<ResponseType<CurrentPath, CurrentMethod>, unknown>,
) =>
  usePaginatedQuery(
    [path, method, config],
    () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const promise = fetcher(path, method, { ...config, config: { signal } });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (promise as any).cancel = () => controller.abort();

      return promise;
    },
    queryConfig,
  );
