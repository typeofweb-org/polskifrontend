import { useCallback, useState } from 'react';

import { ResponseError } from '../utils/fetcher';

export type Status = 'idle' | 'loading' | 'error' | 'success';

export function useMutation<Body>(mutation: (body: Body) => Promise<unknown>) {
  const [status, setStatus] = useState<{ readonly status: Status; readonly errorCode?: number }>({
    status: 'idle',
  });

  const mutate = useCallback(
    async (body: Body) => {
      setStatus({ status: 'loading' });
      try {
        await mutation(body);
        setStatus({ status: 'success' });
      } catch (err) {
        if (err instanceof ResponseError) {
          setStatus({ status: 'error', errorCode: err.status });
        }
        setStatus({ status: 'error' });
        throw err;
      }
    },
    [mutation],
  );

  return { mutate, ...status } as const;
}
