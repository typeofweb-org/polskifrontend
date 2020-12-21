import clsx from 'clsx';
import { memo, forwardRef } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  readonly as?: 'a' | 'button';
  readonly icon?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly href?: string;
};

export const Button = memo<ButtonProps>(
  forwardRef(
    ({ as: As = 'button', icon, children, onClick, disabled, href, className = '' }, ref) => {
      return (
        <As
          className={`${styles.button} ${className}`}
          onClick={onClick}
          disabled={disabled}
          // @ts-ignore
          ref={ref}
          href={href}
        >
          {icon && <span className={clsx(icon, children && styles.icon)}></span>}
          {children}
        </As>
      );
    },
  ),
);
Button.displayName = 'Button';
