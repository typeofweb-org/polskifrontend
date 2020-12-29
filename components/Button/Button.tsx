import clsx from 'clsx';
import { memo, forwardRef } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  readonly as?: 'a' | 'button';
  readonly icon?: string;
  readonly children?: React.ReactNode;
  readonly type?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly href?: string;
  readonly target?: string;
  readonly rel?: string;
  readonly iconPosition?: 'right' | 'left';
};

export const Button = memo<ButtonProps>(
  forwardRef(
    (
      { as: As = 'button', icon, children, className = '', iconPosition = 'left', ...props },
      ref,
    ) => {
      return (
        <As
          className={clsx(
            styles.button,
            className,
            iconPosition === 'right' && styles.buttonIconRight,
            props.disabled && styles.buttonDisabled,
          )}
          // @ts-ignore
          ref={ref}
          {...props}
        >
          {icon && <span className={clsx(icon, children && styles.icon)}></span>}
          {children}
        </As>
      );
    },
  ),
);
Button.displayName = 'Button';
