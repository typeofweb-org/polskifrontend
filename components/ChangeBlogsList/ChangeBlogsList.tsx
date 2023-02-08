'use client';

import { useRouter } from 'next/navigation';

import type { BlogsType } from '../../utils/types/types';
import type { ChangeEvent } from 'react';

type ChangeBlogsListProps = {
  readonly type: BlogsType;
};

export const ChangeBlogsList = ({ type }: ChangeBlogsListProps) => {
  const changeType = useChangeBlogsList();

  return (
    <label className="my-4 block">
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
  const router = useRouter();

  const changeType = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (!checkValueHasCorrectType(value)) {
      return;
    }

    if (value === 'all') {
      return router.push('/admin');
    }

    return router.push(`/admin/${value}`);
  };

  return changeType;
};

const checkValueHasCorrectType = (value: string): value is BlogsType => {
  return ['public', 'nonpublic', 'all'].includes(value);
};
