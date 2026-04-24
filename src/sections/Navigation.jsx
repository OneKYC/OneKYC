import { useEffect, useRef, useState } from 'react';

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Security', href: '#security' },
    { label: 'About', href: '#proof-points' },
    { label: 'Contact', href: '#footer' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -64 });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 64,
          padding: '0 var(--page-margin)',
          backgroundColor: scrolled ? 'rgba(247, 244, 238, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (lenisRef.current) lenisRef.current.scrollTo(0);
            }}
            className="flex items-center no-underline"
            style={{ gap: 10 }}
          >
            {/* Amber badge mark */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              backgroundColor: 'var(--amber-600)',
              borderRadius: 8,
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: '#0d0d0d',
                lineHeight: 1,
              }}>1</span>
            </span>
            {/* Wordmark */}
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: scrolled ? 'var(--navy-900)' : '#FFFFFF',
                transition: 'color 0.3s ease',
                letterSpacing: '-0.3px',
              }}>One</span>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--amber-600)',
                letterSpacing: '-0.3px',
              }}>KYC</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="relative no-underline group"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: scrolled ? 'var(--navy-950)' : '#FFFFFF',
                  transition: 'color 0.3s ease',
                  letterSpacing: 0,
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-250"
                  style={{
                    backgroundColor: 'var(--amber-600)',
                    transition: 'transform 0.25s ease-out',
                  }}
                />
              </a>
            ))}
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#cta');
              }}
              className="no-underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                backgroundColor: 'var(--amber-600)',
                color: '#FFFFFF',
                padding: '10px 24px',
                borderRadius: 'var(--border-radius-sm)',
                transition: 'background-color 0.2s ease-out, transform 0.2s ease-out',
              }}
              onMouseEnter={(e) => {
                (e.target).style.backgroundColor = 'var(--amber-500)';
                (e.target).style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                (e.target).style.backgroundColor = 'var(--amber-600)';
                (e.target).style.transform = 'scale(1)';
              }}
            >
              Launch App
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            style={{ gap: 6, width: 32, height: 32 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: 24,
                height: 2,
                backgroundColor: scrolled ? 'var(--navy-950)' : '#FFFFFF',
                transition: 'all 0.3s ease, background-color 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              style={{
                width: 24,
                height: 2,
                backgroundColor: scrolled ? 'var(--navy-950)' : '#FFFFFF',
                transition: 'all 0.3s ease, background-color 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{
            backgroundColor: 'var(--navy-900)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="no-underline block"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 500,
                color: '#FFFFFF',
                padding: '16px 0',
                opacity: 0,
                animation: `slideUp 0.5s ease ${i * 0.1}s forwards`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#cta');
            }}
            className="no-underline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              backgroundColor: 'var(--amber-600)',
              color: '#FFFFFF',
              padding: '14px 36px',
              borderRadius: 'var(--border-radius-sm)',
              marginTop: 32,
              opacity: 0,
              animation: `slideUp 0.5s ease ${navLinks.length * 0.1}s forwards`,
            }}
          >
            Launch App
          </a>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
