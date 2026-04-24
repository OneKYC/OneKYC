import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CipherMatrix from './CipherMatrix';

export default function Hero({ lenisRef }: HeroProps) {
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (labelRef.current) {
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
    }
    if (headlineRef.current) {
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.2);
    }
    if (bodyRef.current) {
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.45);
    }
    if (ctaRef.current) {
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7);
    }
    if (scrollIndicatorRef.current) {
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.5 }, 1.2);
    }

    // Scroll indicator fade
    const onScroll = () => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = window.scrollY > 100 ? '0' : '1';
        scrollIndicatorRef.current.style.transition = 'opacity 0.3s ease';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      tl.kill();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (href) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -64 });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Cipher Matrix Background */}
      <CipherMatrix />

      {/* Dark overlay gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(22, 34, 56, 0.25) 0%, rgba(22, 34, 56, 0.55) 70%, rgba(22, 34, 56, 0.85) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '0 var(--page-margin)',
          maxWidth: 680,
        }}
      >
        {/* Label */}
        <div
          ref={labelRef}
          style={{
            opacity: 0,
            transform: 'translateY(10px)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--amber-400)',
            letterSpacing: '0.1em',
            marginBottom: 24,
          }}
        >
          VERIFIED ONCE. TRUSTED EVERYWHERE.
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(42px, 5.5vw, 76px)',
            fontWeight: 500,
            color: '#FFFFFF',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Your identity,{' '}
          <span style={{ color: 'var(--amber-400)' }}>cryptographically</span>{' '}
          sealed
        </h1>

        {/* Body */}
        <p
          ref={bodyRef}
          style={{
            opacity: 0,
            transform: 'translateY(15px)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.6,
            maxWidth: 540,
            marginTop: 28,
          }}
        >
          Complete KYC once with a regulated provider. Receive a zero-knowledge
          proof in your wallet. Access every platform — without exposing your
          data.
        </p>

        {/* CTA Group */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            transform: 'translateY(10px)',
            marginTop: 40,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#cta');
            }}
            className="no-underline inline-block"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              backgroundColor: 'var(--amber-600)',
              color: '#FFFFFF',
              padding: '14px 32px',
              borderRadius: 'var(--border-radius-sm)',
              transition: 'background-color 0.2s ease-out, transform 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
              const el = e.target;
              el.style.backgroundColor = 'var(--amber-500)';
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 4px 16px rgba(198, 155, 60, 0.25)';
            }}
            onMouseLeave={(e) => {
              const el = e.target;
              el.style.backgroundColor = 'var(--amber-600)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#how-it-works');
            }}
            className="no-underline inline-block"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              padding: '14px 32px',
              borderRadius: 'var(--border-radius-sm)',
              transition: 'all 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
              const el = e.target;
              el.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              const el = e.target;
              el.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Read the Docs
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 1,
            height: 32,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--amber-400)',
              position: 'absolute',
              left: -2.5,
              animation: 'scrollDot 2s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollDot {
            0% { top: -6px; }
            50% { top: 32px; }
            100% { top: -6px; }
          }
        `}</style>
      </div>
    </section>
  );
}
