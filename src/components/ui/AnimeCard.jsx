import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useMobileTap from '../../hooks/useMobileTap';

const AnimeCard = ({ anime, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, rotateY: 5 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const tapHandlers = useMobileTap(cardRef, 0.95);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current.querySelector('.anime-img'), {
      scale: 1.1,
      duration: 0.5,
      ease: 'expo.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current.querySelector('.anime-img'), {
      scale: 1,
      duration: 0.5,
      ease: 'expo.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...tapHandlers}
      className="group relative h-72 rounded-lg overflow-hidden cursor-pointer glass backdrop-blur-md shadow-xl"
    >
      {/* Background Image */}
      <img
        src={anime.image}
        alt={anime.title}
        className="anime-img absolute inset-0 w-full h-full object-cover transition-transform duration-500"
      />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-stark-black via-stark-black/50 to-transparent opacity-80 md:group-hover:opacity-70 transition-opacity" />
      <div className="absolute inset-0 bg-stark-red/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-2 py-0.5 text-xs font-body text-stark-cream bg-stark-red/80 rounded mb-2">
          {anime.character}
        </span>
        <h4 className="font-warrior text-lg text-stark-cream mb-1">
          {anime.title}
        </h4>
        <p className="font-quote text-stark-cream/70 italic text-sm opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
          &ldquo;{anime.quote}&rdquo;
        </p>
      </div>
    </div>
  );
};

export default AnimeCard;
