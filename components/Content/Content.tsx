import type { ReactNode } from 'react';

type ContentProps = {
  readonly children: ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  return (
    <article className="overflow order-3 m-1 break-words rounded-r-xl border-l-[3px] border-primary-base bg-white p-4 leading-relaxed shadow-[1px_1px-6px_1px_rgba(204,204,204,1)] md:m-5 md:p-6 lg:p-7">
      {children}
    </article>
  );
};
