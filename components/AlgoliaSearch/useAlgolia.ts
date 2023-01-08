import Algoliasearch from 'algoliasearch/lite';
import { useCallback, useEffect, useState } from 'react';

import { getConfig } from '../../api-helpers/config';

export const useAlgolia = () => {
  const [searchState, setSearchState] = useState({ query: '' });

  const searchClient = Algoliasearch(
    getConfig('NEXT_PUBLIC_ALGOLIA_APP_ID'),
    getConfig('NEXT_PUBLIC_ALGOLIA_API_KEY'),
  );

  const changeSearchState = (query: string) => {
    setSearchState(() => ({
      ...searchState,
      query,
    }));
  };

  const clearSearchState = useCallback(() => {
    setSearchState(() => ({
      ...searchState,
      query: '',
    }));
  }, [searchState]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      return event.key === 'Escape' && clearSearchState();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearSearchState]);

  return {
    searchClient,
    searchState,
    onSearchStateChange: setSearchState,
    changeSearchState,
    clearSearchState,
  };
};
