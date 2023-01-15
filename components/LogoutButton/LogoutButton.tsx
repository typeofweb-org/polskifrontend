'use client';

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button/Button';

import { useLogout } from './useLogout';

import type { ReactNode } from 'react';

type LogoutButtonProps = {
  readonly children: ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const { logout } = useLogout();

  return (
    <Button icon={faRightFromBracket} onClick={() => void logout()}>
      {children}
    </Button>
  );
};
