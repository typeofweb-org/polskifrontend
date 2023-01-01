import { getConfig } from '../api-helpers/config';

type HeadTagsProps = {
  readonly title?: string;
  readonly description?: string;
};

export const HeadTags = ({
  title = 'Polski Frontend',
  description = 'Serwis Polski Frontend powstał w celu zebrania w jednym miejscu jak największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego frontend developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są w języku polskim!',
}: HeadTagsProps) => {
  const parsedTitle = title.trim() ? `${title} • Polski Frontend` : `Polski Frontend`;

  return (
    <>
      <title>{parsedTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="robots" content="index,follow" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${getConfig('NEXT_PUBLIC_URL')}/logo_og.png`} />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Polski Frontend" />
      <meta property="og:url" content={`${getConfig('NEXT_PUBLIC_URL')}/list`} />
      <meta property="og:title" content={parsedTitle} />
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
    </>
  );
};
