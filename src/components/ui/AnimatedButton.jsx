import { useRef } from 'react';
import { gsap } from 'gsap';
import useSound from '../../hooks/useSound';

const AnimatedButton = ({ text, variant = 'primary', onClick, icon: Icon, magnetic = false, className: extraClassName = '', ...rest }) => {
  const btnRef = useRef(null);
  const slashRef = useRef(null);
  const boundsRef = useRef(null);
  const playHover = useSound('/sounds/hover.mp3');
  const playClick = useSound('/sounds/slash.mp3');

  const handleMouseMove = (e) => {
    if (!magnetic || !btnRef.current) return;
    if (!boundsRef.current) {
      boundsRef.current = btnRef.current.getBoundingClientRect();
    }
    const bounds = boundsRef.current;
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    playHover(0.4);

    const ctx = gsap.context(() => {
      gsap.to(btnRef.current, {
        scale: 1.04,
        duration: 0.2,
        ease: 'expo.out',
      });

      if (variant === 'primary') {
        gsap.to(btnRef.current, {
          boxShadow: '0 0 20px rgba(211,47,47,0.6)',
          duration: 0.3,
        });
      }

      if (slashRef.current) {
        gsap.fromTo(
          slashRef.current,
          { x: '-100%', opacity: 1 },
          { x: '100%', opacity: 0, duration: 0.4, ease: 'power2.inOut' },
        );
      }
    }, btnRef);
    return () => ctx.revert();
  };

  const handleMouseLeave = () => {
    boundsRef.current = null;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: magnetic ? 0.5 : 0.2,
      ease: magnetic ? 'elastic.out(1, 0.3)' : 'expo.out',
      boxShadow: 'none',
    });
  };

  const handleClick = (e) => {
    playClick(0.3);

    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
    `;
    btnRef.current.appendChild(ripple);

    gsap.to(ripple, {
      width: 400,
      height: 400,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });

    if (onClick) onClick();
  };

  const baseClasses =
    'relative overflow-hidden font-body text-sm sm:text-base font-semibold uppercase tracking-wider px-8 py-3.5 rounded transition-colors flex items-center gap-2';

  const variantClasses =
    variant === 'primary'
      ? 'bg-stark-red text-stark-cream hover:bg-stark-red-dark'
      : 'bg-transparent text-stark-cream border border-stark-red/50 hover:bg-stark-red/10 hover:border-stark-red';

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variantClasses} ${extraClassName}`.trim()}
      {...rest}
    >
      <span
        ref={slashRef}
        className="absolute top-0 left-0 w-full h-px bg-stark-cream/30 opacity-0"
      />
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </button>
  );
};

export default AnimatedButton;
