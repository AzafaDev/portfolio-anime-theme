import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useGSAP = (callback, deps = []) => {
  const ctxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(callback);
    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, deps);

  return ctxRef;
};

export default useGSAP;
