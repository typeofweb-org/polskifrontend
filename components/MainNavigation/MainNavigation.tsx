import Link from 'next/link';

import Styles from './mainNavigation.module.scss';

const links = [
  {
    href: '/o-serwisie',
    icon: 'question-circle',
    label: 'O serwisie',
    openInNewTab: false,
  },
  {
    href: 'https://facebook.com/polskifrontend',
    icon: 'facebook',
    label: 'Facebook',
    openInNewTab: true,
  },
  {
    href: `https://polskifrontend.pl/feed`,
    icon: 'rss2',
    label: 'RSS',
    openInNewTab: true,
  },
  {
    href: `https://discord.typeofweb.com`,
    icon: 'discord',
    label: 'Discord',
    openInNewTab: true,
  },
  {
    href: 'https://github.com/typeofweb/polskifrontend',
    icon: 'github',
    label: 'Github',
    openInNewTab: true,
  },
];

export const MainNavigation = () => (
  <nav>
    <ul className={Styles.navigationList}>
      {links.map(({ label, href, openInNewTab, icon }) => (
        <li className={Styles.navigationItem} key={href}>
          {openInNewTab ? (
            <a
              className={Styles.link}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
            >
              <span className={`icon-${icon} ${Styles.icon}`} />
              <span className={Styles.label}>{label}</span>
            </a>
          ) : (
            <Link href={href}>
              <a className={Styles.link} title={label}>
                <span className={`icon-${icon} ${Styles.icon}`} />
                <span className={Styles.label}>{label}</span>
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
