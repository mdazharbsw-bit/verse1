'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // ── Scroll detection ──────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // ── Mobile menu open / close animations ───────────
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const linksContainer = mobileLinksRef.current;
    if (!menu || !linksContainer) return;

    if (isMobileOpen) {
      menu.style.display = 'flex';
      anime({
        targets: menu,
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic',
      });
      anime({
        targets: linksContainer.children,
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(80, { start: 200 }),
        duration: 600,
        easing: 'easeOutCubic',
      });
    } else {
      anime({
        targets: menu,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutCubic',
        complete: () => { menu.style.display = 'none'; },
      });
    }
  }, [isMobileOpen]);

  // ── Smooth scroll handler ─────────────────────────
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* ── Main navigation bar ─────────────────── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-400 ${
          isScrolled
            ? 'bg-black border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-verve flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, '#hero')}
            className="transition-transform duration-300 hover:scale-105"
            data-cursor="pointer"
            aria-label="VERVE – Back to top"
          >
            <Image 
              src="/logo.png" 
              alt="Verve Logo" 
              width={140} 
              height={40} 
              className="h-8 md:h-10 w-auto object-contain" 
              priority 
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="nav-link font-body text-[14px] uppercase tracking-[0.08em] font-normal text-white"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <MagneticButton
                variant="outline"
                onClick={() => {
                  const target = document.getElementById('contact');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                ariaLabel="Let's talk"
              >
                Let&apos;s Talk
              </MagneticButton>
            </div>

            {/* Hamburger (mobile) */}
            <button
              ref={hamburgerRef}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="relative flex flex-col items-center justify-center w-10 h-10 md:hidden"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              data-cursor="pointer"
            >
              <span
                className={`block h-px w-6 bg-white transition-all duration-300 ${
                  isMobileOpen
                    ? 'translate-y-[1px] rotate-45'
                    : '-translate-y-1'
                }`}
              />
              <span
                className={`block h-px w-6 bg-white transition-all duration-300 ${
                  isMobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-px w-6 bg-white transition-all duration-300 ${
                  isMobileOpen
                    ? '-translate-y-[1px] -rotate-45'
                    : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay menu ─────────────────── */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[999] flex-col items-center justify-center bg-black md:hidden"
        style={{ display: 'none' }}
        aria-label="Mobile navigation menu"
        role="dialog"
      >
        <div
          ref={mobileLinksRef}
          className="flex flex-col items-center gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-display text-3xl font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-300 hover:opacity-60"
              data-cursor="pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <MagneticButton
              variant="outline"
              onClick={() => {
                const target = document.getElementById('contact');
                target?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileOpen(false);
              }}
              ariaLabel="Let's talk"
            >
              Let&apos;s Talk
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
}
