'use client';

import { useRouter } from 'next/navigation';

import Styles from './changeBlogsList.module.scss';

import type { TypeOfBlogs } from '../../types';
import type { ChangeEvent } from 'react';

type ChangeBlogsListProps = {
  readonly type: TypeOfBlogs;
};

export const ChangeBlogsList = ({ type }: ChangeBlogsListProps) => {
  const changeType = useChangeBlogsList();

  return (
    <label className={Styles.label}>
      Pokazuj blogi:
      <select onChange={changeType} value={type}>
        <option value="all" defaultChecked>
          Wszystkie
        </option>
        <option value="public">Tylko widoczne</option>
        <option value="nonpublic">Tylko ukryte</option>
      </select>
    </label>
  );
};

const useChangeBlogsList = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- NextJS 13
  const { push } = useRouter();

  const changeType = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (!checkValueHasCorrectType(value)) {
      return;
    }

    if (value === 'all') {
      return push('/admin');
    }

    return push(`/admin/${value}`);
  };

  return changeType;
};

const checkValueHasCorrectType = (value: string): value is TypeOfBlogs => {
  return ['public', 'nonpublic', 'all'].includes(value);
};
