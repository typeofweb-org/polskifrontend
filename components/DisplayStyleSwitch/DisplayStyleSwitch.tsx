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
      <label>
        <input
          className={clsx('sr-only', styles.input)}
          value="GRID"
          checked={value === 'GRID'}
          type="radio"
          name="displayStyle"
          onChange={onChange}
        />
        <span className={styles.span}>
          <span className="icon-th-large"></span>
          <span className="sr-only">Display articles as a grid</span>
        </span>
      </label>
      <label>
        <input
          className={clsx('sr-only', styles.input)}
          value="LIST"
          checked={value === 'LIST'}
          type="radio"
          name="displayStyle"
          onChange={onChange}
        />
        <span className={styles.span}>
          <span className="icon-menu"></span>
          <span className="sr-only">Display articles as a list</span>
        </span>
      </label>
    </div>
  );
});
DisplayStyleSwitch.displayName = 'DisplayStyleSwitch';
