import Clsx from 'clsx';
import Link from 'next/link';
import { memo, forwardRef } from 'react';

import Styles from '../Button/button.module.scss';

import type { ButtonStyle, IconPosition } from '../Button/Button';
import type { AnchorHTMLAttributes } from 'react';

type ButtonAsLinkProps = {
  readonly icon?: string;
  readonly disabled?: boolean;
  readonly href: string;
  readonly iconPosition?: IconPosition;
  readonly buttonStyle?: ButtonStyle;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonAsLink = memo<ButtonAsLinkProps>(
  forwardRef<HTMLAnchorElement, ButtonAsLinkProps>(
    (
      {
        icon,
        children,
        className = '',
        disabled,
        iconPosition = 'left',
        buttonStyle = 'normal',
        ...props
      },
      ref,
    ) => {
      return (
        <Link
          className={Clsx(Styles.button, className, {
            [Styles.buttonIconRight]: iconPosition === 'right',
            [Styles.buttonDanger]: buttonStyle === 'danger',
            [Styles.buttonDisabled]: disabled,
          })}
          ref={ref}
          {...props}
        >
          {icon && <span className={Clsx(icon, children && Styles.icon)}></span>}
          {children}
        </Link>
      );
    },
  ),
);
ButtonAsLink.displayName = 'ButtonAsLink';
