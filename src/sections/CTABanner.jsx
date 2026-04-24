import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        backgroundColor: 'var(--amber-600)',
        padding: '80px var(--page-margin)',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: 700,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 500,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: 0,
          }}
        >
          Verify once. Use everywhere.
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.6,
            marginTop: 16,
          }}
        >
          Join 3,200+ users who've replaced fourteen KYC flows with one.
        </p>

        <a
          href="#"
          className="no-underline inline-block"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            backgroundColor: '#FFFFFF',
            color: 'var(--amber-600)',
            padding: '14px 36px',
            borderRadius: 'var(--border-radius-sm)',
            marginTop: 32,
            transition: 'background-color 0.2s ease-out, transform 0.2s ease-out',
          }}
          onMouseEnter={(e) => {
            const el = e.target;
            el.style.backgroundColor = 'var(--warm-ivory)';
            el.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            const el = e.target;
            el.style.backgroundColor = '#FFFFFF';
            el.style.transform = 'scale(1)';
          }}
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
