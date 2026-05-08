import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '../../hooks/useMediaQuery';

const TRAIL_COUNT = 4;

const CursorChibi = () => {
  const chibiRef = useRef(null);
  const trailRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);

    const animateMain = () => {
      if (!chibiRef.current) return;

      gsap.to(chibiRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const animateTrails = () => {
      trailRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const delay = (i + 1) * 0.08;
        gsap.to(ref, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          duration: 0.6 + delay,
          ease: 'power3.out',
        });
      });
    };

    let raf;
    const loop = () => {
      animateMain();
      animateTrails();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [handleMouseMove, isMobile]);

  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-4 z-50 w-14 h-14 animate-float pointer-events-none">
        <div className="w-full h-full bg-stark-red/20 rounded-full border-2 border-stark-red/40 flex items-center justify-center">
          <img src="/images/chibi-stark.png" alt="Stark chibi" className="w-3/4 h-3/4 object-contain" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full"
          style={{
            width: `${10 - i * 2}px`,
            height: `${10 - i * 2}px`,
            background: `rgba(211, 47, 47, ${0.35 - i * 0.08})`,
            boxShadow: `0 0 ${6 - i}px rgba(211, 47, 47, ${0.3 - i * 0.06})`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main chibi cursor */}
      <div
        ref={chibiRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-12 h-12 bg-stark-red/15 backdrop-blur-md rounded-full border-2 border-stark-red/30 flex items-center justify-center shadow-lg shadow-stark-red/10">
          <img src="/images/chibi-stark.png" alt="Stark chibi" className="w-5/6 h-5/6 object-contain" />
        </div>
      </div>
    </>
  );
};

export default CursorChibi;
