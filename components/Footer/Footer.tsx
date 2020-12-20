import { LinkAnchor } from '../LinkAnchor/LinkAnchor';

import styles from './footer.module.scss';

const copyrightYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright@{copyrightYear} –{' '}
        <LinkAnchor href="https://typeofweb.com" target="_blank">
          Type of Web
        </LinkAnchor>
      </p>
    </footer>
  );
};
