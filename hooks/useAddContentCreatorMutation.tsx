import { useCallback, useState } from 'react';

import type { ContentCreatorReqBody } from '../utils/api/addContentCreator';
import { addContentCreator } from '../utils/api/addContentCreator';

type Status = 'idle' | 'loading' | 'error' | 'success';

export const useAddContentCreatorMutation = () => {
  const [status, setStatus] = useState<Status>('idle');

  const mutate = useCallback(async (body: ContentCreatorReqBody) => {
    setStatus('loading');
    try {
      const response = await addContentCreator(body);
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  }, []);

  return [mutate, status] as const;
};
