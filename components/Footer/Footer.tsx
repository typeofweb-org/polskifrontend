import Image from 'next/image';
import Link from 'next/link';

import Styles from './footer.module.scss';

const date = new Date();
const copyrightYear = date.getFullYear();

export const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <Link href="https://vercel.com?utm_source=typeofweb&utm_campaign=oss">
        <a target="_blank" rel="noopener noreferrer">
          <Image
            loading="lazy"
            src="/powered-by-vercel.svg"
            alt="Powered by Vercel"
            width={209}
            height={40}
          />
        </a>
      </Link>
      <p>
        Copyright@{copyrightYear} –{' '}
        <Link href="https://typeofweb.com">
          <a target="_blank" rel="noopener noreferrer">
            Type of Web
          </a>
        </Link>{' '}
        <span aria-hidden={true} className={Styles.version}>
          {process.env.NEXT_PUBLIC_VERSION || ''}
        </span>
      </p>
      <Link href="/regulamin">
        <a>Regulamin</a>
      </Link>
    </footer>
  );
};
Footer.displayName = 'Footer';
