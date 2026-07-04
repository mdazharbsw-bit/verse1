"use client";

import { useEffect, useRef, useCallback } from "react";
import { fadeUp, staggerFadeUp, scaleIn, maskReveal, prefersReducedMotion } from "@/lib/animations";

type AnimationType = "fadeUp" | "staggerFadeUp" | "scaleIn" | "maskReveal";

interface UseScrollAnimationOptions {
  type?: AnimationType;
  threshold?: number;
  rootMargin?: string;
  duration?: number;
  delay?: number;
  distance?: number;
  staggerDelay?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right";
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver + Anime.js.
 * Respects prefers-reduced-motion.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollAnimationOptions
) {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  const {
    type = "fadeUp",
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    duration = 800,
    delay = 0,
    distance = 30,
    staggerDelay = 100,
    once = true,
    direction = "up",
  } = options ?? {};

  const animate = useCallback(
    (element: T) => {
      if (prefersReducedMotion()) {
        // Just make visible without animation
        element.style.opacity = "1";
        element.style.transform = "none";
        element.style.clipPath = "none";
        return;
      }

      switch (type) {
        case "fadeUp":
          fadeUp(element, { duration, delay, distance });
          break;
        case "staggerFadeUp":
          staggerFadeUp(element.children, { duration, delay, staggerDelay, distance });
          break;
        case "scaleIn":
          scaleIn(element, { duration, delay });
          break;
        case "maskReveal":
          maskReveal(element, { duration, delay, direction });
          break;
      }
    },
    [type, duration, delay, distance, staggerDelay, direction]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state
    if (!prefersReducedMotion()) {
      if (type === "maskReveal") {
        element.style.clipPath = "inset(100% 0 0 0)";
      } else {
        element.style.opacity = "0";
        element.style.transform = `translateY(${distance}px)`;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;
            animate(element);
            if (once) observer.unobserve(element);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animate, threshold, rootMargin, once, distance, type]);

  return ref;
}

/**
 * Hook for scroll-triggered animations on multiple child elements.
 * Staggers children as they enter the viewport.
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  options?: {
    threshold?: number;
    rootMargin?: string;
    duration?: number;
    staggerDelay?: number;
    distance?: number;
    once?: boolean;
  }
) {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  const {
    threshold = 0.1,
    rootMargin = "0px 0px -30px 0px",
    duration = 800,
    staggerDelay = 80,
    distance = 30,
    once = true,
  } = options ?? {};

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    if (!prefersReducedMotion()) {
      children.forEach((child) => {
        child.style.opacity = "0";
        child.style.transform = `translateY(${distance}px)`;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;
            if (!prefersReducedMotion()) {
              staggerFadeUp(children, { duration, staggerDelay, distance });
            } else {
              children.forEach((child) => {
                child.style.opacity = "1";
                child.style.transform = "none";
              });
            }
            if (once) observer.unobserve(container);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, duration, staggerDelay, distance, once]);

  return ref;
}
