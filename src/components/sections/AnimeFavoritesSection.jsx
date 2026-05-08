import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '../../config/portfolio.config';
import SectionTitle from '../ui/SectionTitle';
import AnimeCard from '../ui/AnimeCard';

const AnimeFavoritesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.anime-bg', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="anime" ref={sectionRef} className="relative py-28 md:py-32 px-4 overflow-hidden">
      <div
        className="anime-bg absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/images/anime/stark_frieren_wallpaper.jpg')", backgroundPositionY: '0%' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title="Anime & Kutipan"
          subtitle="Sumber inspirasi di sela-sela perjuangan kode"
          glitch
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.animeFavorites.map((anime, index) => (
            <AnimeCard key={anime.title} anime={anime} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeFavoritesSection;
