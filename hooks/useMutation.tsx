import { useCallback, useState } from 'react';

export type Status = 'idle' | 'loading' | 'error' | 'success';

export function useMutation<Body>(mutation: (body: Body) => Promise<Response>) {
  const [status, setStatus] = useState<{ readonly status: Status; readonly errorCode?: number }>({
    status: 'idle',
  });

  const mutate = useCallback(
    async (body: Body) => {
      setStatus({ status: 'loading' });
      try {
        const response = await mutation(body);
        if (response.ok) {
          setStatus({ status: 'success' });
        } else {
          setStatus({ status: 'error', errorCode: response.status });
        }
      } catch (err) {
        setStatus({ status: 'error' });
      }
    },
    [mutation],
  );

  return { mutate, ...status } as const;
}
