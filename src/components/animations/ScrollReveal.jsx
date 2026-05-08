import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '../../hooks/useMediaQuery';

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.7, blur = false }) => {
  const ref = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const xValue = direction === 'left' ? -20 : direction === 'right' ? 20 : 0;
      const yValue = direction === 'up' || direction === 'down' ? 20 : 0;

      const startVals = { opacity: 0, y: yValue, x: xValue };
      const endVals = {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      };

      if (blur) {
        startVals.filter = 'blur(8px)';
        endVals.filter = 'blur(0px)';
      }

      gsap.fromTo(ref.current, startVals, endVals);
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, duration, blur, isMobile]);

  return <div ref={ref}>{children}</div>;
};

export default ScrollReveal;
