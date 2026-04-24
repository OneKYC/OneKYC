import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const imgRef = useRef(null);

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
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
          },
        });
      }

      // Stat counters
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((el) => {
        const target = el.getAttribute('data-target');
        if (target) {
          const numTarget = parseFloat(target);
          gsap.from(el, {
            textContent: 0,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: numTarget < 10 ? 0.1 : 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            onUpdate: function () {
              const val = parseFloat((el).textContent || '0');
              if (target.includes('.')) {
                (el).textContent = val.toFixed(1) + (target.includes('B') ? 'B' : target.includes('×') ? '×' : '+');
              } else {
                (el).textContent = Math.round(val) + (target.includes('+') ? '+' : '×');
              }
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{
        backgroundColor: 'var(--warm-ivory)',
        padding: 'var(--section-padding-y) var(--page-margin)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div ref={leftRef}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--navy-muted)',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}
          >
            THE PROBLEM
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 500,
              color: 'var(--navy-900)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            <span style={{ color: 'var(--amber-600)' }}>Fourteen</span> times.
            Fourteen copies of your passport.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: 'var(--navy-950)',
              lineHeight: 1.65,
              marginTop: 24,
            }}
          >
            The average crypto user repeats KYC across 14 platforms. Each
            stores your passport, selfie, and personal data. Each is a potential
            breach. In 2024, over $2.3 billion was lost to identity fraud — much
            of it from centralized KYC databases getting compromised.
          </p>

          {/* Stat row */}
          <div
            style={{
              marginTop: 48,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 48,
            }}
          >
            <div>
              <div
                className="stat-number"
                data-target="14×"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: 'var(--amber-600)',
                }}
              >
                14×
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: 'var(--navy-muted)',
                  marginTop: 4,
                }}
              >
                Average KYC repetitions
              </div>
            </div>
            <div>
              <div
                className="stat-number"
                data-target="2.3B"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: 'var(--amber-600)',
                }}
              >
                $2.3B
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: 'var(--navy-muted)',
                  marginTop: 4,
                }}
              >
                Lost to identity fraud
              </div>
            </div>
            <div>
              <div
                className="stat-number"
                data-target="40+"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: 'var(--amber-600)',
                }}
              >
                40+
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: 'var(--navy-muted)',
                  marginTop: 4,
                }}
              >
                Major breaches in 2024
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Image */}
        <div ref={imgRef}>
          <img
            src="/problem-fragment.jpg"
            alt="Abstract visualization of scattered identity documents"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 'var(--border-radius-md)',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  );
}
