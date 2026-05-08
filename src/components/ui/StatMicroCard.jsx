import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const StatMicroCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      const target = { val: 0 };
      gsap.to(target, {
        val: stat.value,
        duration: 1.5,
        delay: index * 0.15 + 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = Math.round(target.val) + stat.suffix;
          }
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index, stat]);

  return (
    <div
      ref={cardRef}
      className="relative h-full min-h-[120px] bg-stark-black/60 border border-stark-red/20 rounded-lg p-5 flex flex-col items-center justify-center text-center backdrop-blur-md blur-none-mobile overflow-hidden group hover:border-stark-red/50 transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stark-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        ref={numRef}
        className="font-warrior text-3xl sm:text-4xl text-stark-red mb-1 relative z-10"
      >
        0
      </div>
      <div className="font-body text-stark-gray text-xs uppercase tracking-wider relative z-10">
        {stat.label}
      </div>
    </div>
  );
};

export default StatMicroCard;
