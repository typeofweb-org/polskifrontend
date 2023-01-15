import type { ReactNode } from 'react';

type ContentTitleProps = {
  readonly children: ReactNode;
};

export const ContentTitle = ({ children }: ContentTitleProps) => {
  return (
    <h2 className="order-1 mt-6 py-0 pt-4 pb-2 text-center text-xl font-semibold uppercase text-[#757575] md:text-2xl lg:text-3xl">
      {children}
    </h2>
  );
};
