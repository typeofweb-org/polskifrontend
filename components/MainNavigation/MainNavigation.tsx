import Link from 'next/link';

import styles from './mainNavigation.module.scss';

const links = [
  { label: 'O serwisie', href: '/o-serwisie', openInNewTab: false, icon: 'question-circle' },
  {
    label: 'Facebook',
    href: 'https://facebook.com/polskifrontend',
    openInNewTab: true,
    icon: 'facebook',
  },
  {
    label: 'RSS',
    href: `/feed`,
    openInNewTab: true,
    icon: 'rss2',
  },
];

export const MainNavigation = () => {
  return (
    <nav>
      <ul className={styles.navigationList}>
        {links.map(({ label, href, openInNewTab, icon }) => (
          <li className={styles.navigationItem} key={href}>
            <Link href={href}>
              <a {...(openInNewTab && { target: '_blank' })} title={label}>
                <span className={`icon-${icon} ${styles.icon}`}></span>
                <span className={styles.label}>{label}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
