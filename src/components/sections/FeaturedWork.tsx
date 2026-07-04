'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionHeading from '@/components/ui/SectionHeading';
import { caseStudies, type CaseStudy } from '@/data/caseStudies';
import { prefersReducedMotion } from '@/lib/animations';

/* ============================================
   CaseStudyCard — Individual project card
   ============================================ */

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isLast: boolean;
}

function CaseStudyCard({ study, index, isLast }: CaseStudyCardProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const contentRef = useScrollAnimation<HTMLDivElement>({
    type: 'fadeUp',
    duration: 800,
    delay: 100,
    distance: 20,
  });

  /* ---- Clip-path mask reveal on scroll ---- */
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    if (prefersReducedMotion()) {
      container.style.clipPath = 'inset(0 0 0 0)';
      return;
    }

    // Set initial state
    container.style.clipPath = 'inset(100% 0 0 0)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: container,
              clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'],
              duration: 1200,
              easing: 'easeOutQuart',
              delay: 50,
            });
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ---- Parallax effect on scroll ---- */
  useEffect(() => {
    const container = imageContainerRef.current;
    const image = imageRef.current;
    if (!container || !image || prefersReducedMotion()) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only apply parallax when element is in view
        if (rect.bottom > 0 && rect.top < windowHeight) {
          const scrollProgress =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          // Translate between -20px and +20px
          const translateY = (scrollProgress - 0.5) * 40;
          image.style.transform = `scale(1.1) translateY(${translateY}px)`;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <article
      className={index === 0 ? 'mt-16' : 'mt-20'}
      aria-label={`Case study: ${study.title} for ${study.client}`}
    >
      {/* Image area */}
      <div
        ref={imageContainerRef}
        className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[20px] overflow-hidden"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: 'scale(1.1)' }}
        >
          <Image
            src={study.heroImage}
            alt={`${study.title} — ${study.client}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      </div>

      {/* Content area */}
      <div ref={contentRef} className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Meta */}
          <div className="lg:col-span-4">
            <p className="text-eyebrow text-secondary">{study.category}</p>
            <p className="text-caption text-primary mt-1">{study.client}</p>
            <p className="text-caption text-secondary mt-1">{study.year}</p>
          </div>

          {/* Right — Title + Challenge */}
          <div className="lg:col-span-8">
            <h3 className="text-display-sm font-display text-primary">
              {study.title}
            </h3>
            <div className="mt-6">
              <p className="text-eyebrow mb-2">Challenge</p>
              <p className="text-body text-secondary">{study.challenge}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      {!isLast && <div className="border-b border-border mt-20" />}
    </article>
  );
}

/* ============================================
   HorizontalGallery — Draggable scroll gallery
   ============================================ */

function HorizontalGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const sectionRef = useScrollAnimation<HTMLDivElement>({
    type: 'fadeUp',
    duration: 800,
    delay: 0,
    distance: 20,
  });

  // Flatten all gallery images from case studies
  const galleryImages = useMemo(() => {
    return caseStudies.flatMap((study) =>
      study.galleryImages.map((img, i) => ({
        src: img,
        alt: `${study.client} — ${study.title}, gallery image ${i + 1}`,
        id: `${study.id}-gallery-${i}`,
      }))
    );
  }, []);

  /* ---- Drag to scroll ---- */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    isDragging.current = true;
    startX.current = e.pageX - gallery.offsetLeft;
    scrollLeft.current = gallery.scrollLeft;
    gallery.style.cursor = 'grabbing';
    gallery.style.userSelect = 'none';
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.style.cursor = 'grab';
      gallery.style.userSelect = '';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const gallery = galleryRef.current;
    if (!gallery) return;
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    gallery.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.style.cursor = 'grab';
      gallery.style.userSelect = '';
    }
  }, []);

  return (
    <div ref={sectionRef} className="mt-24">
      <p className="text-eyebrow mb-8">Gallery</p>

      <div
        ref={galleryRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 cursor-grab select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        data-cursor="drag"
        role="region"
        aria-label="Project gallery — drag to scroll"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="relative flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] aspect-[3/2] rounded-[20px] overflow-hidden snap-center"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-cubic)] hover:scale-105"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   FeaturedWork — Main Section Component
   ============================================ */

export default function FeaturedWork() {
  return (
    <section id="work" className="section-padding bg-background">
      <div className="container-verve">
        {/* Section Header */}
        <SectionHeading
          eyebrow="03 — Featured Work"
          title="Selected Projects"
          description="A curated selection of our most impactful experiences and campaigns."
          align="left"
        />

        {/* Case Studies */}
        <div>
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              isLast={index === caseStudies.length - 1}
            />
          ))}
        </div>

        {/* Horizontal Gallery */}
        <HorizontalGallery />
      </div>
    </section>
  );
}
