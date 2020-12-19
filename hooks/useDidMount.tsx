import type { EffectCallback } from 'react';
import { useEffect } from 'react';

export const useDidMount = (cb: EffectCallback) => useEffect(cb, []);
