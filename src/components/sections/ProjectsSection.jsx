import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../../hooks/useMediaQuery';
import { siteConfig } from '../../config/portfolio.config';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import StatMicroCard from '../ui/StatMicroCard';

gsap.registerPlugin(ScrollTrigger);

const getGridSpan = (index, total) => {
  if (total === 1) return '';
  if (index === 0) return 'md:col-span-2 md:row-span-2';
  if (index === 1 || index === 2) return 'md:col-span-2';
  if (index === 3 || index === 4) return 'md:col-span-1';
  return 'md:col-span-2 md:row-span-1';
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.bento-grid'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const projects = siteConfig.projects;
  const stats = siteConfig.stats;

  const renderMobile = () => (
    <div className="grid sm:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );

  const renderBentoGrid = () => {
    const cards = [];
    let projectIdx = 0;
    let statIdx = 0;

    // Interleave projects and micro-stat cards in bento pattern
    // Pattern: Featured(2x2), stat, project(col-2), project(col-2), stat, project(col-1), project(col-1), project(col-2), stat

    const layout = [
      { type: 'project', projectIdx: 0 },
      { type: 'project', projectIdx: 1 },
      { type: 'stat', statIdx: 0 },
      { type: 'project', projectIdx: 2 },
      { type: 'project', projectIdx: 3 },
      { type: 'stat', statIdx: 1 },
      { type: 'project', projectIdx: 4 },
      { type: 'project', projectIdx: 5 },
      { type: 'stat', statIdx: 2 },
    ];

    layout.forEach((item) => {
      if (item.type === 'project' && item.projectIdx < projects.length) {
        const p = projects[item.projectIdx];
        const span = getGridSpan(item.projectIdx, projects.length);
        cards.push(
          <div key={`proj-${p.id}`} className={span}>
            <ProjectCard
              project={p}
              index={item.projectIdx}
              featured={item.projectIdx === 0}
            />
          </div>,
        );
        projectIdx++;
      } else if (item.type === 'stat' && item.statIdx < stats.length) {
        const s = stats[item.statIdx];
        cards.push(
          <div key={`stat-${s.label}`} className={statIdx === 0 ? 'md:col-span-1' : 'md:col-span-1'}>
            <StatMicroCard stat={s} index={statIdx} />
          </div>,
        );
        statIdx++;
      }
    });

    // Add remaining projects not in layout
    while (projectIdx < projects.length) {
      const p = projects[projectIdx];
      cards.push(
        <div key={`proj-${p.id}`} className="md:col-span-1">
          <ProjectCard project={p} index={projectIdx} featured={false} />
        </div>,
      );
      projectIdx++;
    }

    return cards;
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Proyek & Misi"
          subtitle="Setiap misi diselesaikan dengan kode yang tajam"
          glitch
        />

        {isMobile ? (
          renderMobile()
        ) : (
          <div className="bento-grid grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">
            {renderBentoGrid()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
