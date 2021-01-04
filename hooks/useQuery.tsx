import { useEffect, useState } from 'react';

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
      .catch((response: Response) =>
        setQueryData({ value: null, status: 'error', errorCode: response.status }),
      );
  }, [queryFunc]);

  return queryData;
}
