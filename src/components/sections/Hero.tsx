'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import MagneticButton from '@/components/ui/MagneticButton';
import { prefersReducedMotion, slowZoom, revealText, fadeUp } from '@/lib/animations';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Make everything visible immediately
      [eyebrowRef, headlineRef, copyRef, ctaRef, scrollIndicatorRef].forEach(
        (ref) => {
          if (ref.current) {
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'none';
          }
        }
      );
      // Still make headline words visible
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll<HTMLSpanElement>('.hero-word');
        words.forEach((w) => {
          w.style.opacity = '1';
          w.style.transform = 'none';
        });
      }
      return;
    }

    // ── Video slow zoom ───────────────────────────
    if (videoRef.current) {
      slowZoom(videoRef.current);
    }

    // ── Entry animation sequence ──────────────────
    // Delay 1.5s to allow page loader to finish
    const masterDelay = 1500;

    // 1. Eyebrow fades up (600ms)
    if (eyebrowRef.current) {
      eyebrowRef.current.style.opacity = '0';
      eyebrowRef.current.style.transform = 'translateY(20px)';
      fadeUp(eyebrowRef.current, {
        duration: 600,
        delay: masterDelay,
        distance: 20,
      });
    }

    // 2. Headline words reveal one by one (stagger 120ms, 900ms each)
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll<HTMLSpanElement>('.hero-word');
      words.forEach((w) => {
        w.style.opacity = '0';
        w.style.transform = 'translateY(40px)';
      });
      revealText(words, {
        duration: 900,
        delay: masterDelay + 400,
        staggerDelay: 120,
      });
    }

    // 3. Supporting copy fades up (800ms, 200ms after headline)
    if (copyRef.current) {
      copyRef.current.style.opacity = '0';
      copyRef.current.style.transform = 'translateY(20px)';
      fadeUp(copyRef.current, {
        duration: 800,
        delay: masterDelay + 400 + 900 + 200,
        distance: 20,
      });
    }

    // 4. CTAs stagger fade up (800ms, stagger 100ms)
    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      Array.from(buttons).forEach((btn) => {
        (btn as HTMLElement).style.opacity = '0';
        (btn as HTMLElement).style.transform = 'translateY(20px)';
      });
      anime({
        targets: buttons,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(100, { start: masterDelay + 400 + 900 + 200 + 400 }),
        easing: 'easeOutCubic',
      });
    }

    // 5. Scroll indicator fades in (600ms)
    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.style.opacity = '0';
      fadeUp(scrollIndicatorRef.current, {
        duration: 600,
        delay: masterDelay + 400 + 900 + 200 + 400 + 600,
        distance: 10,
      });
    }
  }, []);

  const headlineWords = ['VERVE.', 'IT’S', 'IN', 'EVERYTHING', 'WE', 'DO.'];

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100dvh] w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background video ───────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        aria-hidden="true"
        suppressHydrationWarning
      >
        <source
          src="/videos/Concert.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Dark overlay ───────────────────────── */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* ── Content ────────────────────────────── */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-verve">
          {/* Eyebrow */}
          <p 
            ref={eyebrowRef} 
            className="text-eyebrow"
            style={{ marginBottom: '2rem' }}
          >
            Experiential Marketing &amp; Events
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-display-lg max-w-4xl"
          >
            {headlineWords.map((word, i) => (
              <span 
                key={i} 
                className="hero-word inline-block"
                style={{ marginRight: '0.4em' }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Supporting copy */}
          <p
            ref={copyRef}
            className="text-body-lg max-w-xl text-secondary"
            style={{ marginTop: '2.5rem' }}
          >
            We create extraordinary moments that captivate audiences, amplify
            brands, and drive meaningful engagement.
          </p>

          {/* CTAs */}
          <div 
            ref={ctaRef} 
            className="flex flex-wrap"
            style={{ marginTop: '3rem', gap: '1.5rem' }}
          >
            <MagneticButton
              variant="primary"
              onClick={() => {
                const workSection = document.getElementById('work');
                workSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              ariaLabel="Explore our work"
            >
              Explore Work
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              ariaLabel="Get in touch"
            >
              Let&apos;s Talk
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
        data-cursor="pointer"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleScrollDown();
        }}
      >
        <span className="text-eyebrow">Scroll</span>
        <span className="scroll-indicator block w-px h-6 bg-white/60" />
      </div>
    </section>
  );
}
