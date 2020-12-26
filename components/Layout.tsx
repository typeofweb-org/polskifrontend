import { NextSeo } from 'next-seo';
import type { ReactNode } from 'react';

import { CookiesPopup } from './CookiesPopup/CookiesPopup';
import { Footer } from './Footer/Footer';
import { MainHeader } from './MainHeader/MainHeader';
import { MainNavigation } from './MainNavigation/MainNavigation';
import styles from './layout.module.scss';

type LayoutProps = {
  readonly children: ReactNode;
  readonly title?: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <header>
        <MainNavigation />
        <MainHeader />
      </header>
      <main>{children}</main>
      <Footer />
      <CookiesPopup />
      <NextSeo title={title && `${title} | Polski Front-End`} openGraph={{ title }} />
    </div>
  );
};
