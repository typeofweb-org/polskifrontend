import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';
import { Auth } from '@supabase/ui';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getConfig } from '../api-helpers/config';
import { pageview } from '../utils/analytics';
import { supabase } from '../utils/api/initSupabase';

import type { AppProps } from 'next/app';

const meta = {
  title: 'Polski Frontend',
  description: `Serwis Polski Frontend powstał w celu zebrania w jednym miejscu jak największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego frontend developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są w języku polskim!`,
};
export const titleTemplate = `%s | ${meta.title}`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const { asPath, events, ...router } = useRouter();

  useEffect(() => {
    // redirect for auth
    if (typeof window === 'undefined') {
      return;
    }

    // it might have 5 properties: access_token, expires_in, provider_token, refresh_token, token_type
    // we only care about 3
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const properties = ['access_token', 'provider_token', 'refresh_token'];
    const shouldRedirect = properties.some((p) => searchParams.has(p));

    if (shouldRedirect) {
      void router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const reportRouteChange = (url: string) => pageview(url);
    events.on('routeChangeComplete', reportRouteChange);
    return () => events.off('routeChangeComplete', reportRouteChange);
  }, [events]);

  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: 'website',
          title: meta.title,
          locale: 'pl_PL',
          url: `https://${getConfig('NEXT_PUBLIC_URL')}${asPath}`,
          description: meta.description,
          images: [
            {
              url: `https://${getConfig('NEXT_PUBLIC_URL')}/logo_og.png`,
              width: 1000,
              height: 1000,
            },
          ],
          site_name: meta.title,
        }}
      />
      {/* Additional tags */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" href="/feed" type="application/rss+xml" title="Polski Frontend RSS" />
      </Head>
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
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </>
  );
}
