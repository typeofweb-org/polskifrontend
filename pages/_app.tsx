import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

const meta = {
  title: 'Polski Front-End',
  description: `Serwis Polski Front-End powstał w celu zebrania w jednym miejscu jak największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego front-end developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są w języku polskim!`,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: 'website',
          title: meta.title,
          locale: 'pl_PL',
          url: process.env.NEXT_PUBLIC_URL,
          description: meta.description,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL!}/logo.png`,
              width: 1280,
              height: 399,
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
      <Component {...pageProps} />
    </>
  );
}
