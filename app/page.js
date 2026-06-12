import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: '#FFFDF7', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#2C1810' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', borderBottom: '1px solid #E8DFD0', position: 'sticky', top: 0, background: 'rgba(255,253,247,0.95)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', background: '#C17B3B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '14px' }}>✦</span>
          </div>
          <span style={{ color: '#2C1810', fontWeight: '600', fontSize: '15px' }}>ContentStudio</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#features" style={{ color: '#8B7355', fontSize: '14px', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ color: '#8B7355', fontSize: '14px', textDecoration: 'none' }}>Pricing</a>
          <a href="#testimonials" style={{ color: '#8B7355', fontSize: '14px', textDecoration: 'none' }}>Reviews</a>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/login" style={{ color: '#8B7355', fontSize: '14px', padding: '8px 16px', border: '1px solid #E8DFD0', borderRadius: '8px', textDecoration: 'none', background: 'white' }}>Sign in</Link>
          <Link href="/signup" style={{ color: 'white', fontSize: '14px', padding: '8px 16px', background: '#C17B3B', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>Start free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 48px 60px', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#F0E6D3', border: '1px solid #DCC9A8', color: '#C17B3B', fontSize: '12px', padding: '5px 14px', borderRadius: '99px', marginBottom: '28px', fontWeight: '500' }}>
          <span style={{ width: '6px', height: '6px', background: '#C17B3B', borderRadius: '50%', display: 'inline-block' }}></span>
          Powered by Llama 3.3 70B AI
        </div>
        <h1 style={{ fontSize: '52px', fontWeight: '700', lineHeight: '1.12', marginBottom: '22px', letterSpacing: '-1px', color: '#2C1810' }}>
          Create content{' '}
          <span style={{ color: '#C17B3B' }}>10x faster</span>
          <br />with AI
        </h1>
        <p style={{ color: '#8B7355', fontSize: '18px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}>
          One topic. Five formats. Blog posts, LinkedIn, Twitter threads, YouTube scripts, and email newsletters — generated in seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          <Link href="/signup" style={{ background: '#C17B3B', color: 'white', padding: '14px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>
            Start for free →
          </Link>
          <Link href="/login" style={{ background: 'white', color: '#8B7355', padding: '14px 32px', borderRadius: '10px', fontSize: '16px', border: '1px solid #E8DFD0', textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
        <p style={{ color: '#B5A088', fontSize: '13px' }}>5 free credits • No credit card required</p>
      </section>

      {/* Social proof */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '64px' }}>
        <div style={{ display: 'flex' }}>
          {['#C17B3B','#8B5E3C','#A0522D','#D2691E','#CD853F'].map((c, i) => (
            <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', background: c, border: '2px solid #FFFDF7', marginLeft: i === 0 ? 0 : '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '600' }}>
              {['R','S','A','M','K'][i]}
            </div>
          ))}
        </div>
        <span style={{ color: '#8B7355', fontSize: '14px' }}>
          Loved by <span style={{ color: '#C17B3B', fontWeight: '600' }}>2,000+</span> creators & marketers
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', borderTop: '1px solid #E8DFD0', borderBottom: '1px solid #E8DFD0', marginBottom: '80px' }}>
        {[
          { num: '50K+', label: 'pieces generated' },
          { num: '2,000+', label: 'active users' },
          { num: '5', label: 'formats at once' },
          { num: '10x', label: 'faster than manual' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '28px', borderRight: i < 3 ? '1px solid #E8DFD0' : 'none', background: i % 2 === 0 ? '#FFFDF7' : '#FAF7F2' }}>
            <div style={{ color: '#C17B3B', fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>{s.num}</div>
            <div style={{ color: '#8B7355', fontSize: '13px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section id="features" style={{ padding: '0 48px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#C17B3B', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px', fontWeight: '600' }}>Features</p>
        <h2 style={{ textAlign: 'center', color: '#2C1810', fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>Everything you need to create content</h2>
        <p style={{ textAlign: 'center', color: '#8B7355', fontSize: '16px', marginBottom: '44px' }}>Stop spending hours writing. Let AI do the heavy lifting.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { icon: '⚡', title: '5 formats at once', desc: 'Generate blog, LinkedIn, Twitter, YouTube script and email newsletter simultaneously in under 20 seconds.', bg: '#F0E6D3' },
            { icon: '🎯', title: 'Your writing style', desc: 'Paste 3 writing samples and the AI learns your unique tone, vocabulary and style fingerprint perfectly.', bg: '#F0E6D3' },
            { icon: '📊', title: 'Analytics dashboard', desc: 'Track your content output, credits usage, tone preferences and generation history over time.', bg: '#F0E6D3' },
            { icon: '🔄', title: 'Background processing', desc: 'Jobs run in a Redis queue — no timeouts, no waiting. Generate while you work on something else.', bg: '#F0E6D3' },
            { icon: '📋', title: 'One-click copy', desc: 'Copy any format to clipboard instantly. Your content is ready to paste anywhere immediately.', bg: '#F0E6D3' },
            { icon: '🔒', title: 'Secure & private', desc: 'JWT auth, bcrypt passwords. Your content is fully encrypted and belongs only to you.', bg: '#F0E6D3' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '24px' }}>
              <div style={{ width: '38px', height: '38px', background: f.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '14px' }}>{f.icon}</div>
              <div style={{ color: '#2C1810', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ color: '#8B7355', fontSize: '13px', lineHeight: '1.65' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Formats */}
      <section style={{ padding: '0 48px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#C17B3B', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px', fontWeight: '600' }}>Output formats</p>
        <h2 style={{ textAlign: 'center', color: '#2C1810', fontSize: '32px', fontWeight: '700', marginBottom: '36px' }}>One topic → five formats instantly</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {[
            { emoji: '📝', name: 'Blog Post', desc: 'Long-form with sections', color: '#C17B3B' },
            { emoji: '💼', name: 'LinkedIn Post', desc: 'Professional with hashtags', color: '#8B5E3C' },
            { emoji: '🐦', name: 'Twitter Thread', desc: '6 tweets, 280 chars each', color: '#A0522D' },
            { emoji: '🎥', name: 'YouTube Script', desc: 'With stage directions', color: '#D2691E' },
            { emoji: '📧', name: 'Email Newsletter', desc: 'Subject, preview, CTA', color: '#CD853F' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.emoji}</div>
              <div style={{ color: f.color, fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>{f.name}</div>
              <div style={{ color: '#B5A088', fontSize: '11px', lineHeight: '1.5' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '0 48px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#C17B3B', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px', fontWeight: '600' }}>Testimonials</p>
        <h2 style={{ textAlign: 'center', color: '#2C1810', fontSize: '32px', fontWeight: '700', marginBottom: '36px' }}>Creators love ContentStudio</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { text: 'I used to spend 3 hours writing content for all my platforms. Now it takes 20 seconds. This tool is insane.', name: 'Sneha Patel', role: 'Content Creator, Mumbai', color: '#C17B3B' },
            { text: 'The writing style feature is mind-blowing. It actually sounds like me. My engagement went up 40% in a month.', name: 'Arjun Mehta', role: 'LinkedIn Influencer, Delhi', color: '#8B5E3C' },
            { text: 'Our marketing team of 3 now outputs content like a team of 10. ContentStudio is a complete game changer.', name: 'Riya Sharma', role: 'Marketing Lead, Bangalore', color: '#A0522D' },
          ].map((t, i) => (
            <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '22px' }}>
              <div style={{ color: '#C17B3B', fontSize: '32px', marginBottom: '8px', lineHeight: 1 }}>"</div>
              <p style={{ color: '#5C4A35', fontSize: '14px', lineHeight: '1.7', marginBottom: '18px' }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: '600', flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ color: '#2C1810', fontSize: '13px', fontWeight: '600' }}>{t.name}</div>
                  <div style={{ color: '#8B7355', fontSize: '11px' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '0 48px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#C17B3B', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px', fontWeight: '600' }}>Pricing</p>
        <h2 style={{ textAlign: 'center', color: '#2C1810', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Simple, transparent pricing</h2>
        <p style={{ textAlign: 'center', color: '#8B7355', fontSize: '16px', marginBottom: '40px' }}>Start free. Upgrade when you are ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { name: 'Free', price: '₹0', period: '/month', desc: 'Perfect for trying out', features: ['5 credits/month', 'All 5 formats', 'Content history', 'Basic analytics'], popular: false, btnText: 'Get started', href: '/signup' },
            { name: 'Pro', price: '₹999', period: '/month', desc: 'For serious creators', features: ['100 credits/month', 'All 5 formats', 'Writing style AI', 'Advanced analytics', 'Priority support'], popular: true, btnText: 'Upgrade to Pro', href: '/signup' },
            { name: 'Agency', price: '₹2,999', period: '/month', desc: 'For teams and agencies', features: ['Unlimited credits', 'All 5 formats', 'Team access', 'API access', 'Dedicated support'], popular: false, btnText: 'Contact us', href: '/signup' },
          ].map((plan, i) => (
            <div key={i} style={{ background: '#FFFDF7', border: plan.popular ? '2px solid #C17B3B' : '1px solid #E8DFD0', borderRadius: '14px', padding: '26px', position: 'relative' }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#C17B3B', color: 'white', fontSize: '11px', padding: '4px 14px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: '600' }}>
                  Most popular
                </div>
              )}
              <div style={{ color: '#8B7355', fontSize: '13px', marginBottom: '8px' }}>{plan.name}</div>
              <div style={{ color: '#2C1810', fontSize: '30px', fontWeight: '700', marginBottom: '4px' }}>
                {plan.price} <span style={{ color: '#B5A088', fontSize: '14px', fontWeight: '400' }}>{plan.period}</span>
              </div>
              <div style={{ color: '#8B7355', fontSize: '13px', marginBottom: '20px' }}>{plan.desc}</div>
              <ul style={{ listStyle: 'none', marginBottom: '22px' }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ color: '#5C4A35', fontSize: '13px', padding: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#C17B3B', fontSize: '14px', fontWeight: '600' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: '9px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', background: plan.popular ? '#C17B3B' : '#F0E6D3', color: plan.popular ? 'white' : '#C17B3B', border: 'none' }}>
                {plan.btnText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '64px 48px', borderTop: '1px solid #E8DFD0', background: '#FAF7F2' }}>
        <h2 style={{ color: '#2C1810', fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>Start creating better content today</h2>
        <p style={{ color: '#8B7355', fontSize: '16px', marginBottom: '28px' }}>Join 2,000+ creators who save hours every week</p>
        <Link href="/signup" style={{ background: '#C17B3B', color: 'white', padding: '14px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>
          Get started for free →
        </Link>
        <p style={{ color: '#B5A088', fontSize: '13px', marginTop: '14px' }}>No credit card required</p>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px 48px', borderTop: '1px solid #E8DFD0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFDF7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', background: '#C17B3B', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px', color: 'white' }}>✦</span>
          </div>
          <span style={{ color: '#8B7355', fontSize: '13px' }}>ContentStudio</span>
        </div>
        <p style={{ color: '#B5A088', fontSize: '13px' }}>© 2025 ContentStudio. Built with ❤️ by Rishabh</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#B5A088', fontSize: '13px', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#B5A088', fontSize: '13px', textDecoration: 'none' }}>Terms</a>
        </div>
      </footer>
    </main>
  );
}