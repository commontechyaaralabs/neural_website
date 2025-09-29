"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import useIsMobile from "../src/hooks/useIsMobile";
import { reportMobileIssue, detectMobileIssues } from "../src/utils/mobileReporting";

export default function Home() {
  const { isMobile } = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Mobile issue detection and reporting
  useEffect(() => {
    if (isMobile) {
      const timeoutId = setTimeout(() => {
        const issues = detectMobileIssues();
        if (issues) {
          reportMobileIssue(issues);
        }
      }, 2000); // Wait 2 seconds for layout to settle

      return () => clearTimeout(timeoutId);
    }
  }, [isMobile]);

  // Subscription function
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionStatus('success');
      } else {
        setSubscriptionStatus('error');
        setErrorMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setSubscriptionStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-neural-violet/20">
        <div className={`neural-container ${
          !isClient ? 'py-1 px-2' : (isMobile ? 'py-1 px-2' : 'py-3 px-4')
        }`}>
          {isMobile ? (
            <div className="flex items-center justify-between">
              {/* Navigation */}
              <nav className="neural-nav font-medium flex items-center text-xs space-x-1 flex-1 justify-center">
                <a href="#story" className="neural-nav-link text-xs px-1 py-1">Our Story</a>
                <span className="neural-nav-dot text-xs mx-1">•</span>
                <a href="#thought" className="neural-nav-link text-xs px-1 py-1">Thought</a>
                <span className="neural-nav-dot text-xs mx-1">•</span>
                <a href="#community" className="neural-nav-link text-xs px-1 py-1">Community</a>
                <span className="neural-nav-dot text-xs mx-1">•</span>
                <a href="#activities" className="neural-nav-link text-xs px-1 py-1">Activities</a>
              </nav>
              
              {/* Mobile Menu Button (Optional - for future hamburger menu) */}
              <div className="flex-shrink-0 w-6 h-6">
                {/* Placeholder for future menu button */}
              </div>
            </div>
          ) : (
            /* Desktop Navigation - Right Aligned */
            <div className="flex justify-end items-center">
              <nav className="neural-nav font-medium flex items-center text-base">
                <a href="#story" className="neural-nav-link px-2 py-1">Our Story</a>
                <span className="neural-nav-dot mx-2">•</span>
                <a href="#thought" className="neural-nav-link px-2 py-1">Thought</a>
                <span className="neural-nav-dot mx-2">•</span>
                <a href="#community" className="neural-nav-link px-2 py-1">Community</a>
                <span className="neural-nav-dot mx-2">•</span>
                <a href="#activities" className="neural-nav-link px-2 py-1">Activities</a>
              </nav>
            </div>
          )}
        </div>
      </header>


      {/* Hero Section */}
      <section className={`relative flex items-center ${
        isMobile ? 'min-h-screen py-4' : 'h-screen'
      }`}>
        <div className={`neural-container ${
          isMobile 
            ? 'flex flex-col gap-6 items-center py-4' 
            : 'grid md:grid-cols-[1fr_1.2fr] gap-8 items-center py-14'
        }`}>
          {/* Left Side - Text Content */}
          <div className={`flex flex-col justify-center items-start h-full ${
            isMobile ? 'order-1 w-full' : 'ml-25'
          }`}>
            {/* TheNeural Logo */}
            <div className={`${
              isMobile 
                ? 'relative mb-6 scale-100' 
                : 'absolute top-0 left-50 z-10 scale-80'
            }`}>
              <Image
                src="/TheNeuralwriting and logo.svg"
                alt="The Neural"
                width={isMobile ? 120 : 200}
                height={isMobile ? 30 : 50}
                className="neural-logo"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            
            <AnimatedHeading 
              className={`neural-heading leading-tight neural-accent mb-6 ${
                isMobile 
                  ? 'text-[18px] leading-tight' 
                  : 'text-[24px] sm:text-[28px] md:text-[40px] mt-50'
              }`}
              delay={0.3}
            >
              Where Humans Meet AI
            </AnimatedHeading>
            
            <SlideUp delay={0.6}>
              <p className={`text-[color:var(--muted)] mb-8 ${
                isMobile 
                  ? 'text-sm leading-relaxed max-w-full' 
                  : 'text-base md:text-lg max-w-[54ch]'
              }`}>
                Level up in AI with an exclusive platform empowering a future where AI
                augments human potential. Together, we build the next big things with
                and in AI from India.
              </p>
            </SlideUp>
            
            <BounceIn delay={0.4}>
              <h2 className={`neural-accent font-semibold mb-6 ${
                isMobile ? 'text-base leading-tight' : 'text-xl md:text-2xl'
              }`}>
                Convert your AI Ambition to Action
              </h2>
              <a
                href="https://activate25.theneural.ai/TheNeural"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block bg-neural-violet text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 ${
                  isMobile ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-lg'
                }`}
              >
                Join us Activate-Nov 4,Bangalore
              </a>
            </BounceIn>
          </div>
          
          {/* Right Side - Image */}
          <div className={`flex justify-center items-center h-full overflow-visible ${
            isMobile ? 'order-2 w-full' : ''
          }`}>
            <Image
              src="/hero_section_image.webp"
              alt="People collaborating with AI"
              width={2000}
              height={1333}
              className={`w-full h-auto ${
                isMobile 
                  ? 'scale-100 max-w-sm' 
                  : 'scale-125 mt-50'
              }`}
              priority
            />
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section id="story" className={`neural-container ${
        isMobile ? 'pt-12 pb-8 px-4' : 'pt-90 pb-16 ml-25'
      }`}>
        <div className={`relative grid ${
          isMobile ? 'grid-cols-1 gap-12' : 'md:grid-cols-2 gap-16'
        } items-stretch`}>
          {/* Left Story Card */}
          <SlideTowardsCenter delay={0.1}>
            <HoverCard className={`border-2 border-neural-violet bg-background flex flex-col justify-center ${
              isMobile 
                ? 'rounded-3xl p-6 min-h-[200px]' 
                : 'rounded-[200px] p-12 min-h-[280px]'
            }`}>
              <h2 className={`neural-heading neural-accent mb-6 ${
                isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
              }`}>
                The story behind The Neural
              </h2>
              <p className={`text-[color:var(--foreground)] leading-relaxed ${
                isMobile ? 'text-sm' : ''
              }`}>
                We're humans in AI. We mirror the principles of neural networks that enable cognition, 
                interconnectedness, and problem-solving. <br />
                <span className="neural-accent font-semibold">Our DNA is neural. We're neural.</span>
              </p>
            </HoverCard>
          </SlideTowardsCenter>

          {/* Right Story Card */}
          <SlideTowardsCenterRight delay={0.2}>
            <HoverCard className={`border-2 border-neural-violet bg-background flex flex-col justify-center ${
              isMobile 
                ? 'rounded-3xl p-6 min-h-[200px]' 
                : 'rounded-[200px] p-12 min-h-[280px]'
            }`}>
              <h2 className={`neural-heading neural-accent mb-6 ${
                isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
              }`}>
                Building human networks in AI
              </h2>
              <p className={`text-[color:var(--foreground)] leading-relaxed ${
                isMobile ? 'text-sm' : ''
              }`}>
                Become a part of our mission to catalyze AI creation and adoption with a neural layer of 
                human-powered networks for learning, collaboration, and real-time feedback.
              </p>
            </HoverCard>
          </SlideTowardsCenterRight>

          {/* Center Neural Logo - positioned absolutely */}
          <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${
            isMobile ? 'block' : 'hidden md:block'
          }`}>
            <Image
              src="/TheNeuralsmall logo.svg"
              alt="Neural logo"
              width={isMobile ? 32 : 48}
              height={isMobile ? 32 : 48}
              className="neural-accent"
            />
          </div>
        </div>
      </section>

      {/* Thought Leadership Section */}
      <section id="thought" className={`neural-container ${
        isMobile ? 'pt-8 pb-8 px-4' : 'pt-16 pb-2'
      }`}>
        <div className={`grid ${
          isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-8'
        } items-center ${isMobile ? '' : 'ml-25'}`}>
          <SlideInLeft delay={0.2}>
            <div>
                <AnimatedHeading 
                  className={`neural-heading mb-8 ${
                    isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'
                  }`}
                  delay={0.4}
                >
                  <span style={{ color: '#d8ff6e' }}>
                    Thought<br />
                    Leadership Hub
                  </span>
                </AnimatedHeading>
              <SlideUp delay={0.6}>
                <p className={`text-[color:var(--muted)] leading-relaxed mb-8 ${
                  isMobile ? 'text-sm leading-6' : 'text-lg'
                }`}>
                  We bring together an enriching network of inspiring leaders from marquee brands who've achieved big things in AI. They share real-world experiences to help shape thoughts, and accelerate progress for those looking to adopt AI and innovate with AI. There's knowledge sharing through honest conversations and hard-won insights here that you won't find anywhere else.
                </p>
              </SlideUp>
              <BounceIn delay={0.3}>
                <p className={`text-[color:var(--foreground)] font-medium ${
                  isMobile ? 'text-base' : 'text-lg'
                }`}>
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
      <section id="community" className={`neural-container pt-0 ${
        isMobile ? 'pb-0 px-4' : 'pb-12 ml-25'
      }`}>
        <div className="relative flex items-center justify-center">
          <AnimatedNeuralSVG />
        </div>
      </section>

      {/* Human Neural Network Section */}
      <section className={`neural-container ${
        isMobile ? 'pt-4 pb-16 px-4' : 'py-16 ml-25'
      }`}>
        <SlideUp delay={0.1}>
          <h2 className={`neural-heading neural-accent text-center mb-4 ${
            isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'
          }`}>
            Human Neural Network
          </h2>
          <h3 className={`text-center font-semibold mb-16 ${
            isMobile ? 'text-lg' : 'text-2xl md:text-3xl'
          }`} style={{ color: '#e6f5c2' }}>
            Volunteers and Advisors
          </h3>
        </SlideUp>
        
        <StaggerChildren staggerDelay={0.1} childDelay={0.05}>
          <div className="space-y-8">
            {/* First 3 people in a grid */}
            <div className={`grid gap-8 ${
              isMobile 
                ? 'grid-cols-1' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12'
            }`}>
              {neuralNetworkProfiles.slice(0, 3).map((profile, index) => (
                <StaggerChild key={index} direction="up">
                  <HoverCard className="text-center">
                    <div className={`relative mx-auto mb-8 rounded-full overflow-hidden ${
                      isMobile ? 'w-32 h-32' : 'w-64 h-64'
                    }`}>
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        width={isMobile ? 128 : 256}
                        height={isMobile ? 128 : 256}
                        className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                      />
                    </div>
                    <h3 className={`font-bold neural-accent mb-2 ${
                      isMobile ? 'text-sm' : 'text-2xl'
                    }`}>{profile.name}</h3>
                    <p className={`text-[color:var(--muted)] leading-relaxed mb-6 ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      {profile.designation}
                    </p>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 neural-accent hover:text-neural-green transition-colors duration-300 ${
                        isMobile ? 'text-xs' : 'text-base'
                      }`}
                    >
                      <svg 
                        className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      VIEW PROFILE
                      <svg 
                        className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </HoverCard>
                </StaggerChild>
              ))}
            </div>
            
            {/* Remaining people (4th and 5th) in a row */}
            {neuralNetworkProfiles.length > 3 && (
              <div className={`grid gap-8 ${
                isMobile 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-12'
              }`}>
                {neuralNetworkProfiles.slice(3).map((profile, index) => (
                  <StaggerChild key={index + 3} direction="up">
                    <HoverCard className="text-center">
                      <div className={`relative mx-auto mb-8 rounded-full overflow-hidden ${
                        isMobile ? 'w-32 h-32' : 'w-64 h-64'
                      }`}>
                        {profile.image ? (
                          <Image
                            src={profile.image}
                            alt={profile.name}
                            width={isMobile ? 128 : 256}
                            height={isMobile ? 128 : 256}
                            className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                            <svg 
                              className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} text-gray-400`} 
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className={`font-bold neural-accent mb-2 ${
                        isMobile ? 'text-sm' : 'text-2xl'
                      }`}>{profile.name}</h3>
                      <p className={`text-[color:var(--muted)] leading-relaxed mb-6 ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}>
                        {profile.designation}
                      </p>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 neural-accent hover:text-neural-green transition-colors duration-300 ${
                          isMobile ? 'text-xs' : 'text-base'
                        }`}
                      >
                        <svg 
                          className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        VIEW PROFILE
                        <svg 
                          className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </HoverCard>
                  </StaggerChild>
                ))}
              </div>
            )}
          </div>
        </StaggerChildren>
      </section>

      {/* Meet the Team Section */}
      <section className={`neural-container ${
        isMobile ? 'pt-4 pb-16 px-4' : 'py-16 ml-25'
      }`}>
        <SlideUp delay={0.1}>
          <h2 className={`neural-heading neural-accent text-center mb-16 ${
            isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'
          }`}>
            Founding Members
          </h2>
        </SlideUp>
        
        <StaggerChildren staggerDelay={0.1} childDelay={0.05}>
          <div className={`grid gap-8 ${
            isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-12'
          }`}>
            {/* Ranjith */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className={`relative mx-auto mb-8 rounded-full overflow-hidden ${
                  isMobile ? 'w-32 h-32' : 'w-64 h-64'
                }`}>
                  <Image
                    src="/person 1.png"
                    alt="Ranjith"
                    width={isMobile ? 128 : 256}
                    height={isMobile ? 128 : 256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className={`font-bold neural-accent mb-2 ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}>Ranjith</h3>
                <p className={`text-[color:var(--muted)] leading-relaxed ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  Digital Data AI,<br />
                  Leadership, Enterprises
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Swathi */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className={`relative mx-auto mb-8 rounded-full overflow-hidden ${
                  isMobile ? 'w-32 h-32' : 'w-64 h-64'
                }`}>
                  <Image
                    src="/person 2.png"
                    alt="Swathi"
                    width={isMobile ? 128 : 256}
                    height={isMobile ? 128 : 256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className={`font-bold neural-accent mb-2 ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}>Swathi</h3>
                <p className={`text-[color:var(--muted)] leading-relaxed ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  Ventures,<br />
                  Startups, Growth
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Samra */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className={`relative mx-auto mb-8 rounded-full overflow-hidden ${
                  isMobile ? 'w-32 h-32' : 'w-64 h-64'
                }`}>
                  <Image
                    src="/person 3.png"
                    alt="Samra"
                    width={isMobile ? 128 : 256}
                    height={isMobile ? 128 : 256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className={`font-bold neural-accent mb-2 ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}>Samra</h3>
                <p className={`text-[color:var(--muted)] leading-relaxed ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  Branding, Marketing,<br />
                  Startups, Consultancy
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Dhanush */}
            <StaggerChild direction="up">
              <HoverCard className="text-center">
                <div className={`relative mx-auto mb-8 rounded-full overflow-hidden ${
                  isMobile ? 'w-32 h-32' : 'w-64 h-64'
                }`}>
                  <Image
                    src="/person 4.png"
                    alt="Dhanush"
                    width={isMobile ? 128 : 256}
                    height={isMobile ? 128 : 256}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-black/50"
                  />
                </div>
                <h3 className={`font-bold neural-accent mb-2 ${
                  isMobile ? 'text-xl' : 'text-2xl'
                }`}>Dhanush</h3>
                <p className={`text-[color:var(--muted)] leading-relaxed ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  Ventures, Deep Tech,<br />
                  SaaS, Collaborations
                </p>
              </HoverCard>
            </StaggerChild>
          </div>
        </StaggerChildren>
      </section>

      {/* Upcoming Activities Section */}
      <section id="activities" className={`neural-container ${
        isMobile ? 'py-8 px-4' : 'py-16 ml-25'
      }`}>
        <SlideUp delay={0.2}>
          <h2 className={`neural-heading neural-accent mb-16 ${
            isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'
          }`}>
            Activities we do
          </h2>
        </SlideUp>
        
        <StaggerChildren staggerDelay={0.1} childDelay={0.1}>
          <div className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'
          }`}>
            {/* In-person networking events */}
            <StaggerChild direction="left">
              <HoverCard className={`border-2 border-neural-violet bg-background ${
                isMobile ? 'rounded-3xl p-6' : 'rounded-[200px] p-8'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/inperson.png"
                    alt="In-person events icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className={`font-bold neural-accent ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>In-person networking events</h3>
                </div>
                <p className={`text-[color:var(--foreground)] leading-relaxed ${
                  isMobile ? 'text-sm' : ''
                }`}>
                  Connect, interact, and spark collaborations in our lively AI community gatherings, where faces become friends and ideas flourish.
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Online events */}
            <StaggerChild direction="right">
              <HoverCard className={`border-2 border-neural-violet bg-background ${
                isMobile ? 'rounded-3xl p-6' : 'rounded-[200px] p-8'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/online events.png"
                    alt="Online events icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className={`font-bold neural-accent ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>Online events</h3>
                </div>
                <p className={`text-[color:var(--foreground)] leading-relaxed ${
                  isMobile ? 'text-sm' : ''
                }`}>
                  Embark on an AI adventure from the comfort of your screen with our dynamic online sessions and webinars.
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Podcasts */}
            <StaggerChild direction="left">
              <HoverCard className={`border-2 border-neural-violet bg-background ${
                isMobile ? 'rounded-3xl p-6' : 'rounded-[200px] p-8'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/podcasts.png"
                    alt="Podcasts icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className={`font-bold neural-accent ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>Podcasts</h3>
                </div>
                <p className={`text-[color:var(--foreground)] leading-relaxed ${
                  isMobile ? 'text-sm' : ''
                }`}>
                  Plug in and explore the fascinating world of AI through our inviting podcast series, where experts share insights and stories.
                </p>
              </HoverCard>
            </StaggerChild>

            {/* Multi-track conferences */}
            <StaggerChild direction="right">
              <HoverCard className={`border-2 border-neural-violet bg-background ${
                isMobile ? 'rounded-3xl p-6' : 'rounded-[200px] p-8'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/multitrack.png"
                    alt="Multi-track conferences icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h3 className={`font-bold neural-accent ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>Multi-track conferences</h3>
                </div>
                <p className={`text-[color:var(--foreground)] leading-relaxed ${
                  isMobile ? 'text-sm' : ''
                }`}>
                  Journey through the landscapes of AI innovation and inspiration at our bustling multi-track conferences and summits.
                </p>
              </HoverCard>
            </StaggerChild>
          </div>
        </StaggerChildren>
      </section>

      {/* Newsletter/CTA Section with Purple Waves */}
      <section className={`relative overflow-hidden flex items-center justify-center ${
        isMobile ? 'min-h-[80vh]' : 'h-[120vh]'
      }`}>
        {/* Content */}
        <div className="relative z-5 text-center max-w-lg mx-auto px-8">
          <StaggerChildren staggerDelay={0.1} childDelay={0.05}>
            <SlideUp delay={0.1}>
              <h2 className={`neural-heading neural-accent mb-4 ${
                isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'
              }`}>
                TheNeural
              </h2>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className={`neural-accent mb-8 ${
                isMobile ? 'text-lg' : 'text-xl md:text-2xl'
              }`}>
                Where Humans meet AI
              </p>
            </SlideUp>
            <SlideUp delay={0.3}>
              <form onSubmit={handleSubscribe} className="w-full">
                <div className={`flex items-center justify-center gap-2 mx-auto ${
                  isMobile 
                    ? 'flex-col max-w-xs' 
                    : 'flex-col sm:flex-row max-w-sm'
                }`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubscribing}
                    className={`flex-1 rounded-full bg-white text-black placeholder-gray-500 border-none outline-none transition-all duration-300 focus:ring-2 focus:ring-neural-violet focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isMobile 
                        ? 'px-4 py-2 text-base w-full' 
                        : 'px-6 py-3 text-lg'
                    }`}
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubscribing}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(184, 107, 221, 0.4)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-neural-violet text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isMobile 
                        ? 'px-6 py-2 text-base w-full' 
                        : 'px-8 py-3'
                    }`}
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </motion.button>
                </div>
                
                {/* Status Messages */}
                {subscriptionStatus === 'success' && (
                  <div className="mt-4 text-center">
                    <p className="text-neural-green font-medium">
                      Welcome to TheNeural community.
                    </p>
                  </div>
                )}
                
                {subscriptionStatus === 'error' && (
                  <div className="mt-4 text-center">
                    <p className="text-neural-green font-medium">
                      {errorMessage}
                    </p>
                  </div>
                )}
              </form>
            </SlideUp>
          </StaggerChildren>
        </div>

        {/* Left Wave - Extended to prevent cutoff */}
        <div className={`absolute top-0 h-full z-0 ${
          isMobile ? 'hidden' : '-left-[29%] w-[60%]'
        }`}>
          <Image
            src="/wave_purple_left.png"
            alt="Purple wave decoration"
            width={800}
            height={800}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        {/* Right Wave - Extended to prevent cutoff */}
        <div className={`absolute top-0 h-full z-0 ${
          isMobile ? 'hidden' : '-right-[22%] w-[50%]'
        }`}>
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

// Human Neural Network profiles data
const neuralNetworkProfiles = [
  {
    name: "Ramasubramanian Sundararajan",
    designation: "Head, Product R&D at SOLUS.ai",
    image: "/nn1.jpeg",
    linkedin: "https://www.linkedin.com/in/ramasubramanian-sundararajan/"
  },
  {
    name: "Hariharasudhan Ramani",
    designation: "Vice President of Global Sales & GTM at Applied computing",
    image: "/nn2.jpeg",
    linkedin: "https://www.linkedin.com/in/bharanisubramaniam/"
  },
  {
    name: "Venkataraghavan Srinivasan",
    designation: "Language Engineering at Amazon",
    image: "/nn3.jpeg",
    linkedin: "https://www.linkedin.com/in/venkataraghavansrinivasan/"
  },
  {
    name: "Rajesh Chandran",
    designation: "Vice President and Head Product at Tata Communications",
    image: "/nn4.jpg",
    linkedin: "https://www.linkedin.com/in/rchandran/"
  },
  {
    name: "Karthik Sivakumar",
    designation: "Principal Engineer at Cisco Inc",
    image: "/nn5.jpg",
    linkedin: "https://www.linkedin.com/in/kaarthiks/"
  },
];


// Neural SVG Component
function AnimatedNeuralSVG() {
  const { isMobile } = useIsMobile();
  
  return (
    <div className="relative w-full">
      <Image
        src="/Who is on TheNeural.svg"
        alt="Who is on TheNeural"
        width={2600}
        height={1488}
        className={`w-full h-auto max-w-none origin-center ${
          isMobile 
            ? 'scale-[2.0]' 
            : 'scale-[1.2] md:scale-[1.4] lg:scale-[1.6]'
        }`}
        priority
      />
    </div>
  );
}
