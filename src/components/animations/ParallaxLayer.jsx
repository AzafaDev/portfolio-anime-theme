import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = '',
  direction = 'y',
  start = 'top bottom',
  end = 'bottom top',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const prop = direction === 'y' ? 'y' : 'x';
    const move = direction === 'y'
      ? () => ref.current.offsetHeight * (1 - speed) * 0.5
      : () => ref.current.offsetWidth * (1 - speed) * 0.5;

    const anim = gsap.fromTo(
      ref.current,
      { [prop]: -move() },
      {
        [prop]: move(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start,
          end,
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === ref.current?.parentElement) st.kill();
      });
    };
  }, [speed, direction, start, end]);

  return (
    <div ref={ref} className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxLayer;
