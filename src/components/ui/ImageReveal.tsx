'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import anime from 'animejs';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/lib/animations';

interface ImageRevealProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  direction?: 'up' | 'left' | 'right';
  parallax?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  direction = 'up',
  parallax = false,
  className = '',
  ...props
}: ImageRevealProps) {
  const containerRef = useScrollAnimation<HTMLDivElement>({
    type: 'maskReveal',
    direction,
    duration: 1200,
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax || prefersReducedMotion()) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          // Calculate how far through the viewport the element is
          const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
          // Apply a subtle parallax translation (max 10% of element height)
          const translateY = (progress - 0.5) * 20; 
          
          if (imageRef.current) {
            imageRef.current.style.transform = `scale(1.1) translateY(${translateY}%)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [parallax, containerRef]);

  // Handle scale animation on reveal
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            anime({
              targets: imageRef.current,
              scale: parallax ? [1.15, 1.1] : [1.05, 1],
              duration: 1200,
              easing: 'easeOutQuart',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [parallax, containerRef]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={!prefersReducedMotion() ? { clipPath: 'inset(100% 0 0 0)' } : undefined}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        className="object-cover transition-transform duration-100 ease-linear"
        style={{ transform: parallax ? 'scale(1.1)' : 'scale(1)' }}
        {...props}
      />
    </div>
  );
}
