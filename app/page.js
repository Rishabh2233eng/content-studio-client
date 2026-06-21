import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: '#EDE8DF', minHeight: '100vh', fontFamily: 'var(--font-body, sans-serif)', color: '#1E0F08' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 52px', borderBottom: '1px solid #D4C9B8', background: '#E8E2D8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: '#1E0F08', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-4deg)' }}>
            <span style={{ fontSize: '13px', color: '#E8C89A' }}>✦</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '17px', color: '#1E0F08' }}>ContentStudio</span>
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Link href="/login" style={{ color: '#6B4F35', fontSize: '14px', padding: '9px 18px', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
          <Link href="/signup" style={{ color: '#EDE8DF', fontSize: '14px', padding: '10px 22px', background: '#1E0F08', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', letterSpacing: '-.01em' }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '100px 52px 80px', maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#D4C4A8', color: '#6B3F1A', fontSize: '12px', fontWeight: '700', padding: '6px 16px', borderRadius: '99px', marginBottom: '32px', letterSpacing: '.04em', textTransform: 'uppercase' }}>
          Built solo · Final year CSE student
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '54px', fontWeight: '700', lineHeight: '1.08', marginBottom: '24px', letterSpacing: '-1.5px', color: '#1E0F08' }}>
          One topic.<br/>
          <span style={{ color: '#A0622A', fontStyle: 'italic' }}>Five pieces</span> of content.
        </h1>
        <p style={{ color: '#4A3728', fontSize: '17px', lineHeight: '1.75', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
          Blog post, LinkedIn post, Twitter thread, YouTube script, and email newsletter — all generated together, in your tone, in under 20 seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          <Link href="/signup" style={{ background: '#1E0F08', color: '#EDE8DF', padding: '15px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', textDecoration: 'none', letterSpacing: '-.01em' }}>
            Try it free →
          </Link>
          <Link href="/login" style={{ background: '#D8D0C4', color: '#4A3728', padding: '15px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: '500', textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
        <p style={{ color: '#9A8878', fontSize: '13px' }}>5 free generations · no card required</p>
      </section>

      {/* Product preview card */}
      <section style={{ maxWidth: '880px', margin: '0 auto 90px', padding: '0 52px' }}>
        <div style={{ background: '#E0D8CC', border: '1px solid #C8BBA8', borderRadius: '22px', padding: '8px', boxShadow: '0 24px 64px rgba(30,15,8,0.14)' }}>
          <div style={{ background: '#EDE8DF', borderRadius: '16px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '28px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#9A8878', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: '600' }}>Your topic</p>
              <p style={{ fontSize: '15px', color: '#1E0F08', fontWeight: '600', marginBottom: '28px', lineHeight: '1.5' }}>"Why side projects matter more than internships"</p>
              <p style={{ fontSize: '11px', color: '#9A8878', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: '600' }}>Generated</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {[
                  { e: '📝', t: 'Blog post', d: '480 words' },
                  { e: '💼', t: 'LinkedIn post', d: 'with hashtags' },
                  { e: '🐦', t: 'Twitter thread', d: '6 tweets' },
                  { e: '🎥', t: 'YouTube script', d: 'with directions' },
                  { e: '📧', t: 'Newsletter', d: 'subject + CTA' },
                ].map((f,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#D8D0C4', borderRadius: '8px', padding: '8px 12px' }}>
                    <span style={{ fontSize: '12px', color: '#4A3728', fontWeight: '500' }}>{f.e} {f.t}</span>
                    <span style={{ fontSize: '11px', color: '#9A8878' }}>{f.d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#F5F0E8', borderRadius: '12px', border: '1px solid #D4C9B8', padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #E0D8CC' }}>
                <span style={{ fontSize: '14px' }}>📝</span>
                <span style={{ fontSize: '12px', color: '#A0622A', fontWeight: '700' }}>Blog Post</span>
                <span style={{ fontSize: '11px', color: '#9A8878', marginLeft: 'auto' }}>480 words</span>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '600', marginBottom: '10px', color: '#1E0F08', lineHeight: '1.4' }}>Why Side Projects Matter More Than Internships</p>
              <p style={{ fontSize: '12px', color: '#6B4F35', lineHeight: '1.8' }}>
                Internships teach you to follow a process someone else designed. Side projects teach you to design the process itself. The gap between knowing a tech stack and actually shipping something with it only closes one way — by shipping something...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider stat row */}
      <div style={{ borderTop: '1px solid #D4C9B8', borderBottom: '1px solid #D4C9B8', display: 'flex', background: '#E8E2D8', marginBottom: '90px' }}>
        {[
          { num: '5', label: 'formats at once' },
          { num: '< 20s', label: 'generation time' },
          { num: '0', label: 'credit card needed to start' },
          { num: '100%', label: 'built by one person' },
        ].map((s,i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '28px 20px', borderRight: i < 3 ? '1px solid #D4C9B8' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-display)', color: '#A0622A', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{s.num}</div>
            <div style={{ color: '#7A6555', fontSize: '12px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section style={{ padding: '0 52px 90px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: '700', marginBottom: '48px', color: '#1E0F08', letterSpacing: '-.5px' }}>
          What it does well
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '⚡', title: 'Five formats, one click', desc: 'Blog, LinkedIn, Twitter, YouTube, email — generated in parallel, all in under 20 seconds.', top: 0 },
            { icon: '🔄', title: 'Background job queue', desc: 'Powered by Redis + Bull. Heavy tasks never block the page or time out.', top: 28 },
            { icon: '📊', title: 'Usage analytics', desc: 'Simple charts showing what you generated, when, and which tones you use most.', top: 0 },
          ].map((f,i) => (
            <div key={i} style={{ background: '#E8E2D8', border: '1px solid #D4C9B8', borderRadius: '16px', padding: '26px', marginTop: f.top + 'px' }}>
              <div style={{ width: '46px', height: '46px', background: '#D4C4A8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '16px' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1E0F08' }}>{f.title}</div>
              <div style={{ color: '#6B4F35', fontSize: '13px', lineHeight: '1.7' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: '52px', maxWidth: '680px', margin: '0 auto 90px', textAlign: 'center', background: '#1E0F08', borderRadius: '22px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic', color: '#D4C4A8', lineHeight: '1.7' }}>
          "I built this because I was rewriting the same idea five different ways for five different platforms, every single week. Figured I wasn't the only one doing that."
        </p>
        <p style={{ color: '#7A6555', fontSize: '13px', marginTop: '18px' }}>— Rishabh, B.Tech CSE · final year</p>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '0 52px 90px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: '700', textAlign: 'center', marginBottom: '8px', color: '#1E0F08', letterSpacing: '-.5px' }}>Pricing</h2>
        <p style={{ textAlign: 'center', color: '#7A6555', fontSize: '15px', marginBottom: '44px' }}>Start free. Upgrade only if you need more.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { name: 'Free', price: '₹0', desc: 'Try it out', features: ['5 credits/month', 'All 5 formats', 'History + analytics'], popular: false },
            { name: 'Pro', price: '₹999', desc: 'For regular creators', features: ['100 credits/month', 'All 5 formats', 'Full analytics', 'Priority support'], popular: true },
            { name: 'Agency', price: '₹2,999', desc: 'For teams', features: ['Unlimited credits', 'Team access', 'API access'], popular: false },
          ].map((p,i) => (
            <div key={i} style={{ background: p.popular ? '#1E0F08' : '#E8E2D8', border: p.popular ? '2px solid #A0622A' : '1px solid #D4C9B8', borderRadius: '18px', padding: '28px', position: 'relative' }}>
              {p.popular && <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: '#A0622A', color: 'white', fontSize: '10px', padding: '4px 14px', borderRadius: '99px', fontWeight: '700', whiteSpace: 'nowrap', letterSpacing: '.03em' }}>MOST POPULAR</div>}
              <div style={{ color: p.popular ? '#9A8878' : '#7A6555', fontSize: '13px', marginBottom: '8px' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: '700', marginBottom: '4px', color: p.popular ? '#EDE8DF' : '#1E0F08' }}>{p.price}<span style={{ fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: '400', color: p.popular ? '#7A6555' : '#9A8878' }}>/mo</span></div>
              <div style={{ color: p.popular ? '#7A6555' : '#9A8878', fontSize: '12px', marginBottom: '20px' }}>{p.desc}</div>
              <ul style={{ listStyle: 'none', marginBottom: '22px' }}>
                {p.features.map((f,j) => (
                  <li key={j} style={{ color: p.popular ? '#C4B8A8' : '#6B4F35', fontSize: '13px', padding: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#A0622A', fontWeight: '700' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', textDecoration: 'none', background: p.popular ? '#A0622A' : '#D4C4A8', color: p.popular ? 'white' : '#1E0F08' }}>
                {p.name === 'Free' ? 'Get started' : 'Choose ' + p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '70px 48px', borderTop: '1px solid #D4C9B8', background: '#E8E2D8' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '700', marginBottom: '12px', color: '#1E0F08', letterSpacing: '-.5px' }}>
          Stop rewriting the same idea five times.
        </h2>
        <p style={{ color: '#6B4F35', fontSize: '16px', marginBottom: '28px' }}>Try ContentStudio free — no card, no commitment.</p>
        <Link href="/signup" style={{ background: '#1E0F08', color: '#EDE8DF', padding: '15px 36px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
          Get started free →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px 52px', borderTop: '1px solid #D4C9B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#E8E2D8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', background: '#1E0F08', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', color: '#E8C89A' }}>✦</span>
          </div>
          <span style={{ color: '#7A6555', fontSize: '13px', fontFamily: 'var(--font-display)', fontWeight: '600' }}>ContentStudio</span>
        </div>
        <p style={{ color: '#9A8878', fontSize: '12px' }}>Built solo · shipped in public · © 2025</p>
        <div style={{ display: 'flex', gap: '18px' }}>
          <Link href="/privacy" style={{ color: '#9A8878', textDecoration: 'none', fontSize: '13px' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#9A8878', textDecoration: 'none', fontSize: '13px' }}>Terms</Link>
        </div>
      </footer>
    </main>
  );
}