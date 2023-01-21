import type { ReactNode } from 'react';

type ContentNavigationProps = {
  readonly children: ReactNode;
};

export const ContentNavigation = ({ children }: ContentNavigationProps) => {
  return (
    <nav className="flex flex-col flex-wrap items-center gap-3 sm:flex-row sm:items-start">
      {children}
    </nav>
  );
};
