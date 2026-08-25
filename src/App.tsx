import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Footer } from './components/Footer';
import Contact from './components/Contact';
import Project from './components/Project';
import { Timeline } from './components/Timeline';
import { Achievements } from './components/Achievements';
import { WelcomeIntro } from './components/WelcomeIntro';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll engine
  useSmoothScroll();
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    // Refresh ScrollTrigger when intro completes or fonts finish loading
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(handleRefresh);
    }
    window.addEventListener('load', handleRefresh);

    if (introReady) {
      handleRefresh();
    }

    return () => {
      window.removeEventListener('load', handleRefresh);
    };
  }, [introReady]);

  return (
    <main className="relative min-h-screen w-full select-none bg-[#fafaf9] overflow-x-hidden">
      {/* Cinematic Startup Welcome SVG Intro Screen */}
      <WelcomeIntro onComplete={() => setIntroReady(true)} />

      {/* Background Video with Mouse-Scrub Interaction */}
      <BackgroundVideo />

      {/* Fixed Navbar with smooth anchor navigation */}
      <Navbar />

      {/* Main Hero Section */}
      <Hero ready={introReady} />
    
      {/* Sketchbook Journal Themed About Section */}
      <About />

      {/* Skills Section with Aceternity Interactive Fanned Cards */}
      <Skills />

      {/* 3D Bookshelf Project Library */}
      <Project />

      {/* Schooling & Internship Timeline in Sketch Style */}
      <Timeline />

      {/* Achievements, Coding Stats & Certifications Sticky Notes Pinboard */}
      <Achievements />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section with Crowd Canvas & Animated Text Reveal */}
      <Footer />
    </main>
  );
};

export default App;
