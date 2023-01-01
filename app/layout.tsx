import { CookiesPopup } from '../components/CookiesPopup/CookiesPopup';
import { Footer } from '../components/Footer/Footer';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { MainNavigation } from '../components/MainNavigation/MainNavigation';
import { Providers } from '../components/Providers/Providers';

import Styles from './layout.module.scss';
import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';

import type { ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const gaId = (process.env.NEXT_PUBLIC_GA_TRACKING_ID || '').replace(/[^\-a-zA-Z0-9]/g, '');

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
        <script defer src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', {page_path: window.location.pathname});
            `.trim(),
          }}
        ></script>
      </head>

      <body>
        <div className={Styles.wrapper}>
          <header>
            <MainNavigation />
            <MainHeader />
          </header>

          <Providers>
            <main className={Styles.main}>{children}</main>
          </Providers>

          <Footer />
          <CookiesPopup />
        </div>
      </body>
    </html>
  );
}
