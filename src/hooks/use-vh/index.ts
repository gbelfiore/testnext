import { useCallback, useEffect } from "react";
import { useOptionsStore } from "~/state/options";
import { useAppStore } from "~/state/app";

const useVh = () => {
  const isClient = useAppStore((state) => state.isClient);


  const setVh = useOptionsStore((state) => state.setVh);
  const fixVh = useCallback(() => {
    const vh = globalThis.innerHeight * 0.01;
    if (isClient) {
      // browser code
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVh(vh);
  }, [setVh, isClient]);

  useEffect(() => {
    fixVh();
    globalThis.addEventListener("resize", fixVh, { passive: true });
    return () => {
      globalThis.removeEventListener("resize", fixVh);
    };
  }, [fixVh]);
};

export { useVh };
