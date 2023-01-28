import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const date = new Date();
const copyrightYear = date.getFullYear();

export const Footer = memo(() => {
  return (
    <footer className="footer-container bg-theme-secondary">
      <div className="mt-5 flex flex-col items-center justify-between gap-5 border-t-2 border-primary-dark pt-5 pb-3 md:mt-8 md:flex-row">
        <div className="gap-3 text-center md:flex md:text-left">
          <p>
            Copyright@{copyrightYear} –{' '}
            <Link href="https://typeofweb.com" target="_blank" rel="noopener noreferrer">
              Type of Web
            </Link>
          </p>

          <Link href="/regulamin" className="font-bold hover:underline">
            REGULAMIN
          </Link>
        </div>

        <Link
          href="https://vercel.com?utm_source=typeofweb&utm_campaign=oss"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/powered-by-vercel.svg" alt="Powered by Vercel" width={209} height={40} />
        </Link>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
