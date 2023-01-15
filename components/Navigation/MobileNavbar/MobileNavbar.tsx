'use client';

import { faAdd, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clsx from 'clsx';

import { ButtonAsLink } from '../../ButtonAsLink/ButtonAsLink';
import { NavItem } from '../NavItem';
import { links } from '../links';

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
        {links.map(({ label, href, openInNewTab, icon }) => (
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
          <ButtonAsLink href="/zglos-serwis" icon={faAdd}>
            DODAJ SERWIS
          </ButtonAsLink>
        </li>
      </ul>

      <button
        className="group flex flex-col items-center justify-center gap-1 lg:hidden"
        onClick={open}
        aria-label="Otwórz nawigację"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-3xl text-primary-base transition-colors duration-300 ease-out group-hover:bg-primary-base/80 group-active:bg-primary-base group-aria-pressed:bg-primary-base"
        />
      </button>

      <button
        onClick={close}
        className={Clsx('fixed top-5 right-5 z-50', isActive ? 'inline-block' : 'hidden')}
        aria-label="Zamknij nawigację"
      >
        <FontAwesomeIcon
          icon={faTimes}
          className="text-3xl text-primary-base transition-colors duration-300 ease-out group-hover:bg-primary-base/80 group-active:bg-primary-base group-aria-pressed:bg-primary-base"
        />
      </button>
    </>
  );
};
