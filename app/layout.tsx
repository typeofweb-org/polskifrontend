import { Roboto } from '@next/font/google';
import Image from 'next/image';

import { Analytics } from '../components/Analytics';
import { CookiesPopup } from '../components/CookiesPopup/CookiesPopup';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Navigation } from '../components/Navigation/Navigation';
import { Providers } from '../components/Providers/Providers';
import Background from '../public/background.svg';
import BgTiles from '../public/bg-tiles.svg';

import type{ ReactNode } from 'react';

import 'normalize.css/normalize.css';
import '../styles/global.scss';
import '../styles/tailwind.css';

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

      <body className="relative leading-[1.3]">
        <header className="width-container relative overflow-visible">
          <Navigation />
          <Header />
        </header>

        <div className="relative overflow-y-hidden">
          <div className="absolute left-0 -z-10 mt-16 w-full">
            <Image
              src={BgTiles}
              className="absolute -top-5 left-0 -z-10 w-1/2 md:top-3 md:w-1/5"
              alt=""
            />
            <Image
              src={BgTiles}
              className="absolute left-[20%] -top-5 -z-10 hidden w-1/5 md:block"
              alt=""
            />
            <Image
              src={BgTiles}
              className="absolute left-[40%] -top-10 -z-10 hidden w-1/5 md:block"
              alt=""
            />
            <Image src={Background} className="w-full" alt="" />
            <Image
              src={BgTiles}
              className="absolute right-[20%] -top-5 -z-10 hidden w-1/5 md:block"
              alt=""
            />
            <Image
              src={BgTiles}
              className="absolute -top-5 right-0 -z-10 w-1/2 md:top-3 md:block md:w-1/5"
              alt=""
            />

            <div className="absolute left-0 h-[999999px] w-full bg-theme-secondary"></div>
          </div>

          <Providers>
            <main className="width-container">{children}</main>
            <Analytics />
          </Providers>
        </div>

        <div className="bg-theme-secondary">
          <Footer />
        </div>

        <CookiesPopup />
      </body>
    </html>
  );
}
