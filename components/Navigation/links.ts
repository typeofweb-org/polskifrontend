import { faDiscord, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHome, faQuestionCircle, faRss } from '@fortawesome/free-solid-svg-icons';

export const links = [
  {
    href: '/',
    icon: faHome,
    label: 'HOME',
    openInNewTab: false,
  },
  {
    href: '/o-serwisie',
    icon: faQuestionCircle,
    label: 'O SERWISIE',
    openInNewTab: false,
  },
  {
    href: 'https://facebook.com/polskifrontend',
    icon: faFacebook,
    label: 'FACEBOOK',
    openInNewTab: true,
  },
  {
    href: 'https://polskifrontend.pl/feed',
    icon: faRss,
    label: 'RSS',
    openInNewTab: true,
  },
  {
    href: 'https://discord.typeofweb.com',
    icon: faDiscord,
    label: 'DISCORD',
    openInNewTab: true,
  },
  {
    href: 'https://github.com/typeofweb/polskifrontend',
    icon: faGithub,
    label: 'GITHUB',
    openInNewTab: true,
  },
];
