'use client';

import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';

/* ============================================
   Custom Cursor — VERVE
   
   A small white dot (12px) that follows the
   mouse with smooth easing. Expands on
   interactive elements with contextual text.
   Hidden on touch devices via CSS.
   ============================================ */

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const isExpandedRef = useRef(false);
  const activeAnimRef = useRef<ReturnType<typeof anime> | null>(null);

  /* ---- Smooth position lerp via rAF ---- */
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  const updateCursorPosition = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    currentRef.current.x = lerp(currentRef.current.x, positionRef.current.x, 0.15);
    currentRef.current.y = lerp(currentRef.current.y, positionRef.current.y, 0.15);

    cursor.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;

    rafRef.current = requestAnimationFrame(updateCursorPosition);
  }, [lerp]);

  /* ---- Expand / collapse the cursor ---- */
  const expand = useCallback((label?: string) => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || isExpandedRef.current) return;

    isExpandedRef.current = true;
    cursor.classList.add('expanded');

    if (text && label) {
      text.textContent = label;
    }
  }, []);

  const collapse = useCallback(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !isExpandedRef.current) return;

    isExpandedRef.current = false;
    cursor.classList.remove('expanded');

    if (text) {
      text.textContent = '';
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check for touch device — bail early
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    /* ---- Mouse move handler ---- */
    const onMouseMove = (e: MouseEvent) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;

      // Show cursor when it moves for the first time
      if (cursor.style.opacity === '0') {
        cursor.style.opacity = '1';
      }
    };

    /* ---- Detect interactive elements ---- */
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor], input, textarea, select, label'
      );

      if (interactive) {
        const dataCursor = interactive.getAttribute('data-cursor');
        const label = dataCursor || 'View';
        expand(label);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor], input, textarea, select, label'
      );

      if (interactive) {
        collapse();
      }
    };

    /* ---- Hide on mouse leave window ---- */
    const onMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (cursor) cursor.style.opacity = '1';
    };

    // Initialize position off-screen, invisible
    cursor.style.opacity = '0';
    currentRef.current = { x: -100, y: -100 };

    // Start rAF loop
    rafRef.current = requestAnimationFrame(updateCursorPosition);

    // Bind events
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (activeAnimRef.current) {
        // anime v4 — pause to stop
        try {
          activeAnimRef.current.pause();
        } catch {
          // noop
        }
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [updateCursorPosition, expand, collapse]);

  return (
    <div
      ref={cursorRef}
      className="cursor-dot"
      aria-hidden="true"
    >
      <span ref={textRef} className="cursor-text" />
    </div>
  );
}
