"use client";

import Image from "next/image";
import { useEffect } from "react";
import { 
  FadeIn, 
  SlideUp, 
  SlideInLeft, 
  SlideInRight, 
  ScaleIn, 
  SlideTowardsCenter,
  SlideTowardsCenterRight,
  StaggerChildren, 
  StaggerChild, 
  AnimatedHeading, 
  BounceIn, 
  HoverCard, 
  AnimatedButton, 
  AnimatedLink 
} from "../components/motion";

export default function Home() {
  // Ensure page starts at top and stays there
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also ensure it stays at top after any potential re-renders
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    
    // Use requestAnimationFrame to ensure it runs after any layout
    const scrollToTop = () => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    };
    
    window.addEventListener('load', handleLoad);
    
    // Also run after a short delay to catch any late layout changes
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-neural-violet/20">
        <div className="neural-container flex items-center justify-center py-4">
          <nav className="neural-nav flex items-center gap-8 text-lg font-semibold">
            <a href="#story" className="neural-nav-link">Our Story</a>
            <a href="#thought" className="neural-nav-link">Thought Leadership</a>
            <a href="#community" className="neural-nav-link">Community</a>
            <a href="#activities" className="neural-nav-link">Activities</a>
          </nav>
        </div>
      </header>


      {/* Hero Section */}
      <section className="relative">
        <div className="neural-container grid md:grid-cols-2 gap-8 items-center py-14">
          <div className="order-2 md:order-1 flex flex-col justify-center items-start h-full">
            {/* TheNeural Logo */}
            <FadeIn delay={0.1}>
              <div className="mb-12 -mt-70">
                <Image
                  src="/TheNeuralwriting and logo.svg"
                  alt="The Neural"
                  width={200}
                  height={50}
                  className="neural-logo"
                />
              </div>
            </FadeIn>
            
            <AnimatedHeading 
              className="neural-heading text-[32px] sm:text-[40px] md:text-[56px] leading-tight neural-accent whitespace-nowrap"
              delay={0.3}
            >
              Where Humans Meet AI
            </AnimatedHeading>
            <SlideUp delay={0.6}>
              <p className="mt-6 text-base md:text-lg text-[color:var(--muted)] max-w-[54ch]">
                Level up in AI with an exclusive platform empowering a future where AI
                augments human potential. Together, we build the ne xt big things with
                and in AI from India.
              </p>
            </SlideUp>
            <BounceIn delay={0.4}>
              <p className="mt-8 text-xl md:text-2xl neural-accent font-semibold">
                Join us Activate-Nov 4,Bangalore
              </p>
            </BounceIn>
          </div>
          <div className="order-1 md:order-2 -mt-16 flex justify-center items-center h-full">
            <Image
              src="/hero_section_image.webp"
              alt="People collaborating with AI"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section id="story" className="neural-container py-16">
        <div className="relative grid md:grid-cols-2 gap-16 items-stretch">
          {/* Left Story Card */}
          <SlideTowardsCenter delay={0.1}>
            <HoverCard className="rounded-[200px] border-2 border-neural-violet p-12 bg-background flex flex-col justify-center min-h-[280px]">
              <h2 className="neural-heading text-2xl md:text-3xl neural-accent mb-6">
                The story behind The Neural
              </h2>
              <p className="text-[color:var(--foreground)] leading-relaxed">
                We're humans in AI. We mirror the principles of neural networks that enable cognition, 
                interconnectedness, and problem-solving. <br />
                <span className="neural-accent font-semibold">Our DNA is neural. We're neural.</span>
              </p>
            </HoverCard>
          </SlideTowardsCenter>

          {/* Right Story Card */}
          <SlideTowardsCenterRight delay={0.2}>
            <HoverCard className="rounded-[200px] border-2 border-neural-violet p-12 bg-background flex flex-col justify-center min-h-[280px]">
              <h2 className="neural-heading text-2xl md:text-3xl neural-accent mb-6">
                Building human networks in AI
              </h2>
              <p className="text-[color:var(--foreground)] leading-relaxed">
                Become a part of our mission to catalyze AI creation and adoption with a neural layer of 
                human-powered networks for learning, collaboration, and real-time feedback.
              </p>
            </HoverCard>
          </SlideTowardsCenterRight>

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
      <section id="thought" className="neural-container pt-16 pb-2">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SlideInLeft delay={0.2}>
            <div>
              <AnimatedHeading 
                className="neural-heading text-4xl md:text-5xl neural-accent mb-8"
                delay={0.4}
              >
                Thought Leadership Hub
              </AnimatedHeading>
              <SlideUp delay={0.6}>
                <p className="text-lg text-[color:var(--muted)] leading-relaxed mb-8">
                  We bring together an enriching network of inspiring leaders from marquee brands who've achieved big things in AI. They share real-world experiences to help shape thoughts, and accelerate progress for those looking to adopt AI and innovate with AI. There's knowledge sharing through honest conversations and hard-won insights here that you won't find anywhere else.
                </p>
              </SlideUp>
              <BounceIn delay={0.3}>
                <p className="text-lg text-[color:var(--foreground)] font-medium">
                  Want to share your real experiences in AI? Write to us.
                </p>
              </BounceIn>
            </div>
          </SlideInLeft>
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
      <section id="community" className="neural-container pt-0 pb-12">
        <div className="relative flex items-center justify-center">
          <AnimatedNeuralSVG />
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="neural-container py-16">
        <SlideUp delay={0.1}>
          <h2 className="neural-heading text-4xl md:text-5xl neural-accent text-center mb-16">
            Founding Members
          </h2>
        </SlideUp>
        
        <StaggerChildren staggerDelay={0.1} childDelay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Ranjith */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <Image
                    src="/person 1.png"
                    alt="Ranjith"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className="text-2xl font-bold neural-accent mb-2">Ranjith</h3>
                <p className="text-[color:var(--muted)] text-sm leading-relaxed">
                  Digital Data AI,<br />
                  Leadership, Enterprises
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Swathi */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <Image
                    src="/person 2.png"
                    alt="Swathi"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className="text-2xl font-bold neural-accent mb-2">Swathi</h3>
                <p className="text-[color:var(--muted)] text-sm leading-relaxed">
                  Ventures,<br />
                  Startups, Growth
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Samra */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <Image
                    src="/person 3.png"
                    alt="Samra"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className="text-2xl font-bold neural-accent mb-2">Samra</h3>
                <p className="text-[color:var(--muted)] text-sm leading-relaxed">
                  Branding, Marketing,<br />
                  Startups, Consultancy
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Dhanush */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <Image
                    src="/person 4.png"
                    alt="Dhanush"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className="text-2xl font-bold neural-accent mb-2">Dhanush</h3>
                <p className="text-[color:var(--muted)] text-sm leading-relaxed">
                  Ventures, Deep Tech,<br />
                  SaaS, Collaborations
                </p>
              </HoverCard>
            </StaggerChild>
          </div>
        </StaggerChildren>
      </section>

      {/* Upcoming Activities Section */}
      <section id="activities" className="neural-container py-16">
        <SlideUp delay={0.2}>
          <h2 className="neural-heading text-4xl md:text-5xl neural-accent mb-16">
            Activities we do
          </h2>
        </SlideUp>
        
        <StaggerChildren staggerDelay={0.1} childDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* In-person networking events */}
            <StaggerChild direction="left">
              <HoverCard className="rounded-[200px] border-2 border-neural-violet p-8 bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/inperson.png"
                    alt="In-person events icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className="text-xl font-bold neural-accent">In-person networking events</h3>
                </div>
                <p className="text-[color:var(--foreground)] leading-relaxed">
                  Connect, interact, and spark collaborations in our lively AI community gatherings, where faces become friends and ideas flourish.
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Online events */}
            <StaggerChild direction="right">
              <HoverCard className="rounded-[200px] border-2 border-neural-violet p-8 bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/online events.png"
                    alt="Online events icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className="text-xl font-bold neural-accent">Online events</h3>
                </div>
                <p className="text-[color:var(--foreground)] leading-relaxed">
                  Embark on an AI adventure from the comfort of your screen with our dynamic online sessions and webinars.
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Podcasts */}
            <StaggerChild direction="left">
              <HoverCard className="rounded-[200px] border-2 border-neural-violet p-8 bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/podcasts.png"
                    alt="Podcasts icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className="text-xl font-bold neural-accent">Podcasts</h3>
                </div>
                <p className="text-[color:var(--foreground)] leading-relaxed">
                  Plug in and explore the fascinating world of AI through our inviting podcast series, where experts share insights and stories.
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Multi-track conferences */}
            <StaggerChild direction="right">
              <HoverCard className="rounded-[200px] border-2 border-neural-violet p-8 bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/multitrack.png"
                    alt="Multi-track conferences icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className="text-xl font-bold neural-accent">Multi-track conferences</h3>
                </div>
                <p className="text-[color:var(--foreground)] leading-relaxed">
                  Journey through the landscapes of AI innovation and inspiration at our bustling multi-track conferences and summits.
                </p>
              </HoverCard>
            </StaggerChild>
          </div>
        </StaggerChildren>
      </section>

      {/* Newsletter/CTA Section with Purple Waves */}
      <section className="relative overflow-hidden flex items-center justify-center" style={{height: '120vh'}}>
        {/* Content */}
        <div className="relative z-5 text-center max-w-lg mx-auto px-8">
          <StaggerChildren staggerDelay={0.1} childDelay={0.05}>
            <SlideUp delay={0.1}>
              <h2 className="neural-heading text-4xl md:text-5xl neural-accent mb-4">
                TheNeural
              </h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-xl md:text-2xl neural-accent mb-8">
                Where Humans meet AI
              </p>
            </SlideUp>
            <SlideUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white text-black placeholder-gray-500 border-none outline-none text-lg transition-all duration-300 focus:ring-2 focus:ring-neural-violet focus:ring-opacity-50"
                />
                <AnimatedButton className="px-8 py-3 bg-neural-violet text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">
                  Subscribe
                </AnimatedButton>
              </div>
            </SlideUp>
          </StaggerChildren>
        </div>

        {/* Left Wave - Extended to prevent cutoff */}
        <div className="absolute -left-[29%] top-0 w-[60%] h-full z-0">
          <Image
            src="/wave_purple_left.png"
            alt="Purple wave decoration"
            width={800}
            height={800}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        {/* Right Wave - Extended to prevent cutoff */}
        <div className="absolute -right-[22%] top-0 w-[50%] h-full z-0">
          <Image
            src="/wave_purple_right.png"
            alt="Purple wave decoration"
            width={800}
            height={800}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </section>    
    </div>
  );
}

// Neural SVG Component
function AnimatedNeuralSVG() {
  return (
    <div className="relative w-full">
      <Image
        src="/Who is on TheNeural.svg"
        alt="Who is on TheNeural"
        width={2600}
        height={1488}
        className="w-full h-auto max-w-none origin-center scale-[1.2] md:scale-[1.4] lg:scale-[1.6]"
        priority
      />
    </div>
  );
}
