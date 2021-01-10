import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { InferType, ObjectSchema } from 'yup';

const replacementsPattern = /\[([^[\]\s]+)\]/gi;

export const useSmartQuery = <S extends ObjectSchema<any>>(schema: S) => {
  const { pathname, query: routerQuery, push } = useRouter();

  /**
   * Next.js query is different from what we usuallly consider a "query"
   * In Next, for the following route /admin/[blogId], the URL /admin/123?isPublic=true
   * is considered to have TWO query items: { blogId: 123, isPublic: true }
   * What we want instead, is to have params = { blogId: 123 } and query = { isPublic: true }
   */
  const { params, query } = useMemo(() => {
    const matches = [...pathname.matchAll(replacementsPattern)];
    const params = Object.fromEntries(
      Object.entries(routerQuery).filter(([key]) =>
        matches.some(([, replacement]) => key === replacement),
      ),
    );
    const query = schema.cast(
      Object.fromEntries(Object.entries(routerQuery).filter(([key]) => !(key in params))),
    ) as InferType<S>;

    return {
      params,
      query,
    };
  }, [pathname, routerQuery, schema]);

  const changeQuery = useCallback(
    (query: InferType<S>) => {
      const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([key]) => !(key in params)),
      );

      const result = schema.validateSync(filteredQuery);

      void push({
        query: {
          ...routerQuery,
          ...result,
        },
      });
    },
    [params, push, routerQuery, schema],
  );

  return useMemo(() => ({ changeQuery, params, query }), [params, query, changeQuery]);
};
