import { useState } from 'react';

export default function Footer({ lenisRef }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const scrollTo = (href) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -64 });
    }
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage("You're on the list. We'll keep you posted.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Try again.');
    }
  };

  const linkColumns = [
    {
      header: 'Product',
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Security', href: '#security' },
        { label: 'Supported Wallets', href: '#' },
        { label: 'Documentation', href: '#' },
      ],
    },
    {
      header: 'Company',
      links: [
        { label: 'About', href: '#proof-points' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      header: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ];

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--navy-900)',
        padding: '64px var(--page-margin) 32px',
      }}
    >
      <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
        {/* Row 1 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 48,
          }}
        >
          {/* Left - Logo */}
          <div>
            <div className="flex items-center" style={{ marginBottom: 12, gap: 10 }}>
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
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#FFFFFF',
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
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.35)',
              }}
            >
              &copy; 2025 OneKYC Protocol
            </div>
          </div>

          {/* Center - Link columns */}
          {linkColumns.map((col) => (
            <div key={col.header}>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 16,
                }}
              >
                {col.header}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollTo(link.href);
                      }
                    }}
                    className="no-underline"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: 'rgba(255, 255, 255, 0.55)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.target).style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      (e.target).style.color = 'rgba(255, 255, 255, 0.55)';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Right - Newsletter */}
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}
            >
              Stay Updated
            </div>

            {status === 'success' ? (
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13,
                  color: 'var(--amber-400)',
                  padding: '12px 0',
                }}
              >
                ✓ {message}
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus('idle');
                      setMessage('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: status === 'error'
                        ? '1px solid rgba(255, 100, 100, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      padding: '10px 16px',
                      borderRadius: 'var(--border-radius-sm)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={status === 'loading'}
                    style={{
                      backgroundColor: 'var(--amber-600)',
                      border: 'none',
                      color: '#FFFFFF',
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      opacity: status === 'loading' ? 0.6 : 1,
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading')
                        (e.currentTarget).style.backgroundColor = 'var(--amber-500)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget).style.backgroundColor = 'var(--amber-600)';
                    }}
                    aria-label="Subscribe"
                  >
                    {status === 'loading' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                        </path>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: 'rgba(255, 100, 100, 0.8)',
                    marginTop: 8,
                  }}>
                    {message}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            margin: '40px 0',
          }}
        />

        {/* Row 3 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            Built with zero-knowledge proofs.
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            {/* GitHub */}
            <a href="#" className="no-underline" style={{ color: 'rgba(255, 255, 255, 0.3)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = 'rgba(255, 255, 255, 0.3)'; }}
              aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* X */}
            <a href="#" className="no-underline" style={{ color: 'rgba(255, 255, 255, 0.3)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = 'rgba(255, 255, 255, 0.3)'; }}
              aria-label="X (Twitter)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Discord */}
            <a href="#" className="no-underline" style={{ color: 'rgba(255, 255, 255, 0.3)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = 'rgba(255, 255, 255, 0.3)'; }}
              aria-label="Discord">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
