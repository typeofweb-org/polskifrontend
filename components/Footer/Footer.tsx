import Link from 'next/link';

import styles from './footer.module.scss';

const copyrightYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Copyright@{copyrightYear} -{' '}
        <Link href="https://nafrontendzie.pl">
          <a target="_blank">Na Frontendzie</a>
        </Link>
      </p>
    </footer>
  );
};
