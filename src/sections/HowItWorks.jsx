import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Connect Wallet',
    desc: 'Link your existing crypto wallet to OneKYC in one click.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 11h.01" />
        <path d="M2 11V7a2 2 0 012-2h16" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Verify Identity',
    desc: 'Upload documents directly to a regulated KYC provider. We never see them.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Receive Proof',
    desc: 'A cryptographic stamp is issued to your wallet soulbound credential.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Stay Private',
    desc: 'Your documents remain with the regulated provider. Only the proof lives on-chain.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Access Everything',
    desc: 'Present your proof to any platform. Verified instantly, data never shared.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        backgroundColor: 'var(--warm-sand)',
        padding: 'var(--section-padding-y) var(--page-margin)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
        {/* Label */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--navy-muted)',
            letterSpacing: '0.08em',
            textAlign: 'center',
          }}
        >
          HOW IT WORKS
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 500,
            color: 'var(--navy-900)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            textAlign: 'center',
            margin: '16px 0 0',
          }}
        >
          Five steps. Zero friction.
        </h2>

        {/* Step cards */}
        <div
          ref={cardsRef}
          style={{
            marginTop: 64,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 24,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                backgroundColor: 'var(--warm-white)',
                border: '1px solid var(--navy-stroke)',
                borderRadius: 'var(--border-radius-md)',
                padding: '32px 24px',
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 8px 32px rgba(27, 42, 74, 0.08)';
                el.style.borderColor = 'rgba(198, 155, 60, 0.3)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                el.style.borderColor = 'var(--navy-stroke)';
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--amber-600)',
                  letterSpacing: '0.06em',
                }}
              >
                STEP {step.num}
              </div>

              <div style={{ marginTop: 20, color: 'var(--navy-900)' }}>
                {step.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  color: 'var(--navy-900)',
                  marginTop: 20,
                  marginBottom: 0,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: 'var(--navy-muted)',
                  lineHeight: 1.55,
                  marginTop: 8,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
