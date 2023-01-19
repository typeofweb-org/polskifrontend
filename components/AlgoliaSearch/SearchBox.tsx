'use client';

import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connectSearchBox, PoweredBy } from 'react-instantsearch-dom';

import type { ChangeEvent } from 'react';

type CustomSearchBoxProps = {
  readonly changeSearchState: (query: string) => void;
  readonly clearSearchState: () => void;
  readonly currentRefinement: string;
  readonly query: string;
  readonly isSearchStalled: boolean;
  readonly refine: (query: string) => void;
};

const CustomSearchBox = ({
  query,
  refine,
  changeSearchState,
  clearSearchState,
}: CustomSearchBoxProps) => {
  const handleSearch = () => {
    if (query?.length <= 0) return;

    refine(query);
  };

  const handleChangeSearchState = (event: ChangeEvent<HTMLInputElement>) => {
    changeSearchState(event.currentTarget.value);
  };

  return (
    <div className="mx-auto my-6 w-full max-w-2xl">
      <div className="relative h-full w-full">
        <button
          type="button"
          title="Zatwierdź frazę wyszukiwania"
          className="absolute inset-y-0 left-4 my-auto md:left-5"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faSearch} className="text-xl text-primary-base md:text-2xl" />
        </button>

        <input
          className="h-full w-full rounded-3xl bg-white px-[52px] py-5 font-light shadow-[0_0_33px_rgba(0,0,0,0.25)] md:px-16 md:text-2xl"
          type="input"
          value={query}
          onChange={handleChangeSearchState}
          placeholder="Jaki temat Cię interesuje?"
        />

        <PoweredBy className="absolute top-3 right-5 !hidden flex-col text-gray-light sm:!flex" />

        {query?.length > 0 && (
          <button
            onClick={clearSearchState}
            className="absolute inset-y-0 right-5 my-auto h-fit p-0.5 sm:right-32"
          >
            <FontAwesomeIcon className="md:text-lg" icon={faTimes} />
          </button>
        )}
      </div>

      <div className="mt-2 flex w-full justify-end sm:!hidden">
        <PoweredBy className="ml-auto text-gray-secondary" />
      </div>
    </div>
  );
};

export const SearchBox = connectSearchBox(CustomSearchBox);
