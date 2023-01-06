import Clsx from 'clsx';
import { memo, forwardRef } from 'react';

import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  readonly icon?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo<ButtonProps>(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ icon, children, className = '', ...props }, ref) => {
      return (
        <button
          className={Clsx(
            'flex w-fit items-center rounded-[10px] bg-primary-base py-2 px-3 font-medium text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.25)] transition-[filter] hover:brightness-95 active:brightness-105',
            className,
          )}
          ref={ref}
          {...props}
        >
          {icon && <span className={Clsx(icon, 'mr-2 text-primary-dark')}></span>}
          {children}
        </button>
      );
    },
  ),
);

Button.displayName = 'Button';
