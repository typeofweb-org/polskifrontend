'use client';

import { memo } from 'react';

import { useChangeDisplayStyle } from './useChangeDisplayStyle';

import type { DisplayPreferences } from '../../hooks/useDisplayPreferences';

type SwitchDisplayStyleProps = {
  readonly value: DisplayPreferences;
};

export const SwitchDisplayStyle = memo<SwitchDisplayStyleProps>(({ value }) => {
  const { changeDisplayToGrid, changeDisplayToList } = useChangeDisplayStyle();

  return (
    <div className="mx-5 mb-5 flex justify-end gap-5">
      <button
        aria-pressed={value === 'grid'}
        className="group flex w-9 flex-wrap items-center justify-center gap-1"
        onClick={changeDisplayToGrid}
      >
        <div className="group-hover:bg-primary-base/80 h-[15px] w-[15px] bg-gray-secondary transition-colors duration-300 ease-out group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
        <div className="group-hover:bg-primary-base/80 h-[15px] w-[15px] bg-gray-secondary transition-colors duration-300 ease-out group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
        <div className="group-hover:bg-primary-base/80 h-[15px] w-[15px] bg-gray-secondary transition-colors duration-300 ease-out group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
        <div className="group-hover:bg-primary-base/80 h-[15px] w-[15px] bg-gray-secondary transition-colors duration-300 ease-out group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>

        <span className="sr-only">Wyświetl jako siatkę</span>
      </button>

      <button
        aria-pressed={value === 'list'}
        className="group flex flex-col items-center justify-center gap-1"
        onClick={changeDisplayToList}
      >
        <div className="group-hover:bg-primary-base/80 h-[15px] w-8 bg-gray-secondary transition-colors duration-300 ease-out group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>
        <div className="group-hover:bg-primary-base/80 h-[15px] w-8 bg-gray-secondary transition-colors duration-300 ease-out group-active:bg-primary-base group-aria-pressed:bg-primary-base"></div>

        <span className="sr-only">Wyświetl jako listę</span>
      </button>
    </div>
  );
});

SwitchDisplayStyle.displayName = 'SwitchDisplayStyle';
