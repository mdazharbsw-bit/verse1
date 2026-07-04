'use client';

import { useRef, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import anime from 'animejs';

/* ============================================
   Magnetic Button — VERVE
   
   Premium pill button with magnetic hover,
   text slide-up effect, and spring-back
   animation on mouse leave.
   ============================================ */

interface MagneticButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  href?: string;
  onClick?: () => void;
  size?: 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
}

const sizeClasses: Record<string, string> = {
  md: 'h-12 px-10 text-[11px] min-w-[160px]',
  lg: 'h-14 px-12 text-[13px] min-w-[180px]',
};

const variantClasses: Record<string, string> = {
  primary:
    'bg-white text-black hover:bg-white/90',
  outline:
    'bg-transparent text-white border border-white hover:bg-white/5',
};

export default function MagneticButton({
  children,
  variant = 'primary',
  href,
  onClick,
  size = 'md',
  className = '',
  icon,
  ariaLabel,
  type = 'button',
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  /* ---- Magnetic effect: subtle follow on mousemove ---- */
  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle pull — 30% of distance
      const pullX = x * 0.3;
      const pullY = y * 0.3;

      el.style.transform = `translate(${pullX}px, ${pullY}px)`;

      // Inner content moves slightly more for depth
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${pullX * 0.4}px, ${pullY * 0.4}px)`;
      }
    },
    []
  );

  /* ---- Spring back on mouse leave ---- */
  const handleMouseLeave = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    anime({
      targets: el,
      translateX: 0,
      translateY: 0,
      duration: 600,
      easing: 'easeOutCubic',
    });

    if (contentRef.current) {
      anime({
        targets: contentRef.current,
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'easeOutCubic',
      });
    }
  }, []);

  /* ---- Common props ---- */
  const baseClasses = [
    'group relative inline-flex items-center justify-center gap-2',
    'font-display font-medium uppercase tracking-[0.1em]',
    'rounded-[999px] cursor-pointer',
    'transition-colors duration-300',
    'will-change-transform',
    'overflow-hidden',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <span
      ref={contentRef}
      className="relative z-10 flex items-center gap-2 will-change-transform"
    >
      {/* Primary text row with slide-up effect */}
      <span className="relative overflow-hidden inline-block leading-none">
        {/* Visible text — slides up on hover */}
        <span className="block transition-transform duration-500 ease-[var(--ease-out-cubic)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Duplicate — slides in from below */}
        <span
          className="absolute top-full left-0 w-full block text-center transition-transform duration-500 ease-[var(--ease-out-cubic)] group-hover:-translate-y-full"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>

      {/* Icon / arrow */}
      {icon && (
        <span className="inline-flex transition-transform duration-500 ease-[var(--ease-out-cubic)] group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </span>
  );

  const inlineStyles = size === 'md'
    ? { height: '48px', paddingLeft: '32px', paddingRight: '32px', minWidth: '160px', fontSize: '11px' }
    : { height: '56px', paddingLeft: '40px', paddingRight: '40px', minWidth: '180px', fontSize: '13px' };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={baseClasses}
        style={inlineStyles}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="view"
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={baseClasses}
      style={inlineStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
