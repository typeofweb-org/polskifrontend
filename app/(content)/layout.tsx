import type { ReactNode } from 'react';

type ContentLayoutProps = {
  readonly children: ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return <section className="mx-auto flex max-w-6xl flex-col gap-4">{children}</section>;
}
