import Clsx from 'clsx';
import { memo } from 'react';

import Styles from './displayStyleSwitch.module.scss';

import type { DisplayPreferences } from '../../hooks/useDisplayPreferences';
import type { ChangeEventHandler } from 'react';

type DisplayStyleSwitchProps = {
  readonly value: DisplayPreferences;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
};

export const DisplayStyleSwitch = memo<DisplayStyleSwitchProps>(({ value, onChange }) => {
  return (
    <div className={Styles.container}>
      <label title="Wyświetl jako siatkę">
        <input
          className={Clsx('sr-only', Styles.input)}
          value="grid"
          checked={value === 'grid'}
          type="radio"
          name="displayStyle"
          onChange={onChange}
        />
        <span className={Styles.span}>
          <span className="icon-th-large"></span>
          <span className="sr-only">Wyświetl jako siatkę</span>
        </span>
      </label>
      <label title="Wyświetl jako listę">
        <input
          className={Clsx('sr-only', Styles.input)}
          value="list"
          checked={value === 'list'}
          type="radio"
          name="displayStyle"
          onChange={onChange}
        />
        <span className={Styles.span}>
          <span className="icon-menu"></span>
          <span className="sr-only">Wyświetl jako listę</span>
        </span>
      </label>
    </div>
  );
});
DisplayStyleSwitch.displayName = 'DisplayStyleSwitch';
