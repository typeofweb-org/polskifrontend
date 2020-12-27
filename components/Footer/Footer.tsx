import Link from 'next/link';

import styles from './footer.module.scss';

const copyrightYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://vercel.com?utm_source=typeofweb&utm_campaign=oss">
        <a target="_blank">
          <img src="/powered-by-vercel.svg" alt="Powered by Vercel" width={209} height={40} />
        </a>
      </Link>
      <p>
        Copyright@{copyrightYear} –{' '}
        <Link href="https://typeofweb.com">
          <a target="_blank">Type of Web</a>
        </Link>
      </p>
    </footer>
  );
};
