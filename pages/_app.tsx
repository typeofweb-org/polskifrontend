import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

const meta = {
  title: 'Polski Frontend',
  description: `Serwis Polski Front-End powstał w celu zebrania w jednym miejscu jak największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego front-end developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są w języku polskim!`,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: 'website',
          title: meta.title,
          locale: 'pl_PL',
          url: 'https://' + process.env.NEXT_PUBLIC_URL! + pathname,
          description: meta.description,
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_URL!}/logo_og.png`,
              width: 1000,
              height: 1000,
            },
          ],
          site_name: meta.title,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      {/* Tags for favicon and manifest from favicon-generator.com */}
      <Head>
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
      </Head>
      <Component {...pageProps} />
    </>
  );
}
