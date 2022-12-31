import { CookiesPopup } from '../components/CookiesPopup/CookiesPopup';
import { Footer } from '../components/Footer/Footer';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { MainNavigation } from '../components/MainNavigation/MainNavigation';

import Styles from './layout.module.scss';
import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';

import type { ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

// eslint-disable-next-line import/no-default-export -- Layout should be default exported
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
          integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
          integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <div className={Styles.wrapper}>
          <header>
            <MainNavigation />
            <MainHeader />
          </header>

          <main className={Styles.main}>{children}</main>

          <Footer />
          <CookiesPopup />

          {/* <NextSeo
            title={titleTemplate ? titleTemplate.replace('%s', title) : title}
            openGraph={{ title: titleTemplate ? titleTemplate.replace('%s', title) : title }}
          /> */}
        </div>
      </body>
    </html>
  );
}
