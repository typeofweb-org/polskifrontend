import { NextSeo } from 'next-seo';

import { titleTemplate as defaultTitleTemplate } from '../pages/_app';

import { CookiesPopup } from './CookiesPopup/CookiesPopup';
import { Footer } from './Footer/Footer';
import { MainHeader } from './MainHeader/MainHeader';
import { MainNavigation } from './MainNavigation/MainNavigation';
import Styles from './layout.module.scss';

import type { ReactNode } from 'react';

type LayoutProps = {
  readonly children: ReactNode;
  readonly title: string;
  readonly titleTemplate?: string;
};

export const Layout = ({ children, title, titleTemplate = defaultTitleTemplate }: LayoutProps) => {
  return (
    <div className={Styles.wrapper}>
      <header>
        <MainNavigation />
        <MainHeader />
      </header>
      <main className={Styles.main}>{children}</main>
      <Footer />
      <CookiesPopup />
      <NextSeo
        title={titleTemplate ? titleTemplate.replace('%s', title) : title}
        openGraph={{ title: titleTemplate ? titleTemplate.replace('%s', title) : title }}
      />
    </div>
  );
};
