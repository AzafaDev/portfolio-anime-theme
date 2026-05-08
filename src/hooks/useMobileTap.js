import { useCallback } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from './useMediaQuery';

const useMobileTap = (ref, scale = 0.96) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onTouchStart = useCallback(() => {
    if (!isMobile || !ref.current) return;
    gsap.to(ref.current, { scale, duration: 0.1, ease: 'power2.out' });
  }, [isMobile, ref, scale]);

  const onTouchEnd = useCallback(() => {
    if (!isMobile || !ref.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
  }, [isMobile, ref]);

  return { onTouchStart, onTouchEnd };
};

export default useMobileTap;
