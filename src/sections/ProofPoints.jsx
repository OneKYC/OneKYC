import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const proofs = [
  {
    metric: '3,200+',
    label: 'Identities Verified',
    desc: 'Users who completed OneKYC and received their cryptographic proof.',
  },
  {
    metric: '99.7%',
    label: 'Verification Uptime',
    desc: 'Enterprise-grade infrastructure with redundant KYC provider failover.',
  },
  {
    metric: '< 90s',
    label: 'Average Verification Time',
    desc: 'From wallet connection to cryptographic proof issuance.',
  },
  {
    metric: '$0',
    label: 'Cost to Users',
    desc: 'OneKYC is free for individuals. Platforms pay per verification check.',
  },
  {
    metric: '0',
    label: 'Data Breaches',
    desc: 'Zero personal data stored means zero data to breach. By design.',
  },
  {
    metric: '12',
    label: 'Supported Wallets',
    desc: 'MetaMask, WalletConnect, Coinbase Wallet, and more.',
  },
];

export default function ProofPoints() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proof-points"
      style={{
        backgroundColor: 'var(--warm-ivory)',
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
          PROOF POINTS
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
          Built by the team that scaled privacy
        </h2>

        {/* Proof grid */}
        <div
          ref={gridRef}
          style={{
            marginTop: 64,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 32,
          }}
        >
          {proofs.map((proof) => (
            <div
              key={proof.label}
              style={{
                backgroundColor: 'var(--warm-white)',
                border: '1px solid var(--navy-stroke)',
                borderRadius: 'var(--border-radius-md)',
                padding: '40px 32px',
                textAlign: 'center',
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
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 500,
                  color: 'var(--amber-600)',
                }}
              >
                {proof.metric}
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--navy-950)',
                  marginTop: 12,
                }}
              >
                {proof.label}
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: 'var(--navy-muted)',
                  lineHeight: 1.55,
                  marginTop: 8,
                }}
              >
                {proof.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
