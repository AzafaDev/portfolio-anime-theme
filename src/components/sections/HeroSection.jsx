import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../config/portfolio.config';
import AnimatedButton from '../ui/AnimatedButton';
import ParallaxLayer from '../animations/ParallaxLayer';
import useMediaQuery from '../../hooks/useMediaQuery';
import starkVideo from '../../assets/videos/output.mp4';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const tagRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
      )
        .to(
          nameRef.current,
          {
            textShadow:
              '0 0 40px rgba(211,47,47,0.9), 0 0 80px rgba(211,47,47,0.5), 0 0 140px rgba(211,47,47,0.2)',
            duration: 0.2,
            ease: 'power2.in',
          },
          '-=0.3',
        )
        .to(
          nameRef.current,
          {
            textShadow: '0 0 8px rgba(211,47,47,0.3)',
            duration: 2.8,
            ease: 'power2.out',
          },
          '+=0',
        )
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=2.4',
        )
        .fromTo(
          btnRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          '-=0.2',
        );

      gsap.to('.hero-decor', {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - 80;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/images/stark-hero.png"
          className="absolute w-full"
          style={{
            top: 0,
            height: 'calc(100% + 75px)',
            objectFit: 'cover',
          }}
        >
          <source src={isMobile ? '/videos/output-mobile.mp4' : starkVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-stark-black/60" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-stark-black/80 via-stark-black/40 to-stark-red-dark/20 z-[1]" />

      <div className="hero-decor absolute top-1/4 left-10 w-32 h-32 border border-stark-red/10 rounded-full animate-float" />
      <div className="hero-decor absolute bottom-1/4 right-10 w-24 h-24 border border-stark-cream/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="hero-decor absolute top-1/3 right-1/3 w-4 h-4 bg-stark-red/20 rounded-full animate-pulse" />
      <div className="hero-decor absolute bottom-1/3 left-1/4 w-3 h-3 bg-stark-cream/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

      <ParallaxLayer speed={0.2} className="top-[15%] right-[5%] w-40 h-40 opacity-[0.04]">
        <svg viewBox="0 0 100 500" className="w-full h-full fill-stark-red">
          <rect x="43" y="0" width="14" height="350" rx="2" />
          <rect x="43" y="345" width="14" height="8" rx="1" />
          <rect x="40" y="340" width="20" height="6" rx="1" />
          <rect x="35" y="310" width="30" height="30" rx="15" />
        </svg>
      </ParallaxLayer>

      <ParallaxLayer speed={0.15} className="bottom-[10%] left-[3%] w-32 h-32 opacity-[0.04]" direction="x">
        <svg viewBox="0 0 100 500" className="w-full h-full fill-stark-cream">
          <rect x="43" y="0" width="14" height="350" rx="2" />
          <rect x="43" y="345" width="14" height="8" rx="1" />
          <rect x="40" y="340" width="20" height="6" rx="1" />
          <rect x="35" y="310" width="30" height="30" rx="15" />
        </svg>
      </ParallaxLayer>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div ref={titleRef}>
          <h1
            ref={nameRef}
            className="font-warrior text-5xl sm:text-6xl lg:text-8xl text-stark-cream tracking-wider mb-4"
          >
            {siteConfig.personal.name}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-stark-red/60" />
            <span className="font-body text-stark-red text-lg sm:text-xl tracking-[0.3em] uppercase">
              {siteConfig.personal.title}
            </span>
            <span className="h-px w-12 bg-stark-red/60" />
          </div>
        </div>

        <p
          ref={tagRef}
          className="font-quote text-stark-gray text-xl sm:text-2xl italic mb-10"
        >
          {siteConfig.personal.tagline}
        </p>

        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedButton
            text="Lihat Proyek"
            variant="primary"
            magnetic
            onClick={() => scrollTo('projects')}
          />
          <AnimatedButton
            text="Hubungi Saya"
            variant="secondary"
            magnetic
            onClick={() => scrollTo('contact')}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-body text-stark-gray text-xs uppercase tracking-widest">
            Scroll
          </span>
          <span className="w-4 h-4 border-r-2 border-b-2 border-stark-red rotate-45" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
