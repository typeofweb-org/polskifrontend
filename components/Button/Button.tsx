import Clsx from 'clsx';
import { memo, forwardRef } from 'react';

import Styles from './button.module.scss';

import type { ButtonHTMLAttributes } from 'react';

export type IconPosition = 'right' | 'left';
export type ButtonStyle = 'normal' | 'danger';

type ButtonProps = {
  readonly icon?: string;
  readonly iconPosition?: IconPosition;
  readonly buttonStyle?: ButtonStyle;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo<ButtonProps>(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      { icon, children, className = '', iconPosition = 'left', buttonStyle = 'normal', ...props },
      ref,
    ) => {
      return (
        <button
          className={Clsx(Styles.button, className, {
            [Styles.buttonIconRight]: iconPosition === 'right',
            [Styles.buttonDanger]: buttonStyle === 'danger',
            [Styles.buttonDisabled]: props.disabled,
          })}
          ref={ref}
          {...props}
        >
          {icon && <span className={Clsx(icon, children && Styles.icon)}></span>}
          {children}
        </button>
      );
    },
  ),
);
Button.displayName = 'Button';
