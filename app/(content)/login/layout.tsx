import { Content } from '../../../components/Content/Content';

import type { ReactNode } from 'react';

type LoginLayoutProps = {
  readonly children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <Content>{children}</Content>
    </>
  );
}
