import { useEffect, useState } from 'react';

import { ResponseError } from '../utils/fetcher';

type Status = 'idle' | 'loading' | 'success' | 'error';

type QueryData<T> = {
  readonly value: T | null;
  readonly status: Status;
  readonly errorCode?: number;
};

export function useQuery<T>(queryFunc: () => Promise<T>) {
  const [queryData, setQueryData] = useState<QueryData<T>>({
    value: null,
    status: 'idle',
  });

  useEffect(() => {
    setQueryData((queryData) => ({ ...queryData, status: 'loading' }));
    queryFunc()
      .then((data) => {
        setQueryData({ value: data, status: 'success' });
      })
      .catch((err) => {
        if (err instanceof ResponseError) {
          setQueryData({ value: null, status: 'error', errorCode: err.status });
        }
        setQueryData({ value: null, status: 'error' });
      });
  }, [queryFunc]);

  return queryData;
}
