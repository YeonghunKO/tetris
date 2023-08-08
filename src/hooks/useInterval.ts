import { useEffect, useRef } from "react";

interface IUseInterval {
  callback: () => void;
  delay?: number | null;
}

export const useInterval = ({ callback, delay }: IUseInterval) => {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    /**
     * const tick = savedCallback.current 라고 하면 안되는 이유.
     * 그럼 const tick = () => handle({...}) 라고 그냥 고정이 되어버린다
     * useEffect 실행될때 savedCallback에 있는 값이 저장됨.
     */

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
