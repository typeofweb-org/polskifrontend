import type { EffectCallback } from 'react';
import { useEffect } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
export const useWillUnmount = (cb: ReturnType<EffectCallback>) => {
  useEffect(() => cb, []);
};
