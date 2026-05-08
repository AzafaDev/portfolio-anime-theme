import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useMusic } from '../../contexts/MusicContext';
import { FiHome, FiUser, FiFolder, FiZap, FiPlay, FiMail } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', href: '#home', icon: FiHome },
  { label: 'About', href: '#about', icon: FiUser },
  { label: 'Projects', href: '#projects', icon: FiFolder },
  { label: 'Skills', href: '#skills', icon: FiZap },
  { label: 'Anime', href: '#anime', icon: FiPlay },
  { label: 'Contact', href: '#contact', icon: FiMail },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const sidebarRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const { isPlaying, toggle: toggleMusic } = useMusic();

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobile) return;
    gsap.fromTo(
      sidebarRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 },
    );
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      gsap.fromTo(
        'nav.mobile-nav',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      );
    }
  }, [isMobile]);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0.1 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  /* ───────── Desktop: Vertical Sidebar ───────── */
  if (!isMobile) {
    return (
      <nav
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-16 z-50 flex flex-col items-center py-6 pointer-events-none"
      >
        {/* Progress bar track */}
        <div className="absolute right-0 top-0 w-[2px] h-full bg-stark-red/10 pointer-events-none" />
        {/* Progress bar fill */}
        <div
          className="absolute right-0 top-0 w-[2px] bg-stark-red pointer-events-none transition-[height] duration-150"
          style={{
            height: `${progress}%`,
            boxShadow: '0 0 8px rgba(211,47,47,0.6)',
          }}
        />

        {/* Logo at top */}
        <Link
          to="/#home"
          className="pointer-events-auto font-warrior text-sm text-stark-red tracking-widest hover:text-stark-cream transition-colors mb-8 writing-vertical"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
        >
          AZAFA
        </Link>

        {/* Nav icons */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId && location.pathname === '/';
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={`/${link.href}`}
                className="pointer-events-auto relative group flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 slash-underline"
                aria-label={link.label}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? 'text-stark-red drop-shadow-[0_0_6px_rgba(211,47,47,0.6)]'
                      : 'text-stark-cream/40 hover:text-stark-red/70'
                  }`}
                />
                {/* Tooltip */}
                <span className="absolute left-14 px-2 py-1 rounded text-[10px] font-body text-stark-cream bg-stark-black/90 border border-stark-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {link.label}
                </span>
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-stark-red rounded-r" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={toggleMusic}
          className="pointer-events-auto mt-auto mb-4 w-10 h-10 flex items-center justify-center text-stark-cream/60 hover:text-stark-red transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M21 12h.01M12 21h.01" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </nav>
    );
  }

  /* ───────── Mobile: Horizontal Navbar ───────── */
  return (
    <nav className="mobile-nav fixed top-0 left-0 w-full z-50 bg-stark-black/95 backdrop-blur-md blur-none-mobile">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/#home"
            className="font-warrior text-xl sm:text-2xl text-stark-red tracking-wider hover:text-stark-cream transition-colors"
          >
            ⚔ AZAFA
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className="text-stark-cream/60 hover:text-stark-red p-2"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M21 12h.01M12 21h.01" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMobile}
              className="flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-6 h-0.5 bg-stark-cream transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-stark-cream transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-stark-cream transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-80 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 py-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '') && location.pathname === '/';
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded font-body text-sm uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-stark-red bg-stark-black/50'
                      : 'text-stark-cream/70 hover:text-stark-red hover:bg-stark-black/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
