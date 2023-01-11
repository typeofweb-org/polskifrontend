import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const date = new Date();
const copyrightYear = date.getFullYear();

export const Footer = memo(() => {
  return (
    <footer className="flex items-center justify-between border-t-2 border-[#EBEBEB] bg-[#F2F2F2] py-6">
      <div className="flex gap-5">
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
    </footer>
  );
});

Footer.displayName = 'Footer';
