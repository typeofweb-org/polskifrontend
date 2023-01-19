import type { ReactNode } from 'react';

type ContentTitleProps = {
  readonly children: ReactNode;
};

export const ContentTitle = ({ children }: ContentTitleProps) => {
  return (
    <h2 className="mt-6 py-0 pt-4 pb-2 text-center text-2xl font-semibold uppercase text-gray-secondary lg:text-3xl">
      {children}
    </h2>
  );
};
