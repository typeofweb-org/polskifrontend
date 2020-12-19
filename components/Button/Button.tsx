import clsx from 'clsx';
import { memo, forwardRef } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  readonly as?: 'a' | 'button';
  readonly icon?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
};

export const Button = memo<ButtonProps>(
  forwardRef<any, ButtonProps>(({ as: As = 'button', icon, children, onClick, disabled }, ref) => {
    return (
      <As className={styles.button} onClick={onClick} disabled={disabled} ref={ref}>
        {icon && <span className={clsx(icon, children && styles.icon)}></span>}
        {children}
      </As>
    );
  }),
);
