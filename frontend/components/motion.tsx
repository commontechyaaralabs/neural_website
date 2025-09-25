"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// Base animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1
  }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1
  }
};

const slideTowardsCenter = {
  hidden: { opacity: 0, x: -80, scale: 0.8 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1
  }
};

const slideTowardsCenterRight = {
  hidden: { opacity: 0, x: 80, scale: 0.8 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1
  }
};

// Reusable motion components
interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, className = "", delay = 0, duration = 0.2 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className = "", delay = 0, duration = 0.2 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration, delay, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, className = "", delay = 0, duration = 0.6 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInLeft}
      transition={{ duration: duration * 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ children, className = "", delay = 0, duration = 0.6 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInRight}
      transition={{ duration: duration * 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className = "", delay = 0, duration = 0.5 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      transition={{ duration: duration * 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// HeroImageSlide component removed as per user request

export function SlideTowardsCenter({ children, className = "", delay = 0 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideTowardsCenter}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideTowardsCenterRight({ children, className = "", delay = 0 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideTowardsCenterRight}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
}

export function StaggerChildren({ 
  children, 
  className = "", 
  staggerDelay = 0.1, 
  childDelay = 0 
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: childDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual child animation for stagger
export function StaggerChild({ children, className = "", direction = "up" }: MotionWrapperProps & { direction?: "up" | "left" | "right" | "scale" }) {
  const variants = {
    up: fadeInUp,
    left: fadeInLeft,
    right: fadeInRight,
    scale: scaleIn
  };

  return (
    <motion.div
      variants={variants[direction]}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Letter spacing animation for headings
export function AnimatedHeading({ children, className = "", delay = 0 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, letterSpacing: "-0.1em" },
        visible: { 
          opacity: 1, 
          letterSpacing: "-0.02em",
          transition: { 
            duration: 0.3, 
            delay,
            ease: "easeOut" 
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}

// Bounce animation for CTA elements
export function BounceIn({ children, className = "", delay = 0 }: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, scale: 0.3 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration: 0.2, 
            delay,
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover animations for cards
export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className={`transition-shadow duration-300 hover:shadow-2xl hover:shadow-neural-violet/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Hover animations for images - removed as per user request

// Button animations
export function AnimatedButton({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(184, 107, 221, 0.4)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// Link animations
export function AnimatedLink({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className={`relative transition-all duration-300 hover:text-neural-green ${className}`}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-neural-green"
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
