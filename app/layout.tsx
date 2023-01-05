import { Roboto } from '@next/font/google';

import { Analytics } from '../components/Analytics';
import { CookiesPopup } from '../components/CookiesPopup/CookiesPopup';
import { Footer } from '../components/Footer/Footer';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { Navigation } from '../components/Navigation/Navigation';
import { Providers } from '../components/Providers/Providers';

import Styles from './layout.module.scss';
import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';
import '../tailwind.css';

import type { ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl" className={roboto.variable}>
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

      <body className="font-sans">
        <div className={Styles.wrapper}>
          <header>
            <Navigation />
            <MainHeader />
          </header>

          <Providers>
            <main className={Styles.main}>{children}</main>
            <Analytics />
          </Providers>

          <Footer />
          <CookiesPopup />
        </div>
      </body>
    </html>
  );
}
