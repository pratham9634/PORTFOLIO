import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with luxury Awwwards-tier fluid momentum (Lerp physics)
    const lenis = new Lenis({
      lerp: 0.085, // Silky linear interpolation damping for seamless momentum
      wheelMultiplier: 0.95, // Softens mechanical mouse wheel steps
      touchMultiplier: 1.0, // Preserves natural responsive touch on mobile
      smoothWheel: true,
      syncTouch: false, // Ensures mobile devices keep native fluid gesture response
      autoResize: true,
      prevent: (node) => node.classList?.contains('lenis-prevent') || false,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Intercept internal hash links (e.g. #projects, #about, #skills, #contact) for smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -10,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;
