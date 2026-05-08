import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { FiArrowUp } from 'react-icons/fi';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);
  const boundsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    if (!boundsRef.current) {
      boundsRef.current = btnRef.current.getBoundingClientRect();
    }
    const bounds = boundsRef.current;
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    boundsRef.current = null;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  if (!visible) return null;

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full bg-stark-red text-stark-cream flex items-center justify-center shadow-lg shadow-stark-red/30 hover:scale-110 hover:shadow-stark-red/50 transition-all duration-300"
    >
      <FiArrowUp className="text-lg" />
    </button>
  );
};

export default BackToTop;
