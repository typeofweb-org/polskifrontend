import clsx from 'clsx';
import type { ChangeEventHandler } from 'react';
import { memo } from 'react';

import type { DisplayPreferences } from '../../hooks/useDisplayPreferences';

import styles from './displayStyleSwitch.module.scss';

type DisplayStyleSwitchProps = {
  readonly value: DisplayPreferences;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
};

export const DisplayStyleSwitch = memo<DisplayStyleSwitchProps>(({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <label title="Wyświetl jako siatkę">
        <input
          className={clsx('sr-only', styles.input)}
          value="grid"
          checked={value === 'grid'}
          type="radio"
          name="displayStyle"
          onChange={onChange}
        />
        <span className={styles.span}>
          <span className="icon-th-large"></span>
          <span className="sr-only">Wyświetl jako siatkę</span>
        </span>
      </label>
      <label title="Wyświetl jako listę">
        <input
          className={clsx('sr-only', styles.input)}
          value="list"
          checked={value === 'list'}
          type="radio"
          name="displayStyle"
          onChange={onChange}
        />
        <span className={styles.span}>
          <span className="icon-menu"></span>
          <span className="sr-only">Wyświetl jako listę</span>
        </span>
      </label>
    </div>
  );
});
DisplayStyleSwitch.displayName = 'DisplayStyleSwitch';
