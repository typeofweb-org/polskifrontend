import clsx from 'clsx';
import { memo, forwardRef } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  readonly as?: 'a' | 'button';
  readonly icon?: string;
  readonly children?: React.ReactNode;
  readonly type?: string;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
  readonly href?: string;
};

export const Button = memo<ButtonProps>(
  forwardRef((props, ref) => {
    const { as: As = 'button', icon, children, ...restProps } = props;
    return (
      // @ts-ignore
      <As className={styles.button} ref={ref} {...restProps}>
        {icon && <span className={clsx(icon, children && styles.icon)}></span>}
        {children}
      </As>
    );
  }),
);
Button.displayName = 'Button';
