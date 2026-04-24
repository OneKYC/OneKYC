import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation.jsx';
import Hero from './sections/Hero.jsx';
import Problem from './sections/Problem.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import Security from './sections/Security.jsx';
import ProofPoints from './sections/ProofPoints.jsx';
import CTABanner from './sections/CTABanner.jsx';
import Footer from './sections/Footer.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div>
      <Navigation lenisRef={lenisRef} />
      <Hero lenisRef={lenisRef} />
      <Problem />
      <HowItWorks />
      <Security />
      <ProofPoints />
      <CTABanner />
      <Footer lenisRef={lenisRef} />
    </div>
  );
}
