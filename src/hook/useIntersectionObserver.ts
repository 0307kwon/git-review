import React, { useEffect, useRef } from "react";

interface Props {
  callback: () => void;
  observedElementDeps?: React.DependencyList | undefined;
}

const useIntersectionObserver = ({ callback, observedElementDeps }: Props) => {
  const observedElementRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!observedElementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbackRef.current();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe((observedElementRef.current as unknown) as Element);
  }, observedElementDeps);

  return {
    observedElementRef,
  };
};

export default useIntersectionObserver;
