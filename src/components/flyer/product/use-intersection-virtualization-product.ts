import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { RefsManager } from "~/utilities/refs-manager";
import { RefKeys } from "~/utilities/refs-manager/enum";

const useIntersectionVisualizationProduct = (refKeyString: string) => {
  const [show, setShow] = useState(false);

  const intersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entriesIndex = (entries.length - 1) ?? 0
      setShow(entries[entriesIndex]?.isIntersecting ? true : false);
    },
    []
  );

  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  useLayoutEffect(() => {
    intersectionObserver.current?.disconnect();

    const productRef = RefsManager.getRef<HTMLDivElement>(refKeyString);
    const mainWrapperRef = RefsManager.getRef<HTMLElement>(RefKeys.MAIN_WRAPPER);

    if (!intersectionObserver.current && productRef?.ref && mainWrapperRef?.ref) {
      intersectionObserver.current = new IntersectionObserver(
        intersectionObserverCallback,
        {
          root: mainWrapperRef.ref,
          threshold: 0,
          rootMargin: '150% 0px 150% 0px'
        }
      );
    }

    if (productRef?.ref) {
      intersectionObserver.current?.observe(productRef?.ref);
    }

    return () => {
      intersectionObserver.current?.disconnect();
    };
  }, [refKeyString, intersectionObserverCallback]);

  return show
};

export { useIntersectionVisualizationProduct };
