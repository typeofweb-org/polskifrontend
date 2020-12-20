import { LinkAnchor } from '../LinkAnchor/LinkAnchor';

import styles from './mainHeader.module.scss';

export const MainHeader = () => {
  return (
    <section className={styles.headerSection}>
      <LinkAnchor title="Przejdź na stronę główną" className={styles.headerLink} href="/">
        <h1 className={styles.title}>
          <span className="sr-only">Polski front-end</span>
          <img src="/logo.svg" alt="" />
        </h1>
      </LinkAnchor>
    </section>
  );
};
