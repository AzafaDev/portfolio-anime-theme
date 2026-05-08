import { useRef } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
  ...rest
}) => {
  const btnRef = useRef(null);
  const boundsRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    if (!boundsRef.current) {
      boundsRef.current = btnRef.current.getBoundingClientRect();
    }
    const bounds = boundsRef.current;
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(btnRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    boundsRef.current = null;
  };

  const commonProps = {
    ref: btnRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...rest,
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block ${className}`}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={`inline-block ${className}`} {...commonProps}>
      {children}
    </button>
  );
};

export default MagneticButton;
