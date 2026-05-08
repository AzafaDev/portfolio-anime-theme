import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fade-in');

  const containerRef = useRef(null);
  const topBladeRef = useRef(null);
  const bottomBladeRef = useRef(null);
  const slashLineRef = useRef(null);
  const contentRef = useRef(null);
  const audioRef = useRef(new Audio('/sounds/page_transation.mp3'));

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      playTransition();
    }
  }, [location, displayLocation]);

  const playTransition = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTransitionStage('fade-in');
      },
    });

    setTransitionStage('transitioning');

    tl.set([topBladeRef.current, bottomBladeRef.current], { visibility: 'visible' })
      .set(slashLineRef.current, { scaleX: 0, opacity: 0 })

      .to(topBladeRef.current, {
        x: '0%',
        y: '0%',
        duration: 0.3,
        ease: 'expo.in',
      })
      .to(
        bottomBladeRef.current,
        {
          x: '0%',
          y: '0%',
          duration: 0.3,
          ease: 'expo.in',
        },
        '<',
      )

      .add(() => {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
        setDisplayLocation(location);
        if (!location.hash) {
          window.scrollTo(0, 0);
        }
      })
      .to(slashLineRef.current, {
        scaleX: 1.5,
        opacity: 1,
        duration: 0.1,
        ease: 'power4.out',
      })

      .to(slashLineRef.current, {
        opacity: 0,
        duration: 0.2,
      })
      .to(
        topBladeRef.current,
        {
          x: '-105%',
          y: '-105%',
          duration: 0.5,
          ease: 'expo.out',
        },
        '-=0.1',
      )
      .to(
        bottomBladeRef.current,
        {
          x: '105%',
          y: '105%',
          duration: 0.5,
          ease: 'expo.out',
        },
        '<',
      )

      .fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        '-=0.4',
      )
      .set([topBladeRef.current, bottomBladeRef.current], { visibility: 'hidden' });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Top‑Left Blade */}
      <div
        ref={topBladeRef}
        className="fixed inset-0 z-[160] bg-stark-black invisible pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          transform: 'translate(-105%, -105%)',
          borderBottom: '1px solid rgba(211, 47, 47, 0.5)',
        }}
      />

      {/* Bottom‑Right Blade */}
      <div
        ref={bottomBladeRef}
        className="fixed inset-0 z-[160] bg-stark-black invisible pointer-events-none"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          transform: 'translate(105%, 105%)',
          borderTop: '1px solid rgba(211, 47, 47, 0.5)',
        }}
      />

      {/* Diagonal Slash Glow */}
      <div
        ref={slashLineRef}
        className="fixed top-1/2 left-1/2 w-[150vw] h-[3px] z-[161] opacity-0 pointer-events-none origin-center"
        style={{
          background:
            'linear-gradient(90deg, transparent, #FF5252, #D32F2F, #FF5252, transparent)',
          boxShadow: '0 0 20px rgba(211, 47, 47, 0.8)',
          transform: 'translate(-50%, -50%) rotate(-45deg) scaleX(0)',
        }}
      />

      {/* Rendered Page */}
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default PageTransition;
