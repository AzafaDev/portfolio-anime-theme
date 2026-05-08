import { useCallback } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from './useMediaQuery';

const useMobileTap = (ref, scale = 0.96, options = {}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { onTouchStartExtra, onTouchEndExtra } = options;

  const onTouchStart = useCallback(() => {
    if (!isMobile || !ref.current) return;
    gsap.to(ref.current, { scale, duration: 0.1, ease: 'power2.out' });
    if (onTouchStartExtra) onTouchStartExtra();
  }, [isMobile, ref, scale, onTouchStartExtra]);

  const onTouchEnd = useCallback(() => {
    if (!isMobile || !ref.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
    if (onTouchEndExtra) onTouchEndExtra();
  }, [isMobile, ref, onTouchEndExtra]);

  return { onTouchStart, onTouchEnd };
};

export default useMobileTap;
