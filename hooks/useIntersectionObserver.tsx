import { useCallback, useEffect, useRef, useState } from 'react';

import { useWillUnmount } from './useWillUnmount';

type UseIntersectionObserverArgs = Pick<IntersectionObserverInit, 'rootMargin' | 'threshold'>;
type ObserverCallback = (entry: IntersectionObserverEntry) => void;
type Observer = {
  readonly key: string;
  readonly intersectionObserver: IntersectionObserver;
  // eslint-disable-next-line
  readonly elementToCallback: Map<Element, ObserverCallback>;
};

export const useIntersectionObserver = <T extends Element = HTMLElement>(
  options: UseIntersectionObserverArgs,
) => {
  const unobserve = useRef<() => void>();

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const setRef = useCallback(
    (el: T) => {
      console.log({ el });

      if (unobserve.current) {
        unobserve.current();
        unobserve.current = undefined;
      }

      if (el && el.tagName) {
        unobserve.current = observe(el, setEntry, options);
      }
    },
    [options],
  );

  useWillUnmount(() => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }
  });

  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return { setRef: () => {}, entry: null } as const;
  }

  return { setRef, entry } as const;
};

const observe = (() => {
  const observers = new Map<string, Observer>();

  const createObserver = (options: UseIntersectionObserverArgs) => {
    const key = JSON.stringify(options);
    if (observers.has(key)) {
      return observers.get(key)!;
    }

    const elementToCallback = new Map<Element, ObserverCallback>();
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = elementToCallback.get(entry.target);
        if (callback) {
          callback(entry);
        }
      });
    }, options);

    const observer: Observer = {
      key,
      elementToCallback,
      intersectionObserver,
    };
    observers.set(key, observer);

    return observer;
  };

  return <T extends Element>(
    el: T,
    callback: ObserverCallback,
    options: UseIntersectionObserverArgs,
  ) => {
    const { key, elementToCallback, intersectionObserver } = createObserver(options);
    elementToCallback.set(el, callback);
    intersectionObserver.observe(el);

    const unobserve = () => {
      intersectionObserver.unobserve(el);
      elementToCallback.delete(el);

      if (elementToCallback.size === 0) {
        intersectionObserver.disconnect();
        observers.delete(key);
      }
    };
    return unobserve;
  };
})();
