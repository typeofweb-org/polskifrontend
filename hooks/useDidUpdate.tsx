import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

import { useDidMount } from './useDidMount';

export const useDidUpdate = (effect: EffectCallback) => {
  const didMount = useRef(false);

  useDidMount(() => {
    didMount.current = true;
  });

  useEffect(() => {
    if (didMount.current) {
      return effect();
    }
  }, [effect]);
};
