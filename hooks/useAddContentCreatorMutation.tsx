import { useCallback, useState } from 'react';

import type { ContentCreatorReqBody } from '../utils/api/addContentCreator';
import { addContentCreator } from '../utils/api/addContentCreator';

export type Status = 'idle' | 'loading' | 'error' | 'success' | 'notRssFound';

export const useAddContentCreatorMutation = () => {
  const [status, setStatus] = useState<Status>('idle');

  const mutate = useCallback(async (body: ContentCreatorReqBody) => {
    setStatus('loading');
    try {
      const response = await addContentCreator(body);
      if (response.ok) {
        setStatus('success');
      } else if (response.status === 422) {
        setStatus('notRssFound');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }, []);

  return [mutate, status] as const;
};
