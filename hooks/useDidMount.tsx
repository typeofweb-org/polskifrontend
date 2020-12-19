import type { EffectCallback } from 'react';
import { useEffect } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
export const useDidMount = (cb: EffectCallback) => useEffect(cb, []);
