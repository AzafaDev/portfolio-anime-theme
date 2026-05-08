import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import useMobileTap from '../../hooks/useMobileTap';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiGithub,
  SiVercel,
  SiNpm,
  SiGreensock,
  SiFigma,
  SiGo,
} from 'react-icons/si';

const iconMap = {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiGithub,
  SiVercel,
  SiNpm,
  SiGreensock,
  SiFigma,
  SiGo,
};

const getTierClasses = (level) => {
  if (level >= 80) {
    return 'ring-2 ring-stark-red/70 shadow-lg shadow-stark-red/30 bg-stark-red/10';
  }
  if (level >= 60) {
    return 'ring-1 ring-stark-red/40 shadow-md shadow-stark-red/10 bg-stark-red/5';
  }
  return 'ring-1 ring-stark-cream/10 shadow-sm bg-white/5';
};

const getTierLabel = (level) => {
  if (level >= 80) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Familiar';
};

const SkillPill = ({ skill, index }) => {
  const pillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pillRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          delay: index * 0.06,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: pillRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, pillRef);

    return () => ctx.revert();
  }, [index]);

  const tapHandlers = useMobileTap(pillRef, 0.95);

  const handleMouseEnter = () => {
    gsap.to(pillRef.current, {
      scale: 1.1,
      boxShadow: '0 0 15px rgba(211,47,47,0.4)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(pillRef.current, {
      scale: 1,
      boxShadow: '',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const tierClasses = getTierClasses(skill.level);
  const tierLabel = getTierLabel(skill.level);

  return (
    <div
      ref={pillRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...tapHandlers}
      className={`relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-default transition-colors duration-200 ${tierClasses}`}
    >
      {skill.icon && iconMap[skill.icon] && (
        <span className="text-stark-red w-4 h-4 shrink-0">
          {(() => {
            const Icon = iconMap[skill.icon];
            return <Icon />;
          })()}
        </span>
      )}
      <span className="font-body text-stark-cream text-sm font-medium">
        {skill.name}
      </span>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-body text-stark-cream bg-stark-black/90 border border-stark-red/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {tierLabel}
      </span>
    </div>
  );
};

export default SkillPill;
