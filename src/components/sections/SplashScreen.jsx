import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ParticleEffect from '../animations/ParticleEffect';

const SplashScreen = ({ onFinish }) => {
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const slashLineRef = useRef(null);
  const audioRef = useRef(null);
  const clickTextRef = useRef(null);

  // ── Fase 1: Animasi denyut sebelum klik ──
  useEffect(() => {
    if (started) return;
    
    const pulseTl = gsap.timeline({ repeat: -1, yoyo: true });
    pulseTl.to(logoRef.current, {
      scale: 1.08,
      duration: 1.2,
      ease: 'sine.inOut',
    });
    
    // Animasi teks "Klik untuk Memulai" berkedip
    gsap.to(clickTextRef.current, {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      pulseTl.kill();
      gsap.killTweensOf(clickTextRef.current);
    };
  }, [started]);

  // ── Fase 2: Animasi slash setelah klik ──
  useEffect(() => {
    if (!started) return;

    const subtitleText = 'Prepare for battle';
    subtitleRef.current.textContent = '';

    const playSlashReveal = () => {
      // ✅ Audio sekarang bisa diputar karena ada interaksi user
      if (audioRef.current) {
        audioRef.current.volume = 0.8;
        audioRef.current.play().catch(() => {});
      }

      const slashTl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            onComplete: onFinish,
          });
        },
      });

      slashTl
        .set(slashLineRef.current, { scaleX: 0, opacity: 1 })
        .to(slashLineRef.current, {
          scaleX: 1,
          duration: 0.15,
          ease: 'power4.in',
        })
        .to(slashLineRef.current, {
          opacity: 0,
          duration: 0.12,
          ease: 'power2.out',
        })
        .to(
          topHalfRef.current,
          {
            x: '-110%',
            y: '-40%',
            duration: 0.9,
            ease: 'power3.in',
          },
          '-=0.05',
        )
        .to(
          bottomHalfRef.current,
          {
            x: '110%',
            y: '40%',
            duration: 0.9,
            ease: 'power3.in',
          },
          '<',
        )
        .to(
          containerRef.current,
          {
            x: 0,
            duration: 0.05,
            ease: 'power2.out',
          },
          '-=0.1',
        );
    };

    // ── Timeline fase 2 ──
    const tl = gsap.timeline({
      onComplete: playSlashReveal,
    });

    tl.fromTo(
      logoRef.current,
      { scale: 2, opacity: 0, rotation: -30 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
    )
      .fromTo(
        '.splash-line-inner',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
        '-=0.4',
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power4.out' },
        '-=0.2',
      );

    const typeObj = { chars: 0 };
    tl.to(
      typeObj,
      {
        chars: subtitleText.length,
        duration: 1.2,
        ease: 'none',
        onUpdate: () => {
          if (subtitleRef.current) {
            subtitleRef.current.textContent = subtitleText.slice(0, Math.round(typeObj.chars));
          }
        },
        onComplete: () => {
          gsap.to(subtitleRef.current, {
            textShadow: '0 0 12px rgba(211,47,47,0.6)',
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          });
        },
      },
    );

    return () => {
      tl.kill();
    };
  }, [started, onFinish]);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-stark-black"
    >
      <ParticleEffect />

      {/* Diagonal slash line */}
      <div
        ref={slashLineRef}
        className="absolute top-1/2 left-1/2 w-[200vw] h-[2px] opacity-0 pointer-events-none z-30"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #D32F2F 25%, #FF5252 50%, #D32F2F 75%, transparent 100%)',
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          boxShadow:
            '0 0 30px rgba(211,47,47,0.9), 0 0 60px rgba(211,47,47,0.5), 0 0 100px rgba(211,47,47,0.3)',
        }}
      />

      {/* Top half (upper-left triangle) */}
      <div
        ref={topHalfRef}
        className="absolute inset-0 bg-stark-black z-[15] pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />

      {/* Bottom half (lower-right triangle) */}
      <div
        ref={bottomHalfRef}
        className="absolute inset-0 bg-stark-black z-[15] pointer-events-none"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      {/* ── UI Content ── */}
      <div
        className={`relative z-20 flex flex-col items-center gap-6 ${
          !started ? 'cursor-pointer select-none' : ''
        }`}
        onClick={!started ? handleStart : undefined}
      >
        <h1
          ref={logoRef}
          className="font-warrior text-4xl sm:text-5xl text-stark-red tracking-widest"
        >
          ⚔ AZAFA
        </h1>

        <div className="w-48 sm:w-64 h-0.5 bg-stark-red/30 overflow-hidden">
          <div className="splash-line-inner w-full h-full bg-stark-red" />
        </div>

        {!started ? (
          <p
            ref={clickTextRef}
            className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-stark-gray/70"
          >
            Klik untuk Memulai
          </p>
        ) : (
          <p
            ref={subtitleRef}
            className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-stark-gray/70"
          >
            Prepare for battle
          </p>
        )}
      </div>

      {/* Audio element */}
      <audio ref={audioRef} preload="auto" style={{ display: 'none' }}>
        <source src="/sounds/slash.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default SplashScreen;