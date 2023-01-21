import Image from 'next/image';
import Link from 'next/link';

import { ButtonAsLink } from '../ButtonAsLink/ButtonAsLink';

import { MobileNavbar } from './MobileNavbar/MobileNavbar';
import { NavItem } from './NavItem';
import { links } from './links';

export const Navigation = () => (
  <nav className="flex items-center justify-between py-3 md:py-6 lg:py-10">
    <Link href="/" title="Przejdź na stronę główną">
      <h1>
        <span className="sr-only">Polski Frontend</span>
        <Image
          width="163"
          height="46"
          src="/new-logo.svg"
          className="md:h-[84px] md:w-[296px] lg:h-[60px] lg:w-[213px] xl:h-[84px] xl:w-[296px]"
          alt="Polski Frontend"
          priority
        />
      </h1>
    </Link>

    {/* Desktop navigation */}
    <ul className="hidden items-center gap-3 lg:flex lg:gap-5">
      {links.map(({ label, href, openInNewTab, icon }) => (
        <li key={href}>
          <NavItem
            target={openInNewTab ? '_blank' : '_self'}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            title={label}
            href={href}
            icon={icon}
          >
            {label}
          </NavItem>
        </li>
      ))}
      <li>
        <ButtonAsLink href="/zglos-serwis" icon="plus">
          DODAJ SERWIS
        </ButtonAsLink>
      </li>
    </ul>

    {/* Mobile navigation */}
    <MobileNavbar />
  </nav>
);
