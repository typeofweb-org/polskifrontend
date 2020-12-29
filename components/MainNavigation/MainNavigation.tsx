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
    href: `https://polskifrontend.pl/feed`,
    openInNewTab: true,
    icon: 'rss2',
  },
  {
    label: 'Discord',
    href: `https://discord.typeofweb.com`,
    openInNewTab: true,
    icon: 'discord',
  },
];

export const MainNavigation = () => {
  return (
    <nav>
      <ul className={styles.navigationList}>
        {links.map(({ label, href, openInNewTab, icon }) => (
          <li className={styles.navigationItem} key={href}>
            {openInNewTab ? (
              <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                <span className={`icon-${icon} ${styles.icon}`} />
                <span className={styles.label}>{label}</span>
              </a>
            ) : (
              <Link href={href}>
                <a title={label}>
                  <span className={`icon-${icon} ${styles.icon}`} />
                  <span className={styles.label}>{label}</span>
                </a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
