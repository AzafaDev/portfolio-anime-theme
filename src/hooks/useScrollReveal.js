import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const {
    trigger = null,
    start = 'top 85%',
    direction = 'up',
    duration = 0.8,
    delay = 0,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xValue = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;
    const yValue = direction === 'up' || direction === 'down' ? 60 : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: yValue, x: xValue },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trigger || element,
            start,
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => ctx.revert();
  }, [trigger, start, direction, duration, delay]);

  return ref;
};

export default useScrollReveal;
