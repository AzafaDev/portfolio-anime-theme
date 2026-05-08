import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '../../hooks/useMediaQuery';

const DynamicLighting = () => {
  const lightingRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleMouseMove = useCallback(
    (e) => {
      if (!lightingRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      gsap.to(lightingRef.current, {
        '--lx': `${x}%`,
        '--ly': `${y}%`,
        duration: 1.8,
        ease: 'power2.out',
      });
    },
    [],
  );

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={lightingRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{
        '--lx': '50%',
        '--ly': '50%',
        background:
          'radial-gradient(800px circle at var(--lx) var(--ly), rgba(211, 47, 47, 0.06), transparent 50%)',
      }}
    />
  );
};

export default DynamicLighting;
