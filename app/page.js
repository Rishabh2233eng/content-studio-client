import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: '#FFFDF7', minHeight: '100vh', fontFamily: 'var(--font-body)', color: '#2C1810' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: '1px solid #E8DFD0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: '#C17B3B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-4deg)' }}>
            <span style={{ fontSize: '13px' }}>✦</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', color: '#2C1810', fontWeight: '600', fontSize: '17px' }}>ContentStudio</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/login" style={{ color: '#8B7355', fontSize: '14px', padding: '8px 16px', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/signup" style={{ color: 'white', fontSize: '14px', padding: '8px 18px', background: '#2C1810', borderRadius: '99px', textDecoration: 'none', fontWeight: '500' }}>Start free</Link>
        </div>
      </nav>

      {/* Hero — asymmetric, off-grid */}
      <section style={{ padding: '90px 48px 60px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '40px', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#C17B3B', fontSize: '13px', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '18px' }}>A side project that grew up</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '54px', fontWeight: '600', lineHeight: '1.08', marginBottom: '24px', letterSpacing: '-1px' }}>
            Write five things<br/>by writing <span style={{ fontStyle: 'italic', color: '#C17B3B' }}>one</span>.
          </h1>
          <p style={{ color: '#5C4A35', fontSize: '17px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '460px' }}>
            Give it a topic. Get a blog post, a LinkedIn post, a Twitter thread, a YouTube script, and a newsletter — all at once, all in your tone.
          </p>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <Link href="/signup" style={{ background: '#2C1810', color: 'white', padding: '15px 30px', borderRadius: '99px', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>
              Try it free
            </Link>
            <span style={{ color: '#B5A088', fontSize: '13px' }}>5 free generations, no card needed</span>
          </div>
        </div>
        <div style={{ background: '#F0E6D3', borderRadius: '20px', padding: '28px', transform: 'rotate(2deg)', border: '1px solid #DCC9A8' }}>
          <div style={{ background: '#FFFDF7', borderRadius: '14px', padding: '20px', transform: 'rotate(-2deg)', boxShadow: '0 8px 24px rgba(44,24,16,0.08)' }}>
            <p style={{ fontSize: '11px', color: '#B5A088', marginBottom: '10px' }}>Topic</p>
            <p style={{ fontSize: '14px', color: '#2C1810', marginBottom: '18px', fontWeight: '500' }}>"Why I built ContentStudio"</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['📝 Blog post','💼 LinkedIn post','🐦 Twitter thread','🎥 YouTube script','📧 Newsletter'].map((f,i) => (
                <div key={i} style={{ background: '#F5F0E8', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#5C4A35' }}>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Origin story — the honest bit */}
      <section style={{ padding: '50px 48px', maxWidth: '760px', margin: '0 auto', borderTop: '1px solid #E8DFD0', borderBottom: '1px solid #E8DFD0' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic', color: '#5C4A35', lineHeight: '1.6', textAlign: 'center' }}>
          "I'm a final-year CSE student. I kept rewriting the same idea five different ways for five different platforms — so I built something that does it for me. Figured other people are stuck doing the same thing."
        </p>
        <p style={{ textAlign: 'center', color: '#B5A088', fontSize: '13px', marginTop: '16px' }}>— Rishabh, builder of ContentStudio</p>
      </section>

      {/* Features — staggered, not a perfect grid */}
      <section style={{ padding: '70px 48px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: '600', marginBottom: '40px', maxWidth: '500px' }}>
          A few things it does well
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '⚡', title: 'Five formats, one click', desc: 'Blog, LinkedIn, Twitter, YouTube, email — generated together in under 20 seconds.', offset: 0 },
            { icon: '🔄', title: 'Never times out', desc: 'Jobs run in a background queue, so heavy generations never freeze the page.', offset: 24 },
            { icon: '📊', title: 'Tracks what you make', desc: 'A simple analytics view of what you have generated and when.', offset: 0 },
          ].map((f,i) => (
            <div key={i} style={{ marginTop: f.offset + 'px' }}>
              <div style={{ fontSize: '26px', marginBottom: '14px' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', color: '#2C1810', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ color: '#8B7355', fontSize: '13px', lineHeight: '1.7' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing — kept honest, simple */}
      <section id="pricing" style={{ padding: '60px 48px 90px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: '600', marginBottom: '8px', textAlign: 'center' }}>Pricing</h2>
        <p style={{ textAlign: 'center', color: '#8B7355', fontSize: '15px', marginBottom: '40px' }}>Start free. No card required.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { name: 'Free', price: '₹0', desc: 'Try it out', features: ['5 credits/month', 'All 5 formats', 'History + basic analytics'] },
            { name: 'Pro', price: '₹999', desc: 'For regular creators', features: ['100 credits/month', 'All 5 formats', 'Full analytics', 'Priority support'], popular: true },
            { name: 'Agency', price: '₹2,999', desc: 'For teams', features: ['Unlimited credits', 'Team access', 'API access'] },
          ].map((p,i) => (
            <div key={i} style={{ background: p.popular ? '#FDF6EE' : '#FFFDF7', border: p.popular ? '2px solid #C17B3B' : '1px solid #E8DFD0', borderRadius: '16px', padding: '26px' }}>
              <div style={{ color: '#8B7355', fontSize: '13px', marginBottom: '6px' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '600', marginBottom: '4px' }}>{p.price}<span style={{ fontSize: '13px', color: '#B5A088', fontFamily: 'var(--font-body)' }}>/mo</span></div>
              <div style={{ color: '#B5A088', fontSize: '12px', marginBottom: '18px' }}>{p.desc}</div>
              <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                {p.features.map((f,j) => <li key={j} style={{ color: '#5C4A35', fontSize: '13px', padding: '4px 0' }}>✓ {f}</li>)}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: '99px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', background: p.popular ? '#C17B3B' : '#F0E6D3', color: p.popular ? 'white' : '#C17B3B' }}>
                {p.name === 'Free' ? 'Get started' : 'Choose ' + p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '24px 48px', borderTop: '1px solid #E8DFD0', display: 'flex', justifyContent: 'space-between', color: '#B5A088', fontSize: '13px' }}>
        <span>ContentStudio — built by a student, for anyone tired of writing the same thing five times</span>
        <div style={{ display: 'flex', gap: '18px' }}>
          <Link href="/privacy" style={{ color: '#B5A088', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#B5A088', textDecoration: 'none' }}>Terms</Link>
        </div>
      </footer>
    </main>
  );
}