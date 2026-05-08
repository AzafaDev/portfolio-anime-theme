import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '../../config/portfolio.config';
import SectionTitle from '../ui/SectionTitle';

const ExperienceSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power4.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      const items = gsap.utils.toArray('.exp-item');
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="Riwayat Pertempuran"
          subtitle="Perjalanan sang prajurit kode"
        />

        <div ref={containerRef} className="relative ml-2">
          <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-stark-red/20 origin-top" />
          {siteConfig.experience.map((item) => (
            <div
              key={item.id}
              className="exp-item relative pl-10 pb-12 last:pb-0 group"
            >
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-stark-red border-2 border-stark-black shadow-[0_0_8px_rgba(220,38,38,0.5)]" />

              <span className="text-stark-red text-[10px] uppercase tracking-[0.2em] font-body">
                {item.period}
              </span>

              <div className="mb-0.5">
                <span className="text-stark-red/60 text-xs font-body italic">
                  {item.label}
                </span>
              </div>

              <h4 className="font-warrior text-xl text-stark-cream mb-1.5">
                {item.title}
              </h4>

              <p className="text-stark-gray text-sm leading-relaxed mb-3 max-w-xl">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 border border-stark-red/20 rounded bg-stark-black/50 text-stark-cream/70 group-hover:border-stark-red/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
