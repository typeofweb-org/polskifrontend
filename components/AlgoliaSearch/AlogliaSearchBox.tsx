import { connectSearchBox } from 'react-instantsearch-dom';

type SearchBoxProps = {
  readonly currentRefinement: string;
  readonly refine: (...args: readonly unknown[]) => unknown;
  readonly isSearchStalled: boolean;
};

const SearchBox = ({ currentRefinement, isSearchStalled, refine }: SearchBoxProps) => (
  <form noValidate role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    <button onClick={() => refine('')}>Reset query</button>
    {isSearchStalled ? 'My search is stalled' : ''}
  </form>
);

export const AlgoliaSearchBox = connectSearchBox(SearchBox);
