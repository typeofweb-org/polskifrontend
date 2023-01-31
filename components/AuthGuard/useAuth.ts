import { useQuery } from '../../hooks/useQuery';
import { getMe } from '../../utils/api/getMe';

export type AuthHookRet =
  | { readonly isLoading: true; readonly isLoggedIn?: undefined; readonly user?: undefined }
  | {
      readonly isLoggedIn: false;
      readonly isLoading: false;
      readonly user?: undefined;
    }
  | {
      readonly isLoggedIn: true;
      readonly isLoading: false;
      readonly user: {
        readonly user: {
          readonly id: string;
        };
        readonly member: {
          readonly id: string;
          readonly email: string;
          readonly role: string;
        };
      };
    };

export const useAuth = (): AuthHookRet => {
  const { value: me, status } = useQuery(getMe);

  if (typeof window === 'undefined') {
    return { isLoading: true };
  }

  switch (status) {
    case 'loading':
    case 'idle':
      return { isLoading: true };
    case 'error':
      return { isLoggedIn: false, isLoading: false };
    case 'success': {
      if (!me?.user || !me.member) {
        return { isLoggedIn: false, isLoading: false };
      }
      return { isLoggedIn: true, user: me, isLoading: false };
    }
  }
};
