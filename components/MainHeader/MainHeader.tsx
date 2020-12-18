import Link from 'next/link';

import styles from './mainHeader.module.scss';

export const MainHeader = () => {
  return (
    <section className={styles.headerSection}>
      <Link href="/">
        <a title="Przejdź na stronę główną" className={styles.headerLink}>
          <h1 className={styles.title}>
            <span className="sr-only">Polski front-end</span>
            <img src="/logo.svg" alt="" />
          </h1>
        </a>
      </Link>
    </section>
  );
};
