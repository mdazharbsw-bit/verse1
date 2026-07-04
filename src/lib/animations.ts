"use client";

import anime from "animejs";

/* ============================================
   VERVE Animation Utilities — Anime.js v4
   
   All scroll/reveal animations are driven
   through Anime.js. Every function returns
   the anime instance for external control.
   ============================================ */

// Default easing for premium feel
const EASE_OUT = "easeOutCubic" as const;
const EASE_OUT_QUART = "easeOutQuart" as const;

/**
 * Fade up reveal — the workhorse animation.
 * Elements fade in and translate upward.
 */
export function fadeUp(
  targets: any,
  options?: {
    duration?: number;
    delay?: number;
    distance?: number;
    stagger?: number;
  }
) {
  const {
    duration = 800,
    delay = 0,
    distance = 30,
    stagger = 0,
  } = options ?? {};

  return anime({
    targets,
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay: stagger ? anime.stagger(stagger, { start: delay }) : delay,
    easing: EASE_OUT,
  });
}

/**
 * Staggered fade up for groups of elements.
 */
export function staggerFadeUp(
  targets: any,
  options?: {
    duration?: number;
    delay?: number;
    staggerDelay?: number;
    distance?: number;
  }
) {
  const {
    duration = 800,
    delay = 0,
    staggerDelay = 100,
    distance = 30,
  } = options ?? {};

  return anime({
    targets,
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay: anime.stagger(staggerDelay, { start: delay }),
    easing: EASE_OUT,
  });
}

/**
 * Text reveal — line by line with clip-path mask.
 */
export function revealText(
  targets: any,
  options?: {
    duration?: number;
    delay?: number;
    staggerDelay?: number;
  }
) {
  const { duration = 900, delay = 0, staggerDelay = 120 } = options ?? {};

  return anime({
    targets,
    opacity: [0, 1],
    translateY: [40, 0],
    duration,
    delay: anime.stagger(staggerDelay, { start: delay }),
    easing: EASE_OUT_QUART,
  });
}

/**
 * Scale in — subtle scale entrance for images/cards.
 */
export function scaleIn(
  targets: any,
  options?: { duration?: number; delay?: number; from?: number }
) {
  const { duration = 1000, delay = 0, from = 0.95 } = options ?? {};

  return anime({
    targets,
    opacity: [0, 1],
    scale: [from, 1],
    duration,
    delay,
    easing: EASE_OUT,
  });
}

/**
 * Count up animation for statistics.
 */
export function countUp(
  element: HTMLElement,
  options?: {
    target?: number;
    duration?: number;
    delay?: number;
    suffix?: string;
  }
) {
  const {
    target = 0,
    duration = 2000,
    delay = 0,
    suffix = "",
  } = options ?? {};

  const obj = { value: 0 };

  return anime({
    targets: obj,
    value: target,
    duration,
    delay,
    easing: "easeOutQuart",
    round: 1,
    update: () => {
      element.textContent = `${obj.value}${suffix}`;
    },
  });
}

/**
 * Image mask reveal — clip-path based reveal.
 */
export function maskReveal(
  targets: any,
  options?: {
    duration?: number;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
  }
) {
  const { duration = 1200, delay = 0, direction = "up" } = options ?? {};

  const clipPaths: Record<string, [string, string]> = {
    up: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
    down: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
    left: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
  };

  const [from, to] = clipPaths[direction];

  return anime({
    targets,
    clipPath: [from, to],
    duration,
    delay,
    easing: EASE_OUT_QUART,
  });
}

/**
 * Slow zoom — for hero video/images.
 */
export function slowZoom(
  targets: any,
  options?: { duration?: number; scale?: number }
) {
  const { duration = 20000, scale = 1.08 } = options ?? {};

  return anime({
    targets,
    scale: [1, scale],
    duration,
    easing: "linear",
    loop: true,
    direction: "alternate",
  });
}

/**
 * Logo fade in with blur — for page loader.
 */
export function logoReveal(
  targets: any,
  options?: { duration?: number; delay?: number }
) {
  const { duration = 1200, delay = 200 } = options ?? {};

  return anime({
    targets,
    opacity: [0, 1],
    filter: ["blur(10px)", "blur(0px)"],
    duration,
    delay,
    easing: EASE_OUT_QUART,
  });
}

/**
 * Loader exit — fade out the entire loader.
 */
export function loaderExit(
  targets: any,
  options?: { duration?: number; delay?: number }
) {
  const { duration = 600, delay = 0 } = options ?? {};

  return anime({
    targets,
    opacity: [1, 0],
    duration,
    delay,
    easing: EASE_OUT,
  });
}

/**
 * Checks if user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
