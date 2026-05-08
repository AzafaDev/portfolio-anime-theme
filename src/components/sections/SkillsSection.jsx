import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../config/portfolio.config';
import SectionTitle from '../ui/SectionTitle';
import SkillPill from '../ui/SkillPill';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          const delay = siteConfig.skills.length * 0.06 + 0.55;
          gsap.to(sectionRef.current, {
            x: 4,
            duration: 0.06,
            repeat: 5,
            yoyo: true,
            ease: 'power2.inOut',
            delay,
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="diagonal-section relative py-28 md:py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle
          title="Persenjataan"
          subtitle="Teknologi andalan di medan pertempuran kode"
          glitch
        />

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {siteConfig.skills.map((skill, index) => {
            const isHighTier = skill.level >= 80;
            return (
              <div
                key={skill.name}
                className={isHighTier ? 'col-span-2' : ''}
              >
                <SkillPill skill={skill} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
