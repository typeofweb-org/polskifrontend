import { useEffect } from 'react';

import type { EffectCallback } from 'react';

/* eslint-disable react-hooks/exhaustive-deps -- this is on purpose */
export const useDidMount = (cb: EffectCallback) => useEffect(cb, []);
