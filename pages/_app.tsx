import 'normalize.css/normalize.css';
import '../global.scss';
import '../icomoon-v1.0/style.css';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
