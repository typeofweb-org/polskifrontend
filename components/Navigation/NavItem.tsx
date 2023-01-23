'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { UrlObject } from 'url';

type NavItemProps = {
  readonly href: string | UrlObject;
  readonly icon: string;
  readonly children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavItem = ({ href, icon, children, className, ...rest }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = detectIsActive(href, pathname);

  return (
    <Link
      href={href}
      className={clsx('group relative flex items-center text-gray-secondary', className, {
        'font-black !text-black': isActive,
      })}
      {...rest}
    >
      <div className="flex items-center">
        <Image
          className="align-center inline"
          src={`/icons/${icon}.svg`}
          alt=""
          width="12"
          height="12"
        />
        <span className="ml-1">{children}</span>
      </div>
      <div
        className={clsx(
          'absolute -bottom-px left-0 hidden h-[2px] bg-primary-light md:block',
          isActive ? 'w-4/5' : 'w-0 transition-[width] duration-300 ease-out group-hover:w-4/5',
        )}
      ></div>
    </Link>
  );
};

const detectIsActive = (href: string, pathname: string | null) => {
  if (href === '/') {
    return pathname?.includes('/list') || pathname?.includes('/grid') || href === pathname;
  }

  return href === pathname;
};
