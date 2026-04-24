import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Zero-Knowledge Proofs',
    desc: 'Mathematically prove your identity without revealing the underlying data.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Regulated Providers Only',
    desc: 'All KYC processing is handled by licensed, regulated identity verification companies.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: 'No Centralized Database',
    desc: "We don't store passports, names, or addresses. Nothing to breach.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    ),
  },
  {
    title: 'Soulbound Credentials',
    desc: 'Your proof is non-transferable and permanently tied to your wallet.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function Security() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
          },
        });
      }
      if (rightRef.current) {
        gsap.from(rightRef.current.children, {
          x: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: rightRef.current,
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
      id="security"
      style={{
        backgroundColor: 'var(--navy-800)',
        padding: 'var(--section-padding-y) var(--page-margin)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 64,
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div ref={leftRef}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              color: 'rgba(247, 244, 238, 0.5)',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}
          >
            SECURITY
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 500,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Built so even we can't see your data
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.65,
              marginTop: 24,
            }}
          >
            OneKYC uses a zero-knowledge architecture. The KYC provider verifies
            your identity and issues a cryptographic proof. We store only your
            wallet address and the proof hash. Your passport, selfie, and
            personal information never touch our servers.
          </p>
        </div>

        {/* Right column - Features */}
        <div
          ref={rightRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(198, 155, 60, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--amber-400)',
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#FFFFFF',
                    margin: 0,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: 1.55,
                    marginTop: 4,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
