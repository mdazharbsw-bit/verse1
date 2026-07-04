'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function VerveLogoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    // Select individual elements for assembly animation
    const v1 = svg.querySelector('.logo-v1');
    const v2 = svg.querySelector('.logo-v2');
    const rStem = svg.querySelector('.logo-r-stem');
    const rLoop = svg.querySelector('.logo-r-loop');
    const rLeg = svg.querySelector('.logo-r-leg');
    
    // E1 bars
    const e1t = svg.querySelector('.logo-e1-t');
    const e1m = svg.querySelector('.logo-e1-m');
    const e1b = svg.querySelector('.logo-e1-b');
    
    // E2 bars
    const e2t = svg.querySelector('.logo-e2-t');
    const e2m = svg.querySelector('.logo-e2-m');
    const e2b = svg.querySelector('.logo-e2-b');

    // Pre-set initial animation states
    const setInitialStyles = () => {
      // V letters start below and transparent
      [v1, v2].forEach((el) => {
        if (el) {
          (el as SVGGraphicsElement).style.opacity = '0';
          (el as SVGGraphicsElement).style.transform = 'translateY(80px)';
        }
      });

      // R stem starts above
      if (rStem) {
        (rStem as SVGGraphicsElement).style.opacity = '0';
        (rStem as SVGGraphicsElement).style.transform = 'translateY(-80px)';
      }

      // R loop starts collapsed to the left
      if (rLoop) {
        (rLoop as SVGGraphicsElement).style.opacity = '0';
        (rLoop as SVGGraphicsElement).style.transform = 'scaleX(0)';
        (rLoop as SVGGraphicsElement).style.transformOrigin = '277px 35px'; // loop start point
      }

      // R leg starts shifted left and rotated slightly
      if (rLeg) {
        (rLeg as SVGGraphicsElement).style.opacity = '0';
        (rLeg as SVGGraphicsElement).style.transform = 'translate(-30px, -20px)';
      }

      // E bars start shifted right
      [e1t, e1m, e1b, e2t, e2m, e2b].forEach((el) => {
        if (el) {
          (el as SVGGraphicsElement).style.opacity = '0';
          (el as SVGGraphicsElement).style.transform = 'translateX(100px)';
        }
      });
    };

    setInitialStyles();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = anime.timeline({
              easing: 'easeOutQuart',
            });

            // 1. V letters slide up and fade in
            tl.add({
              targets: [v1, v2],
              opacity: [0, 1],
              translateY: [80, 0],
              duration: 1000,
              delay: anime.stagger(150),
            });

            // 2. R stem slides down
            tl.add({
              targets: rStem,
              opacity: [0, 1],
              translateY: [-80, 0],
              duration: 900,
            }, '-=800');

            // 3. R loop reveals (scales horizontally)
            tl.add({
              targets: rLoop,
              opacity: [0, 1],
              scaleX: [0, 1],
              duration: 800,
              easing: 'easeOutBack',
            }, '-=600');

            // 4. R leg slides into place
            tl.add({
              targets: rLeg,
              opacity: [0, 1],
              translateX: [-30, 0],
              translateY: [-20, 0],
              duration: 800,
            }, '-=600');

            // 5. E bars slide in staggeredly from the right
            tl.add({
              targets: [e1t, e1m, e1b, e2t, e2m, e2b],
              opacity: [0, 1],
              translateX: [100, 0],
              duration: 900,
              delay: anime.stagger(100),
            }, '-=800');

            // Animate topographic lines in the background slowly
            anime({
              targets: '.topo-line',
              strokeDashoffset: [anime.random(200, 600), 0],
              duration: 6000,
              easing: 'easeOutSine',
              autoplay: true,
            });

            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-black py-32 flex items-center justify-center overflow-hidden border-b border-border"
      aria-label="Verve custom logo showcase"
    >
      {/* ── Topographic Background Waves ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.03] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 600"
          className="w-[120%] h-[120%] text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 100,300 C 250,150 400,450 550,300 C 700,150 850,450 900,300" className="topo-line" />
          <path d="M 50,250 C 200,100 350,400 500,250 C 650,100 800,400 950,250" className="topo-line" />
          <path d="M 150,350 C 300,200 450,500 600,350 C 750,200 900,500 950,350" className="topo-line" />
          <path d="M 0,200 C 150,50 300,350 450,200 C 600,50 750,350 900,200" className="topo-line" />
          <path d="M 200,400 C 350,250 500,550 650,400 C 800,250 950,550 1000,400" className="topo-line" />
        </svg>
      </div>

      {/* ── Centered Logo Canvas ── */}
      <div className="relative z-10 w-full max-w-[800px] px-6">
        <svg
          ref={svgRef}
          viewBox="0 0 600 120"
          className="w-full h-auto text-white fill-current"
          style={{ overflow: 'visible' }}
        >
          {/* V1 */}
          <polygon 
            points="45,10 79,110 101,110 135,10 113,10 90,82 67,10" 
            className="logo-v1 will-change-transform" 
          />

          {/* E1 */}
          <rect x="155" y="10" width="80" height="22" className="logo-e1-t will-change-transform" />
          <rect x="155" y="49" width="80" height="22" className="logo-e1-m will-change-transform" />
          <rect x="155" y="88" width="80" height="22" className="logo-e1-b will-change-transform" />

          {/* R */}
          <rect x="255" y="10" width="22" height="100" className="logo-r-stem will-change-transform" />
          <path 
            d="M 277 10 L 320 10 C 337 10, 337 60, 320 60 L 277 60 L 277 38 L 313 38 C 320 38, 320 32, 313 32 L 277 32 Z" 
            className="logo-r-loop will-change-transform" 
          />
          <polygon 
            points="290,60 312,60 340,110 318,110" 
            className="logo-r-leg will-change-transform" 
          />

          {/* V2 */}
          <polygon 
            points="365,10 399,110 421,110 455,10 433,10 410,82 387,10" 
            className="logo-v2 will-change-transform" 
          />

          {/* E2 */}
          <rect x="475" y="10" width="80" height="22" className="logo-e2-t will-change-transform" />
          <rect x="475" y="49" width="80" height="22" className="logo-e2-m will-change-transform" />
          <rect x="475" y="88" width="80" height="22" className="logo-e2-b will-change-transform" />
        </svg>
      </div>
    </section>
  );
}
