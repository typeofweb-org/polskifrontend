import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
    return (
      <Html lang="pl">
        <Head>
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
