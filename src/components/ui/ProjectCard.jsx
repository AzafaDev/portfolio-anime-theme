import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSound from '../../hooks/useSound';
import useMobileTap from '../../hooks/useMobileTap';

const ProjectCard = ({ project, index, featured = false }) => {
  const cardRef = useRef(null);
  const slashRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const playHover = useSound('/sounds/hover.mp3');
  const tapHandlers = useMobileTap(cardRef, 0.97);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.08,
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

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'expo.out',
      });
    },
    [isMobile],
  );

  const handleMouseEnter = () => {
    if (isMobile) return;
    playHover(0.3);

      gsap.to(cardRef.current, {
        y: -8,
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(211, 47, 47, 0.3)',
        duration: 0.3,
        ease: 'expo.out',
      });
    };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'expo.out',
    });
  };

  const handleClick = () => {
    if (!slashRef.current || !cardRef.current) return;

    const audio = new Audio('/sounds/slash.mp3');
    audio.volume = 0.7;
    audio.play().catch(() => {});

    gsap.fromTo(
      slashRef.current,
      { scaleX: 0, rotate: -25, opacity: 1, y: '-50%' },
      {
        scaleX: 1.2,
        rotate: -25,
        y: '-50%',
        duration: 0.12,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(slashRef.current, {
            scaleX: 1,
            rotate: -25,
            y: '-50%',
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          });
        },
      },
    );

    const flash = document.createElement('div');
    flash.className = 'absolute inset-0 bg-white pointer-events-none z-10';
    flash.style.opacity = '0.7';
    cardRef.current.appendChild(flash);

    gsap.to(flash, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => flash.remove(),
    });

    gsap.to(cardRef.current, {
      x: 3,
      duration: 0.04,
      repeat: 5,
      yoyo: true,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(cardRef.current, { x: 0 });
        if (project.slug) {
          setTimeout(() => {
            navigate(`/projects/${project.slug}`);
          }, 200);
        } else if (project.link && project.link !== '#') {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        }
      },
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...tapHandlers}
      onClick={handleClick}
      className="group relative bg-stark-black/60 border border-stark-red/20 rounded-lg overflow-hidden cursor-pointer backdrop-blur-md h-full"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {featured && (
        <div className="absolute top-3 left-3 z-30 px-2.5 py-0.5 bg-stark-red/90 text-stark-black font-body text-xs font-bold uppercase tracking-wider rounded">
          Featured
        </div>
      )}
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 sm:h-72' : 'h-48'}`}>
        <img
          src={project.image || project.images?.[0] || ''}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
        />

        {/* Slash effect — diagonal line that streaks across on click */}
        <div
          ref={slashRef}
          className="absolute top-1/2 left-0 w-[200%] h-px opacity-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(211,47,47,0.8) 40%, #FF5252 50%, rgba(211,47,47,0.8) 60%, transparent 100%)',
            boxShadow: '0 0 12px rgba(211,47,47,0.6), 0 0 24px rgba(211,47,47,0.3)',
          }}
        />

        <div className="absolute inset-0 bg-stark-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none">
          <p className="font-body text-stark-cream/90 text-xs sm:text-sm text-center line-clamp-4">
            {project.shortDesc || project.description}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stark-black via-stark-black/40 to-transparent opacity-100 md:opacity-60 md:group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-warrior text-stark-red mb-2 md:group-hover:text-stark-cream transition-colors ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {project.title}
        </h3>
        <p className={`font-body text-stark-gray text-sm mb-3 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {project.shortDesc || project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-body text-stark-cream/80 bg-stark-red/10 border border-stark-red/30 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <span className="inline-flex items-center gap-1 text-sm font-body text-stark-cream/60 group-hover:text-stark-red transition-colors">
          View Project
          <span className="text-stark-red">&#8594;</span>
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
