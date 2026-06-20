import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: '#FFFDF7', minHeight: '100vh', fontFamily: 'var(--font-body)', color: '#2C1810' }}>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '26px', height: '26px', background: '#2C1810', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: '#F0E6D3' }}>✦</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '16px' }}>ContentStudio</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/login" style={{ color: '#5C4A35', fontSize: '14px', padding: '9px 18px', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/signup" style={{ color: '#FFFDF7', fontSize: '14px', padding: '9px 20px', background: '#2C1810', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>Get started</Link>
        </div>
      </nav>

      {/* Hero — Linear-style: precise, confident, lots of air */}
      <section style={{ padding: '100px 48px 80px', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#F0E6D3', color: '#8B5E3C', fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '99px', marginBottom: '28px' }}>
          Built solo by a final-year CS student
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '50px', fontWeight: '600', lineHeight: '1.1', marginBottom: '22px', letterSpacing: '-1.2px' }}>
          One topic.<br/>Five pieces of content.
        </h1>
        <p style={{ color: '#5C4A35', fontSize: '17px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
          Blog post, LinkedIn post, Twitter thread, YouTube script, and email newsletter — generated together, in your tone, in under 20 seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '14px' }}>
          <Link href="/signup" style={{ background: '#2C1810', color: '#FFFDF7', padding: '14px 30px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>
            Try it free →
          </Link>
        </div>
        <p style={{ color: '#B5A088', fontSize: '13px' }}>5 free generations · no card required</p>
      </section>

      {/* Product preview — Stripe-style soft card */}
      <section style={{ maxWidth: '900px', margin: '0 auto 90px', padding: '0 48px' }}>
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '20px', padding: '8px', boxShadow: '0 20px 60px rgba(44,24,16,0.08)' }}>
          <div style={{ background: '#FAF7F2', borderRadius: '14px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#B5A088', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Your topic</p>
              <p style={{ fontSize: '15px', color: '#2C1810', fontWeight: '500', marginBottom: '24px' }}>"Why side projects matter more than internships"</p>
              <p style={{ fontSize: '11px', color: '#B5A088', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Becomes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['📝 Blog post — 480 words','💼 LinkedIn post','🐦 Twitter thread — 6 tweets','🎥 YouTube script','📧 Email newsletter'].map((f,i) => (
                  <div key={i} style={{ fontSize: '12px', color: '#8B7355' }}>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ background: '#FFFDF7', borderRadius: '10px', border: '1px solid #E8DFD0', padding: '20px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Why Side Projects Matter More Than Internships</p>
              <p style={{ fontSize: '12px', color: '#8B7355', lineHeight: '1.7' }}>
                Internships teach you to follow a process someone else designed. Side projects teach you to design the process. The gap between knowing a stack and shipping with it only closes one way...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features — Notion-style: warm, simple, friendly */}
      <section style={{ padding: '0 48px 90px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '600', textAlign: 'center', marginBottom: '50px' }}>
          What it actually does
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {[
            { icon: '⚡', title: 'Generates 5 formats at once', desc: 'Not one at a time — all five, in parallel, while you wait under 20 seconds.' },
            { icon: '🔄', title: 'Runs in the background', desc: 'A Redis job queue means nothing times out, even on the free tier.' },
            { icon: '📊', title: 'Shows you your own data', desc: 'Simple charts of what you generated, when, and in what tone.' },
          ].map((f,i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '52px', height: '52px', background: '#F0E6D3', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 16px' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ color: '#8B7355', fontSize: '13px', lineHeight: '1.7' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Origin note — keeps it human */}
      <section style={{ padding: '50px 48px', maxWidth: '640px', margin: '0 auto 90px', textAlign: 'center', background: '#F5F0E8', borderRadius: '20px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontStyle: 'italic', color: '#5C4A35', lineHeight: '1.7' }}>
          "I built this because I was rewriting the same idea five different ways for five different platforms, every week. Figured I wasn't the only one."
        </p>
        <p style={{ color: '#B5A088', fontSize: '13px', marginTop: '14px' }}>— Rishabh, B.Tech CSE, final year</p>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '0 48px 90px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '600', textAlign: 'center', marginBottom: '8px' }}>Pricing</h2>
        <p style={{ textAlign: 'center', color: '#8B7355', fontSize: '15px', marginBottom: '40px' }}>Start free. Upgrade only if you need more.</p>
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
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', background: p.popular ? '#C17B3B' : '#F0E6D3', color: p.popular ? 'white' : '#C17B3B' }}>
                {p.name === 'Free' ? 'Get started' : 'Choose ' + p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '24px 48px', borderTop: '1px solid #E8DFD0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#B5A088', fontSize: '13px', maxWidth: '1200px', margin: '0 auto' }}>
        <span>ContentStudio — built solo, shipped in public</span>
        <div style={{ display: 'flex', gap: '18px' }}>
          <Link href="/privacy" style={{ color: '#B5A088', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#B5A088', textDecoration: 'none' }}>Terms</Link>
        </div>
      </footer>
    </main>
  );
}