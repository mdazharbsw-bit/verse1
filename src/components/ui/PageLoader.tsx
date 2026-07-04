'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { loaderExit, prefersReducedMotion } from '@/lib/animations';

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already loaded in this session
    const hasLoaded = sessionStorage.getItem('verve-loaded');
    
    // Temporarily disabled for testing so it shows every time:
    /*
    if (hasLoaded || prefersReducedMotion()) {
      setIsVisible(false);
      onComplete?.();
      return;
    }
    */

    // Lock scroll while loading
    document.body.style.overflow = 'hidden';

    // Animation sequence
    const runAnimation = async () => {
      if (!fillRef.current || !containerRef.current) return;

      // 1. Animate the foreground logo clip-path to act as a progress bar (3.5 seconds)
      const fillAnim = anime({
        targets: fillRef.current,
        clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
        duration: 3500,
        easing: 'easeInOutQuart'
      });
      await fillAnim.finished;

      // 2. Hold momentarily after reaching 100%
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 3. Exit animation (fade out the whole page loader overlay)
      const exitAnim = loaderExit(containerRef.current, { duration: 600 });
      await exitAnim.finished;

      // Finish and cleanup
      sessionStorage.setItem('verve-loaded', 'true');
      document.body.style.overflow = '';
      setIsVisible(false);
      onComplete?.();
    };

    runAnimation();

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="page-loader fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      role="progressbar"
      aria-label="Loading VERVE"
    >
      <div className="relative inline-flex items-center justify-center">
        {/* Background dimmed logo */}
        <Image 
          src="/logo.png" 
          alt="Verve Logo Background" 
          width={300} 
          height={100} 
          className="w-auto h-16 md:h-24 object-contain opacity-20 pointer-events-none"
          priority
        />
        
        {/* Foreground filled logo functioning as progress bar */}
        <div 
          ref={fillRef} 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <Image 
            src="/logo.png" 
            alt="Verve Logo Loading" 
            width={300} 
            height={100} 
            className="w-auto h-16 md:h-24 object-contain pointer-events-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
