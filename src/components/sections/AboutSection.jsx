import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../../hooks/useMediaQuery';
import { siteConfig } from '../../config/portfolio.config';
import SectionTitle from '../ui/SectionTitle';
import starkCharacterImg from '../../assets/images/anime/stark_frieren_character.jpg';

gsap.registerPlugin(ScrollTrigger);

const DEBRIS_COUNT = 7;

const AboutSection = () => {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const photoWrapRef = useRef(null);
  const statsRef = useRef([]);
  const characterRef = useRef(null);
  const debrisContainerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;
    const debrisContainer = debrisContainerRef.current;
    if (!debrisContainer) return;

    const debrisParticles = [];
    for (let i = 0; i < DEBRIS_COUNT; i++) {
      const shard = document.createElement('div');
      const size = Math.random() * 8 + 4;
      const angle = Math.random() * 360;
      const distance = Math.random() * 60 + 20;

      shard.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        background: rgba(245, 230, 211, ${Math.random() * 0.3 + 0.15});
        border: 1px solid rgba(211, 47, 47, ${Math.random() * 0.3 + 0.1});
        transform: translate(-50%, -50%) rotate(45deg);
        border-radius: 1px;
        pointer-events: none;
        z-index: 5;
      `;

      debrisContainer.appendChild(shard);
      debrisParticles.push(shard);

      gsap.to(shard, {
        x: Math.cos(angle * (Math.PI / 180)) * distance,
        y: Math.sin(angle * (Math.PI / 180)) * distance + Math.sin(i) * 10,
        rotation: '+=20',
        opacity: Math.random() * 0.4 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    }

    return () => {
      debrisParticles.forEach((p) => {
        gsap.killTweensOf(p);
        p.remove();
      });
    };
  }, [isMobile]);

  const handlePhotoMouseEnter = () => {
    if (isMobile) return;
    const el = photoRef.current;
    if (!el) return;
    gsap.to(el.querySelector('.warrior-frame'), {
      rotationY: 8,
      scale: 1.03,
      duration: 0.4,
      ease: 'expo.out',
    });
  };

  const handlePhotoMouseLeave = () => {
    if (isMobile) return;
    const el = photoRef.current;
    if (!el) return;
    gsap.to(el.querySelector('.warrior-frame'), {
      rotationY: 0,
      scale: 1,
      duration: 0.4,
      ease: 'expo.out',
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoWrapRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: photoWrapRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      if (!isMobile && photoWrapRef.current) {
        gsap.to(photoWrapRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      siteConfig.stats.forEach((stat, i) => {
        const el = statsRef.current[i];
        if (!el) return;

        const target = { val: 0 };
        gsap.to(target, {
          val: stat.value,
          duration: 2,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            el.textContent = Math.round(target.val) + stat.suffix;
          },
        });
      });

      gsap.fromTo(
        characterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: characterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="about" ref={sectionRef} className="diagonal-section relative py-28 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Tentang Saya"
          subtitle="Kenali lebih dalam sang penulis kode"
          glitch
        />

        {isMobile ? (
          <>
            {/* Mobile: Stacked layout */}
            <div className="flex flex-col items-center">
              <div className="relative flex justify-center w-full" ref={photoWrapRef}>
                <div
                  ref={photoRef}
                  className="relative w-64 h-64 sm:w-72 sm:h-72"
                  style={{ perspective: '800px' }}
                >
                  <div className="absolute -inset-4 border-2 border-stark-red/20 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
                  <div className="absolute -inset-6 border border-stark-cream/5 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

                  <div className="warrior-frame w-full h-full overflow-hidden border-4 border-stark-red/40 shadow-xl shadow-stark-red/10">
                    <img
                      src={siteConfig.personal.photo}
                      alt={siteConfig.personal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-stark-red rounded-full animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full mt-6">
                {siteConfig.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 bg-stark-black/60 border border-stark-red/20 rounded-lg"
                  >
                    <div
                      ref={(el) => (statsRef.current[i] = el)}
                      className="font-warrior text-2xl text-stark-red mb-1"
                    >
                      0
                    </div>
                    <div className="font-body text-stark-gray text-xs uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="font-body text-stark-gray text-base leading-relaxed">
                  {siteConfig.personal.bio}
                </p>
              </div>

              <div ref={characterRef} className="mt-6 w-full rounded-xl overflow-hidden border border-stark-red/20 bg-stark-black/40 backdrop-blur-sm flex items-center max-h-32 group hover:border-stark-red/50 transition-all">
                <div className="w-24 h-full flex-shrink-0 overflow-hidden">
                  <img
                    src={starkCharacterImg}
                    alt="Stark from Frieren"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-quote text-stark-cream/80 text-sm italic">
                    &quot;Inspirasi dari Stark — Frieren&quot;
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Desktop: Broken Grid — photo overlaps text */}
            <div className="hidden md:grid md:grid-cols-12 gap-0 items-start">
              {/* Photo column — spans into text area */}
              <div className="md:col-span-5 relative z-20 md:-mr-16" ref={photoWrapRef}>
                <div
                  ref={photoRef}
                  className="relative flex justify-center w-full"
                  onMouseEnter={handlePhotoMouseEnter}
                  onMouseLeave={handlePhotoMouseLeave}
                  style={{ perspective: '800px' }}
                >
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80">
                    <div className="absolute -inset-4 border-2 border-stark-red/20 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
                    <div className="absolute -inset-8 border border-stark-cream/5 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

                    <div className="warrior-frame w-full h-full overflow-hidden border-4 border-stark-red/40 shadow-xl shadow-stark-red/10">
                      <img
                        src={siteConfig.personal.photo}
                        alt={siteConfig.personal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-stark-red rounded-full animate-pulse" />
                  </div>

                  {/* Crystal debris container */}
                  <div ref={debrisContainerRef} className="absolute inset-0 pointer-events-none" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 w-full mt-8">
                  {siteConfig.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 bg-stark-black/60 border border-stark-red/20 rounded-lg"
                    >
                      <div
                        ref={(el) => (statsRef.current[i] = el)}
                        className="font-warrior text-2xl sm:text-3xl text-stark-red mb-1"
                      >
                        0
                      </div>
                      <div className="font-body text-stark-gray text-xs uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text column — overlapped by photo */}
              <div className="md:col-span-7 md:pl-20 relative z-10">
                <div className="bg-stark-black/70 backdrop-blur-md rounded-xl p-6 border border-stark-red/10">
                  <p className="font-body text-stark-gray text-base leading-relaxed">
                    {siteConfig.personal.bio}
                  </p>
                </div>

                <div ref={characterRef} className="mt-6 rounded-xl overflow-hidden border border-stark-red/20 bg-stark-black/40 backdrop-blur-sm flex items-center max-h-32 group hover:border-stark-red/50 transition-all">
                  <div className="w-24 h-full flex-shrink-0 overflow-hidden">
                    <img
                      src={starkCharacterImg}
                      alt="Stark from Frieren"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-quote text-stark-cream/80 text-sm italic">
                      &quot;Inspirasi dari Stark — Frieren&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
