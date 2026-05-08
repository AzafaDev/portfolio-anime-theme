import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '../../hooks/useMediaQuery';

const ParticleEffect = () => {
  const containerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const particleCount = isMobile ? 15 : 30;
    const ctx = gsap.context(() => {});
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const shapeRoll = Math.random();
      const isCircle = shapeRoll < 0.33;
      const isStar = shapeRoll >= 0.33 && shapeRoll < 0.66;

      let background;
      let borderRadius;
      let clipPath;

      if (isCircle) {
        background = 'rgba(245, 230, 211, 0.15)';
        borderRadius = '50%';
        clipPath = 'none';
      } else if (isStar) {
        background = 'rgba(211, 47, 47, 0.3)';
        borderRadius = '20%';
        clipPath = 'none';
      } else {
        background = 'rgba(139, 92, 246, 0.2)';
        borderRadius = '0';
        clipPath =
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      }

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -${size}px;
        background: ${background};
        border-radius: ${borderRadius};
        clip-path: ${clipPath};
        will-change: transform;
        pointer-events: none;
      `;

      container.appendChild(particle);
      particles.push(particle);

      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 6;
      const xMovement = (Math.random() - 0.5) * 60;

      gsap.to(particle, {
        y: -window.innerHeight - 20,
        x: `+=${xMovement}`,
        opacity: 0,
        duration,
        delay,
        repeat: -1,
        ease: 'none',
        onRepeat: () => {
          gsap.set(particle, {
            y: 10,
            x: Math.random() * window.innerWidth,
            opacity: Math.random() * 0.4 + 0.1,
          });
        },
      });
    }

    return () => {
      particles.forEach((p) => {
        gsap.killTweensOf(p);
        p.remove();
      });
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
};

export default ParticleEffect;
