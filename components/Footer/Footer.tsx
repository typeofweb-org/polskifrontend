import Link from 'next/link';
import { memo } from 'react';

import styles from './footer.module.scss';

const date = new Date();
const copyrightYear = date.getFullYear();

export const Footer = memo<{ readonly date: string }>(({ date }) => {
  return (
    <footer className={styles.footer}>
      <Link href="https://vercel.com?utm_source=typeofweb&utm_campaign=oss">
        <a target="_blank" rel="noopener noreferrer">
          <img src="/powered-by-vercel.svg" alt="Powered by Vercel" width={209} height={40} />
        </a>
      </Link>
      <p>
        Copyright@{copyrightYear} –{' '}
        <Link href="https://typeofweb.com">
          <a target="_blank" rel="noopener noreferrer">
            Type of Web
          </a>
        </Link>{' '}
        <span aria-hidden={true} className={styles.version}>
          {process.env.NEXT_PUBLIC_VERSION || ''} <time>{date}</time>
        </span>
      </p>
    </footer>
  );
});
Footer.displayName = 'Footer';
