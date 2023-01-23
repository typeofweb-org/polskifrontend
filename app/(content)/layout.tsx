import type { ReactNode } from 'react';

type ContentLayoutProps = {
  readonly children: ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return <section className="content-container-base flex flex-col gap-2">{children}</section>;
}
