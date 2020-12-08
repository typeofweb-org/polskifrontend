import type { Server, ServerInjectOptions, ServerInjectResponse } from '@hapi/hapi';
import { reduce } from 'bluebird';
import Cookie from 'cookie';
import Faker from 'faker';
import { join, chain, map, path, pipe, reject, toPairs, flatten, isNil } from 'ramda';

import { prisma } from './src/db';
import { Enums } from './src/models';
import { getServerWithPlugins } from './src/server';

export const getServerForTest = async () => {
  const server = await getServerWithPlugins();

  // @note we could replace this with a mock in the future
  // @ts-expect-error
  server.app.db = prisma;

  return server;
};

export const createAndAuthRole = async (
  server: Server,
  role: keyof Enums['UserRole'] = Enums.UserRole.ADMIN,
) => {
  const firstName = Faker.name.firstName();
  const lastName = Faker.name.lastName();
  const email = Faker.internet.email(firstName, lastName, 'typeofweb.com');
  const password = 'asdASD123!@#';

  await server.inject({
    method: 'POST',
    url: '/auth/register',
    payload: {
      email,
      password,
    },
  });
  await server.app.db.user.update({ where: { email }, data: { role } });

  const loginInjection = await server.inject({
    method: 'POST',
    url: '/auth/login',
    payload: {
      email,
      password,
    },
  });
  const cookies = loginInjection.headers['set-cookie'];
  const parsedCookies = Cookie.parse(String(cookies ?? ''));

  return {
    email,
    password,
    headers: {
      Cookie: `session=${parsedCookies['session']}`,
    },
  };
};

export const repeatRequest = <T>(n: number, fn: () => Promise<T>): Promise<readonly T[]> => {
  const repetitions = Array.from({ length: n }, () => fn());
  return Promise.all(repetitions);
};

export const execute = (server: Server, injections: readonly ServerInjectOptions[]) => {
  return reduce(
    injections,
    async (acc, injection) => {
      const getCookieHeader = path<string | readonly string[] | undefined>([
        'headers',
        'set-cookie',
      ]);
      const allCookies = pipe(
        map(getCookieHeader),
        flatten,
        reject(isNil),
      )(acc) as readonly string[];

      const parsedCookies = pipe(
        map(Cookie.parse),
        chain(toPairs),
        map(join('=')),
        join('; '),
      )(allCookies);

      const result = await server.inject({
        ...injection,
        headers: {
          ...injection.headers,
          Cookie: parsedCookies,
        },
      });
      return [...acc, result];
    },
    [] as readonly ServerInjectResponse[],
  );
};
