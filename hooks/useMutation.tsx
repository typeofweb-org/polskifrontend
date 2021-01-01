import { useCallback, useState } from 'react';

export type Status = 'idle' | 'loading' | 'error' | 'success';

export function useMutation<Body>(mutation: (body: Body) => Promise<Response>) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<number | null>(null);

  const mutate = useCallback(
    async (body: Body) => {
      setStatus('loading');
      try {
        const response = await mutation(body);
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          setError(response.status);
        }
      } catch (err) {
        setStatus('error');
      }
    },
    [mutation],
  );

  return { mutate, status, errorCode: error } as const;
}
