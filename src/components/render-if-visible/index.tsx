import React, { useState, useRef, useEffect } from "react";
import { type RenderIfVisibleProps } from "./typings";

const RenderIfVisible = ({
  visibleOffset = 300,
  root = undefined,
  children,
}: RenderIfVisibleProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const intersectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intRef = intersectionRef.current;
    if (intRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          globalThis.requestAnimationFrame(() => {
            setIsVisible(entries[0]?.isIntersecting ?? false);
          });
        },
        { root, rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px` },
      );
      observer.observe(intersectionRef.current);
      return () => {
        if (intRef) {
          observer.unobserve(intRef);
        }
      };
    }
  }, [intersectionRef, root, visibleOffset]);

  return (
    <>
      <div ref={intersectionRef} style={{ position: "absolute" }} />
      {isVisible ? <>{children}</> : null}
    </>
  );
};

export default RenderIfVisible;
