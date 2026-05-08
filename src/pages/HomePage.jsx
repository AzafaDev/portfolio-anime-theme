import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import AnimeFavoritesSection from '../components/sections/AnimeFavoritesSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - 80;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <AnimeFavoritesSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
