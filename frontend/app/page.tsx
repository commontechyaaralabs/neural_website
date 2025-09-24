"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="neural-container flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/TheNeuralwriting and logo.svg"
            alt="The Neural"
            width={160}
            height={40}
          />
        </div>
        <nav className="neural-nav hidden md:flex items-center gap-6 text-sm">
          <a href="#story">Our Story</a>
          <a href="#thought">Thought Leadership</a>
          <a href="#community">Community</a>
          <a href="#activities">Activities</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="neural-container grid md:grid-cols-2 gap-8 items-center py-14">
          <div className="order-2 md:order-1">
            <h1 className="neural-heading text-[44px] md:text-[64px] leading-tight neural-accent">
              Where Humans Meet AI
            </h1>
            <p className="mt-6 text-base md:text-lg text-[color:var(--muted)] max-w-[54ch]">
              Level up in AI with an exclusive platform empowering a future where AI
              augments human potential. Together, we build the next big things with
              and in AI from India.
            </p>
            <p className="mt-8 text-xl md:text-2xl neural-accent font-semibold">
              Join us Activate-Aug 8,Bangalore
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/hero_section_image.webp"
              alt="People collaborating with AI"
              width={1000}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="neural-container py-16">
        <div className="relative grid md:grid-cols-2 gap-16 items-stretch">
          {/* Left Story Card */}
            <div className="rounded-[200px] border-2 border-neural-violet p-12 bg-background flex flex-col justify-center min-h-[280px]">
            <h2 className="neural-heading text-2xl md:text-3xl neural-accent mb-6">
              The story behind The Neural
            </h2>
            <p className="text-[color:var(--foreground)] leading-relaxed">
              We're humans in AI. We mirror the principles of neural networks that enable cognition, 
              interconnectedness, and problem-solving. <br />
              <span className="neural-accent font-semibold">Our DNA is neural. We're neural.</span>
            </p>
          </div>

          {/* Right Story Card */}
            <div className="rounded-[200px] border-2 border-neural-violet p-12 bg-background flex flex-col justify-center min-h-[280px]">
            <h2 className="neural-heading text-2xl md:text-3xl neural-accent mb-6">
              Building human networks in AI
            </h2>
            <p className="text-[color:var(--foreground)] leading-relaxed">
              Become a part of our mission to catalyze AI creation and adoption with a neural layer of 
              human-powered networks for learning, collaboration, and real-time feedback.
            </p>
          </div>

          {/* Center Neural Logo - positioned absolutely */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <Image
              src="/TheNeuralsmall logo.svg"
              alt="Neural logo"
              width={48}
              height={48}
              className="neural-accent"
            />
          </div>
        </div>
      </section>

      {/* Thought Leadership Section */}
      <section className="neural-container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="neural-heading text-4xl md:text-5xl neural-accent mb-8">
              Thought Leadership Hub
            </h2>
            <p className="text-lg text-[color:var(--muted)] leading-relaxed mb-8">
              We bring together an enriching network of inspiring leaders from marquee brands who've achieved big things in AI. They share real-world experiences to help shape thoughts, and accelerate progress for those looking to adopt AI and innovate with AI. There's knowledge sharing through honest conversations and hard-won insights here that you won't find anywhere else.
            </p>
            <p className="text-lg text-[color:var(--foreground)] font-medium">
              Want to share your real experiences in AI? Write to us.
            </p>
          </div>
          <div>
            <Image
              src="/graphic 1.png"
              alt="Thought Leadership Hub"
              width={600}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Who is on TheNeural Section */}
      <section className="neural-container py-20">
        <div className="relative min-h-[600px] flex items-center justify-center">
          <AnimatedNeuralSVG />
        </div>
      </section>
    </div>
  );
}

// Animated Neural SVG Component
function AnimatedNeuralSVG() {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations in sequence
            setTimeout(() => setVisibleElements(['center']), 200);
            setTimeout(() => setVisibleElements(['center', 'tech']), 800);
            setTimeout(() => setVisibleElements(['center', 'tech', 'product']), 1400);
            setTimeout(() => setVisibleElements(['center', 'tech', 'product', 'business']), 2000);
            setTimeout(() => setVisibleElements(['center', 'tech', 'product', 'business', 'entrepreneurs']), 2600);
            setTimeout(() => setVisibleElements(['center', 'tech', 'product', 'business', 'entrepreneurs', 'engineering']), 3200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-full">
      {/* The actual SVG file */}
      <div className={`transition-all duration-1000 ${
        visibleElements.includes('center') ? 'opacity-100' : 'opacity-0'
      }`}>
        <Image
          src="/Who is on TheNeural.svg"
          alt="Who is on TheNeural"
          width={1440}
          height={810}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
