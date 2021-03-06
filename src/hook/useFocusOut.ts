import React, { useEffect, useRef, useState } from "react";
import { genNewId } from "../util/common";

interface RegisteredCallbackInfo {
  id: number;
  callback: () => void;
  targetElementRef: React.RefObject<any>;
}

const idGenerator = genNewId();

let registeredCallbackInfos: RegisteredCallbackInfo[] = [];

document.addEventListener("mousedown", (event) => {
  registeredCallbackInfos.forEach((callbackInfo) => {
    if (!callbackInfo.targetElementRef.current) return;

    if (
      !callbackInfo.targetElementRef.current?.contains(event.target as Node)
    ) {
      callbackInfo.callback();
    }
  });
});

const useFocusOut = <T>(callback: () => void) => {
  const [id, _] = useState(idGenerator.next().value);
  const targetElementRef = useRef<T>(null);

  useEffect(() => {
    registeredCallbackInfos.push({
      id,
      callback: callback,
      targetElementRef,
    });

    return () => {
      registeredCallbackInfos = registeredCallbackInfos.filter(
        (callbackInfo) => callbackInfo.id !== id
      );
    };
  }, []);

  return targetElementRef;
};

export default useFocusOut;
