import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { memo } from 'react';

import styles from './displayStyleSwitch.module.scss';

type DisplayStyleSwitchProps = {
  readonly value: 'GRID' | 'LIST';
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const DisplayStyleSwitch = memo<DisplayStyleSwitchProps>(({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        className={clsx('sr-only', styles.input)}
        value="GRID"
        checked={value === 'GRID'}
        type="radio"
        name="displayStyle"
        id="GRID"
        onChange={onChange}
      />
      <label className={styles.label} htmlFor="GRID">
        <span className="icon-th-large"></span>
        <span className="sr-only">Display articles as a grid</span>
      </label>
      <input
        className={clsx('sr-only', styles.input)}
        value="LIST"
        checked={value === 'LIST'}
        type="radio"
        name="displayStyle"
        id="LIST"
        onChange={onChange}
      />
      <label className={styles.label} htmlFor="LIST">
        <span className="icon-menu"></span>
        <span className="sr-only">Display articles as a list</span>
      </label>
    </div>
  );
});
