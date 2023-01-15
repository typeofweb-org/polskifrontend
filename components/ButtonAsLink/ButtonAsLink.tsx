import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clsx from 'clsx';
import Link from 'next/link';
import { memo, forwardRef } from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { AnchorHTMLAttributes } from 'react';

type ButtonAsLinkProps = {
  readonly icon?: IconDefinition;
  readonly href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonAsLink = memo<ButtonAsLinkProps>(
  forwardRef<HTMLAnchorElement, ButtonAsLinkProps>(
    ({ icon, children, className = '', ...props }, ref) => {
      return (
        <Link
          className={Clsx(
            'flex w-fit items-center rounded-[10px] bg-primary-base py-2 px-3 font-medium text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.25)] transition-[filter] hover:brightness-95 active:brightness-105',
            className,
          )}
          ref={ref}
          {...props}
        >
          {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-primary-dark" />}
          {children}
        </Link>
      );
    },
  ),
);

ButtonAsLink.displayName = 'ButtonAsLink';
