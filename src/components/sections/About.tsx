'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stats counter state
  const [counts, setCounts] = useState({ events: 0, partners: 0, cities: 0 });

  // Splits text into clean word elements with explicit inline styles for spacing
  // Bypasses Tailwind compile/cache quirks by using inline marginRight styles
  const splitText = (text: string, trackingClass: 'tight' | 'normal' = 'normal') => {
    return text.split(' ').map((word, i) => {
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const isHighlighted = ['cultural', 'moment', 'ours'].includes(cleanWord.toLowerCase());

      return (
        <span 
          key={i} 
          className="inline-block overflow-hidden py-0.5" 
          style={{ 
            marginRight: '0.38em', 
            perspective: '400px' 
          }}
        >
          <span 
            className="about-word inline-block origin-bottom"
            style={{
              fontStyle: isHighlighted ? 'italic' : 'normal',
              color: isHighlighted ? 'var(--color-primary)' : 'inherit',
              fontWeight: isHighlighted ? '400' : 'inherit',
              letterSpacing: trackingClass === 'tight' ? '-0.02em' : '-0.01em',
            }}
          >
            {word}
          </span>
        </span>
      );
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.about-word');
    const label = container.querySelector('.section-label');
    const stats = container.querySelector('.about-stats');

    // Initialize 3D hidden states on client mount
    words.forEach((word) => {
      const htmlEl = word as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(110%) rotateX(-65deg)';
      htmlEl.style.filter = 'blur(4px)';
    });

    if (label) {
      const htmlLabel = label as HTMLElement;
      htmlLabel.style.opacity = '0';
      htmlLabel.style.transform = 'translateY(20px)';
    }

    if (stats) {
      const htmlStats = stats as HTMLElement;
      htmlStats.style.opacity = '0';
      htmlStats.style.transform = 'translateY(30px)';
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Reveal eyebrow label
            anime({
              targets: label,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 500,
              easing: 'easeOutQuad',
            });

            // 2. 3D flip-up staggered reveal wave on words
            anime({
              targets: words,
              opacity: {
                value: [0, 1],
                duration: 400,
                easing: 'linear',
              },
              translateY: {
                value: ['110%', '0%'],
                duration: 800,
                easing: 'cubicBezier(0.25, 1, 0.5, 1)', // easeOutQuart
              },
              rotateX: {
                value: [-65, 0],
                duration: 750,
                easing: 'cubicBezier(0.25, 1, 0.5, 1)',
              },
              filter: {
                value: ['blur(4px)', 'blur(0px)'],
                duration: 600,
                easing: 'easeOutQuad',
              },
              delay: anime.stagger(15, { start: 100 }), // Fluid stagger wave
            });

            // 3. Reveal Stats Container
            anime({
              targets: stats,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: 'easeOutCubic',
              delay: 900,
            });

            // 4. Staggered countUp stats animation
            const targets = { events: 0, partners: 0, cities: 0 };
            anime({
              targets,
              events: 200,
              partners: 50,
              cities: 12,
              round: 1,
              easing: 'easeOutExpo',
              duration: 2000,
              delay: 950,
              update: () => {
                setCounts({
                  events: targets.events,
                  partners: targets.partners,
                  cities: targets.cities
                });
              }
            });

            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden border-b border-white/10">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-verve relative z-10">
        <div ref={containerRef} className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Columns) */}
          <div className="about-left lg:col-span-5 flex flex-col items-start">
            <div className="section-label text-eyebrow text-secondary tracking-[0.2em] font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
              Who we are
            </div>
            
            <h2 className="section-title text-display-sm md:text-display-md text-primary font-bold mt-8 leading-tight flex flex-wrap">
              {splitText("We believe every event should feel like a cultural moment.", "tight")}
            </h2>
          </div>

          {/* Right Column (7 Columns) */}
          <div className="about-right lg:col-span-7 flex flex-col justify-center">
            
            <p className="about-text text-xl md:text-2xl text-neutral-300 font-light tracking-wide leading-relaxed flex flex-wrap mb-10">
              {splitText("VERSE was born from a simple frustration — events that looked the same, felt the same, and were forgotten the same. We decided to change that.", "normal")}
            </p>
            
            <p className="about-text text-body-lg text-secondary leading-relaxed flex flex-wrap mb-12">
              {splitText("We're a collective of designers, producers, and strategists who obsess over every detail. From the first concept sketch to the last light cue, we build experiences that are bold, immersive, and unmistakably ours.", "normal")}
            </p>

            {/* Stats Subgrid */}
            <div className="about-stats grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 pt-12 border-t border-white/10 w-full">
              
              <div className="stat flex flex-col">
                <div className="flex items-baseline">
                  <span className="stat-number text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
                    {counts.events}
                  </span>
                  <span className="stat-plus text-primary/70 text-2xl font-bold ml-1">+</span>
                </div>
                <span className="stat-label text-caption text-secondary mt-2">
                  Events Produced
                </span>
              </div>

              <div className="stat flex flex-col">
                <div className="flex items-baseline">
                  <span className="stat-number text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
                    {counts.partners}
                  </span>
                  <span className="stat-plus text-primary/70 text-2xl font-bold ml-1">+</span>
                </div>
                <span className="stat-label text-caption text-secondary mt-2">
                  Brand Partners
                </span>
              </div>

              <div className="stat flex flex-col">
                <span className="stat-number text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
                  {counts.cities}
                </span>
                <span className="stat-label text-caption text-secondary mt-2">
                  Cities Worldwide
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
