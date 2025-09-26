"use client";

import { useEffect, useState, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  scrollSpeedMultiplier?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '-50px',
    triggerOnce = false,
    scrollSpeedMultiplier = 1
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const ref = useRef<T>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !triggerOnce) {
          // Calculate scroll progress within the element
          const rect = entry.boundingClientRect;
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;
          
          // Calculate progress from 0 to 1 as element comes into view
          const progress = Math.max(0, Math.min(1, 
            (windowHeight - elementTop) / (windowHeight + elementHeight)
          ));
          setScrollProgress(progress);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Track scroll speed
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      if (timeDelta > 0) {
        const speed = scrollDelta / timeDelta; // pixels per millisecond
        setScrollSpeed(speed * scrollSpeedMultiplier);
      }
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.unobserve(element);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, rootMargin, triggerOnce, scrollSpeedMultiplier]);

  return {
    ref,
    isInView,
    scrollProgress,
    scrollSpeed,
    // Calculate animation delay based on scroll speed
    getAnimationDelay: () => {
      if (scrollSpeed === 0) return 0;
      // Faster scroll = shorter delay, slower scroll = longer delay
      return Math.max(0.05, Math.min(0.8, 1 / (scrollSpeed * 2000)));
    },
    // Calculate animation duration based on scroll speed
    getAnimationDuration: () => {
      if (scrollSpeed === 0) return 0.4;
      // Faster scroll = shorter duration, slower scroll = longer duration
      return Math.max(0.1, Math.min(1.2, 1 / (scrollSpeed * 800)));
    }
  };
}

// Hook specifically for scroll-triggered animations with speed control
export function useScrollTriggeredAnimation<T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) {
  const scrollAnimation = useScrollAnimation<T>(options);
  
  return {
    ...scrollAnimation,
    // Animation variants that respond to scroll
    getScrollBasedVariants: (baseVariants: any) => ({
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          ...baseVariants.visible?.transition,
          duration: scrollAnimation.getAnimationDuration(),
          delay: scrollAnimation.getAnimationDelay(),
        }
      }
    })
  };
}
