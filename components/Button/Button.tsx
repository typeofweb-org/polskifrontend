import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clsx from 'clsx';
import { memo, forwardRef } from 'react';

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  readonly icon?: IconDefinition;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo<ButtonProps>(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ icon, children, disabled, className = '', ...props }, ref) => {
      return (
        <button
          disabled={disabled}
          className={Clsx(
            'flex w-fit items-center rounded-[10px] bg-primary-base py-2 px-3 font-medium text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.25)] transition-[filter]',
            disabled
              ? 'cursor-not-allowed'
              : 'cursor-pointer hover:brightness-95 active:brightness-105',
            className,
          )}
          ref={ref}
          {...props}
        >
          {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-primary-dark" />}
          {children}
        </button>
      );
    },
  ),
);

Button.displayName = 'Button';
