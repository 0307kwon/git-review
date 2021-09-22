import { useEffect, useRef, useState } from "react";

interface Props {
  timeout: number;
}

const useThrottle = ({ timeout }: Props) => {
  const canExecute = useRef(true);
  const setTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const registerCallback = (callback: () => void) => {
    if (canExecute.current) {
      callback();
      canExecute.current = false;
    }

    if (!setTimeoutId.current) {
      setTimeoutId.current = setTimeout(() => {
        canExecute.current = true;
        setTimeoutId.current = null;
      }, timeout);
    }
  };

  useEffect(() => {
    return () => {
      if (setTimeoutId.current) {
        clearTimeout(setTimeoutId.current);
      }
    };
  }, []);

  return {
    registerCallback,
  };
};

export default useThrottle;
