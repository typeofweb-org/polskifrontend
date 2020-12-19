import type { EffectCallback } from 'react';
import { useEffect } from 'react';

// eslint-ignore
export const useDidMount = (cb: EffectCallback) => useEffect(cb);
