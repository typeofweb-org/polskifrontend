import { HTTPNotFound } from '../api-helpers/errors';

export const pageValidGuard = (page: string | undefined, lastPage: number) => {
  if (page === undefined) return lastPage;
  if (Number(page) === 0 || isNaN(Number(page))) throw new HTTPNotFound();
  if (Number(page) > lastPage) throw new HTTPNotFound();
  return Number(page);
};
