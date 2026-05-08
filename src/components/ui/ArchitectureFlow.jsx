import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const NODE_GAP = 180;
const NODE_WIDTH = 260;
const PADDING_X = 32;

const ArchitectureFlow = ({ steps = [] }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const nodeRefs = useRef([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  /* ─── Animasi (tetap dijalankan di kedua mode) ─── */
  useEffect(() => {
    if (!containerRef.current || steps.length === 0) return;

    const ctx = gsap.context(() => {
      // Animasi node (kartu) – ref akan terpasang baik di mobile maupun desktop
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      // Animasi SVG hanya untuk desktop
      if (!isMobile) {
        const dotEls = containerRef.current.querySelectorAll('.arch-dot');
        dotEls.forEach((dot, i) => {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              delay: i * 0.12 + 0.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: dot,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });

        const pathEl = svgRef.current?.querySelector('.arch-path');
        if (pathEl) {
          const length = pathEl.getTotalLength();
          gsap.fromTo(
            pathEl,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 0.5,
              },
            },
          );
        }
      } else {
        // Animasi titik pada mobile (pulse permanent)
        const dots = containerRef.current.querySelectorAll('.arch-mobile-dot');
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            scale: 1.3,
            duration: 1.2,
            delay: i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [steps.length, isMobile]);

  /* ─── Render untuk Desktop (SVG zig‑zag) ─── */
  if (!isMobile) {
    const totalHeight = steps.length * NODE_GAP;
    const svgWidth = 640;
    const centerX = svgWidth / 2;

    const pathD = steps
      .map((_, i) => {
        const y = i * NODE_GAP + NODE_GAP / 2;
        const flip = i % 2 === 0;
        const nodeLeft = flip ? centerX + 30 : centerX - NODE_WIDTH - 30;
        const nodeCenterX = nodeLeft + NODE_WIDTH / 2;
        if (i === 0) {
          return `M ${centerX} 0 L ${centerX} ${y} L ${nodeCenterX} ${y}`;
        }
        const prevFlip = (i - 1) % 2 === 0;
        const prevNodeLeft = prevFlip ? centerX + 30 : centerX - NODE_WIDTH - 30;
        const prevNodeCenterX = prevNodeLeft + NODE_WIDTH / 2;
        const prevY = (i - 1) * NODE_GAP + NODE_GAP / 2;
        return `L ${prevNodeCenterX} ${prevY} L ${centerX} ${prevY}` + ` L ${centerX} ${y} L ${nodeCenterX} ${y}`;
      })
      .join(' ');

    return (
      <div ref={containerRef} className="relative w-full py-8 overflow-hidden">
        <div className="flex justify-center">
          <svg
            ref={svgRef}
            className="arch-path-svg absolute left-1/2 -translate-x-1/2 pointer-events-none"
            width={svgWidth}
            height={totalHeight}
            viewBox={`0 0 ${svgWidth} ${totalHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              className="arch-path"
              d={pathD}
              fill="none"
              stroke="#D32F2F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 4"
              opacity="0.6"
            />
            {steps.map((_, i) => (
              <circle
                key={i}
                className="arch-dot"
                cx={centerX}
                cy={i * NODE_GAP + NODE_GAP / 2}
                r="6"
                fill="#1A1A1A"
                stroke="#D32F2F"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="relative" style={{ minHeight: totalHeight + 40 }}>
          {steps.map((step, i) => {
            const flip = i % 2 === 0;
            const yPos = i * NODE_GAP;
            return (
              <div
                key={i}
                ref={(el) => (nodeRefs.current[i] = el)}
                className="absolute w-full flex justify-center"
                style={{ top: yPos }}
              >
                <div
                  className="absolute top-0"
                  style={{
                    [flip ? 'left' : 'right']: `calc(50% + ${PADDING_X}px)`,
                    [flip ? 'right' : 'left']: 'auto',
                    width: NODE_WIDTH,
                    transform: `translateY(-50%)`,
                  }}
                >
                  <StepCard step={step} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Render Mobile (Timeline Vertikal) ─── */
  return (
    <div ref={containerRef} className="w-full py-8 pl-2">
      <div className="relative">
        {/* Garis vertikal tengah */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-stark-red/20" />

        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => (nodeRefs.current[i] = el)}
            className="relative flex items-start mb-10 last:mb-0 pl-12"
          >
            {/* Titik bulat berdenyut */}
            <div className="absolute left-[0.35rem] top-2 z-10">
              <div className="arch-mobile-dot w-3 h-3 rounded-full bg-stark-black border-2 border-stark-red shadow-[0_0_6px_rgba(211,47,47,0.4)]" />
            </div>

            {/* Kartu konten */}
            <div className="flex-1">
              <StepCard step={step} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Komponen kartu kecil yang seragam ─── */
const StepCard = ({ step }) => (
  <div className="p-5 bg-stark-black/60 border border-stark-red/20 rounded-xl backdrop-blur-md hover:border-stark-red/50 transition-all group">
    <div className="flex items-start gap-3 mb-2">
      {step.icon && (
        <span className="text-2xl flex-shrink-0">{step.icon}</span>
      )}
      <div>
        <span className="font-body text-stark-red text-[10px] uppercase tracking-[0.25em]">
          {step.label}
        </span>
        <h4 className="font-warrior text-stark-cream text-sm mt-0.5">
          {step.title}
        </h4>
      </div>
    </div>
    <p className="font-body text-stark-gray text-xs leading-relaxed">
      {step.desc}
    </p>
  </div>
);

export default ArchitectureFlow;
