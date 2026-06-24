'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 48px)', maxWidth: '620px', background: '#1E0F08', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', zIndex: 9999, boxShadow: '0 8px 32px rgba(30,15,8,0.3)' }}>
      <p style={{ color: '#D4C4A8', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
        We use essential cookies to keep you logged in. No tracking or advertising cookies.{' '}
        <a href="/privacy" style={{ color: '#A0622A', textDecoration: 'underline' }}>Learn more</a>
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button onClick={decline}
          style={{ background: 'transparent', border: '1px solid #4A3728', color: '#9A8878', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Decline
        </button>
        <button onClick={accept}
          style={{ background: '#A0622A', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Accept
        </button>
      </div>
    </div>
  );
}