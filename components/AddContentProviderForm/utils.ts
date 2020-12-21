import { useCallback, useReducer } from 'react';

type State = {
  readonly isError: boolean;
  readonly isLoading: boolean;
  readonly isSucces: boolean;
};

type Action = {
  readonly type: 'setIsError' | 'setIsLoading' | 'setIsSuccess';
};

const DEFAULT_STATE = { isError: false, isSucces: false, isLoading: false };

function formReducer(_: State, action: Action): State {
  switch (action.type) {
    case 'setIsError':
      return { isError: true, isSucces: false, isLoading: false };
    case 'setIsLoading':
      return { isError: false, isSucces: false, isLoading: true };
    case 'setIsSuccess':
      return { isError: false, isSucces: true, isLoading: false };
    default:
      return DEFAULT_STATE;
  }
}

export const useFormReducer = () => {
  const [state, dispatch] = useReducer(formReducer, DEFAULT_STATE);

  const setIsError = useCallback(() => dispatch({ type: 'setIsError' }), []);
  const setIsLoading = useCallback(() => dispatch({ type: 'setIsLoading' }), []);
  const setIsSuccess = useCallback(() => dispatch({ type: 'setIsSuccess' }), []);

  return {
    ...state,
    setIsError,
    setIsLoading,
    setIsSuccess,
  };
};
