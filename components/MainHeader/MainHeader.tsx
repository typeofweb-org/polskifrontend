import Link from 'next/link';

import styles from './mainHeader.module.scss';

const links = [
  { label: 'Aktualności', href: '/aktualnosci', openInNewWindow: false },
  { label: 'O serwisie', href: '/o-serwisie', openInNewWindow: false },
  { label: 'Zgłoś uwagi', href: '/zglos-uwagi', openInNewWindow: false },
  { label: 'Facebook', href: 'https://facebook.com/polskifrontend', openInNewWindow: true },
];

export const MainHeader = () => {
  return (
    <header>
      <ul className={styles.headerList}>
        {links.map(({ label, href, openInNewWindow }) => (
          <li className={styles.headerItem} key={href}>
            <Link href={href}>
              <a {...(openInNewWindow && { target: '_blank' })}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
