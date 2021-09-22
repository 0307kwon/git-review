import React, { useEffect, useRef } from "react";
import useThrottle from "./useThrottle";

interface Props {
  callback: () => void;
  observedElementDeps?: React.DependencyList | undefined;
  throttleTime?: number;
}

const useIntersectionObserver = ({
  callback,
  observedElementDeps,
  throttleTime = 0,
}: Props) => {
  const observedElementRef = useRef(null);
  const callbackRef = useRef(callback);
  const { registerCallback } = useThrottle({ timeout: throttleTime });

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!observedElementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            registerCallback(callbackRef.current);
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
