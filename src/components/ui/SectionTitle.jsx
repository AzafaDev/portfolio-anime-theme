import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SectionTitle = ({ title, subtitle, glitch }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30, scale: 0.96, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!glitch || !isHovered) return;
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.to(el, { x: -2, duration: 0.05 })
      .to(el, { x: 2, duration: 0.05 })
      .to(el, { x: -1, duration: 0.03 })
      .to(el, { x: 1, duration: 0.03 })
      .to(el, { x: 0, duration: 0.05 });
  }, [glitch, isHovered]);

  return (
    <div
      ref={ref}
      className="text-center mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="font-warrior text-3xl sm:text-4xl lg:text-5xl text-stark-cream mb-4 relative inline-block">
        <span className="text-stark-red">&#123;</span> {title}{' '}
        <span className="text-stark-red">&#125;</span>
        {glitch && isHovered && (
          <>
            <span
              className="absolute inset-0 text-stark-red opacity-50 pointer-events-none animate-glitch-shift"
              aria-hidden="true"
            >
              <span className="text-stark-red">&#123;</span> {title}{' '}
              <span className="text-stark-red">&#125;</span>
            </span>
            <span
              className="absolute inset-0 text-stark-cream/30 pointer-events-none animate-glitch-shift-reverse"
              aria-hidden="true"
            >
              <span className="text-stark-red">&#123;</span> {title}{' '}
              <span className="text-stark-red">&#125;</span>
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="font-body text-stark-gray text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-stark-red mx-auto mt-4 rounded-full" />
    </div>
  );
};

export default SectionTitle;
