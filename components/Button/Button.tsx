import clsx from 'clsx';
import React from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  readonly as?: 'a' | 'button';
  readonly icon?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
};

export const Button = React.memo<ButtonProps>(
  ({ as: As = 'button', icon, children, onClick, disabled }) => {
    return (
      <As className={styles.button} onClick={onClick} disabled={disabled}>
        {icon && <span className={clsx(icon, children && styles.icon)}></span>}
        {children}
      </As>
    );
  },
);
