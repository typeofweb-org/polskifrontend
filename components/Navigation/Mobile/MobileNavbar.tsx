'use client';

import Clsx from 'clsx';

import { ButtonAsLink } from '../../ButtonAsLink/ButtonAsLink';
import { NavItem } from '../NavItem';
import Links from '../links.json';

import { useMobileNavbar } from './useMobileNavbar';

export const MobileNavbar = () => {
  const { isActive, close, open } = useMobileNavbar();

  return (
    <>
      <ul
        className={Clsx(
          'fixed top-0 left-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white lg:hidden',
          isActive ? 'flex' : 'hidden',
        )}
      >
        {Links.map(({ label, href, openInNewTab, icon }) => (
          <li key={href}>
            <NavItem
              target={openInNewTab ? '_blank' : '_self'}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              title={label}
              href={href}
              icon={icon}
              className="text-xl hover:font-black"
              onClick={close}
            >
              {label}
            </NavItem>
          </li>
        ))}

        <li>
          <ButtonAsLink href="/zglos-serwis" icon="icon-plus">
            DODAJ SERWIS
          </ButtonAsLink>
        </li>
      </ul>

      <button
        className="group flex flex-col items-center justify-center gap-1 lg:hidden"
        onClick={open}
        aria-label="Otwórz nawigację"
      >
        <div className="h-[5px] w-8 bg-gray-medium transition-colors duration-300 ease-out group-hover:bg-primary-base/80 group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
        <div className="h-[5px] w-8 bg-gray-medium transition-colors duration-300 ease-out group-hover:bg-primary-base/80 group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
        <div className="h-[5px] w-8 bg-gray-medium transition-colors duration-300 ease-out group-hover:bg-primary-base/80 group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
      </button>

      <button
        onClick={close}
        className={Clsx('fixed top-5 right-5 z-50', isActive ? 'inline-block' : 'hidden')}
      >
        CLOSE
      </button>
    </>
  );
};
