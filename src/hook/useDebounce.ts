import { useRef } from "react";

interface Props {
  waitingTimeMs: number;
}

const useDebounce = ({ waitingTimeMs }: Props) => {
  const ref = useRef<null | NodeJS.Timeout>(null);

  const debounce = (callback: () => void) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      callback();
    }, waitingTimeMs);
  };

  return {
    debounce,
  };
};

export default useDebounce;
