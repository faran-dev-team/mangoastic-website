"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewportOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

type UseInViewportResult<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  inView: boolean;
};

/**
 * IntersectionObserver helper for pause/play style effects (e.g. marquees).
 */
export function useInViewport<T extends HTMLElement = HTMLElement>(
  options: UseInViewportOptions = {},
): UseInViewportResult<T> {
  const { rootMargin = "0px", threshold = 0.1, once = false } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
