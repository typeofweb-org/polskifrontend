'use client';

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
    if (query.length <= 0) return;

    refine(query);
  };

  const handleChangeSearchState = (event: ChangeEvent<HTMLInputElement>) => {
    changeSearchState(event.currentTarget.value);
  };

  return (
    <div className="relative mx-auto my-5 w-full max-w-2xl">
      <button
        type="button"
        title="Zatwierdź frazę wyszukiwania"
        className="absolute top-[20px] left-5"
        onClick={handleSearch}
      >
        <span className="icon-plus text-2xl text-primary-base"></span>
      </button>

      <input
        className="h-full w-full rounded-3xl bg-white px-16 py-5 text-2xl font-light shadow-[0_0_33px_rgba(0,0,0,0.25)]"
        type="input"
        value={query}
        onChange={handleChangeSearchState}
        placeholder="Jaki temat Cię interesuje?"
      />

      <PoweredBy className="absolute top-3 right-5 flex flex-col text-gray-light" />

      {query.length > 0 && (
        <button onClick={clearSearchState}>
          <span className="icon-plus text-gray absolute top-7 right-32"></span>
        </button>
      )}
    </div>
  );
};

export const SearchBox = connectSearchBox(CustomSearchBox);
