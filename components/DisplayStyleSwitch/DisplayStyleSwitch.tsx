'use client';

import Clsx from 'clsx';
import { memo } from 'react';

import Styles from './displayStyleSwitch.module.scss';
import { useChangeDisplayStyle } from './useChangeDisplayStyle';

import type { DisplayPreferences } from '../../hooks/useDisplayPreferences';

type DisplayStyleSwitchProps = {
  readonly value: DisplayPreferences;
};

export const DisplayStyleSwitch = memo<DisplayStyleSwitchProps>(({ value }) => {
  const changeDisplay = useChangeDisplayStyle();

  return (
    <div className={Styles.container}>
      <label title="Wyświetl jako siatkę">
        <input
          className={Clsx('sr-only', Styles.input)}
          value="grid"
          checked={value === 'grid'}
          type="radio"
          name="displayStyle"
          onChange={changeDisplay}
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
          onChange={changeDisplay}
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
