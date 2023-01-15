import { AuthGuard } from '../../components/AuthGuard/AuthGuard';

import type { ReactNode } from 'react';

type AdminLayoutProps = {
  readonly children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard userRole="ADMIN">
      <section className="mx-auto flex max-w-6xl flex-col">{children}</section>
    </AuthGuard>
  );
}
