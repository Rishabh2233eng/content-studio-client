import Link from 'next/link';

export default function Privacy() {
  return (
    <main style={{ background: '#EDE8DF', minHeight: '100vh', fontFamily: 'var(--font-body, sans-serif)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: '1px solid #D4C9B8', background: '#E8E2D8' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '26px', height: '26px', background: '#1E0F08', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: '#E8C89A' }}>✦</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '16px', color: '#1E0F08' }}>ContentStudio</span>
        </Link>
        <Link href="/" style={{ color: '#7A6555', fontSize: '14px', textDecoration: 'none' }}>← Back to home</Link>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 48px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '700', color: '#1E0F08', marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ color: '#9A8878', fontSize: '14px', marginBottom: '40px' }}>Last updated: June 2025</p>

        {[
          {
            title: '1. Who we are',
            content: 'ContentStudio is an AI-powered content generation tool built and operated by Rishabh Jadaun, a student developer based in India. This Privacy Policy explains how we collect, use, and protect your information when you use our service at contentstudio.vercel.app.'
          },
          {
            title: '2. Information we collect',
            content: 'We collect the following information when you use ContentStudio: Account information (your name and email address when you register), Content data (topics and generated content you create using our service), Usage data (how you interact with the service, including generation history and analytics), and Technical data (IP address, browser type, and device information for security purposes).'
          },
          {
            title: '3. How we use your information',
            content: 'We use your information to: provide and improve the ContentStudio service, maintain your account and generation history, display your usage analytics within the dashboard, detect and prevent fraud or abuse, and communicate important updates about the service. We do not sell your personal information to third parties.'
          },
          {
            title: '4. AI-generated content',
            content: 'ContentStudio uses Cloudflare Workers AI to generate content based on your topics. Your prompts and topics are sent to Cloudflare\'s AI infrastructure for processing. Please review Cloudflare\'s privacy policy at cloudflare.com/privacypolicy for details on how they handle data. We do not use your content to train AI models.'
          },
          {
            title: '5. Data storage',
            content: 'Your account information and generated content are stored in MongoDB Atlas, hosted on AWS infrastructure. Passwords are encrypted using bcrypt. We use industry-standard security measures to protect your data, including JWT authentication and HTTPS encryption for all data in transit.'
          },
          {
            title: '6. Cookies',
            content: 'ContentStudio uses essential cookies and localStorage to maintain your login session. We do not use tracking cookies or advertising cookies. We do not use third-party analytics services that track you across websites.'
          },
          {
            title: '7. Your rights',
            content: 'You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your account and all associated data, and export your generated content at any time. To exercise these rights, contact us at therishabh1119@gmail.com.'
          },
          {
            title: '8. Data retention',
            content: 'We retain your account data and generated content for as long as your account is active. If you delete your account, we will permanently delete all associated data within 30 days. Some data may be retained in encrypted backups for up to 90 days.'
          },
          {
            title: '9. Children\'s privacy',
            content: 'ContentStudio is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it immediately.'
          },
          {
            title: '10. Changes to this policy',
            content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by displaying a notice on the service. Your continued use of ContentStudio after changes are posted constitutes your acceptance of the updated policy.'
          },
          {
            title: '11. Contact us',
            content: 'If you have questions about this Privacy Policy or how we handle your data, please contact us at: therishabh1119@gmail.com. We will respond within 48 hours.'
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: '#1E0F08', marginBottom: '10px' }}>{section.title}</h2>
            <p style={{ color: '#5C4A35', fontSize: '15px', lineHeight: '1.8' }}>{section.content}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #D4C9B8', paddingTop: '32px', marginTop: '16px' }}>
          <p style={{ color: '#9A8878', fontSize: '13px' }}>
            Questions? Email us at <a href="mailto:therishabh1119@gmail.com" style={{ color: '#A0622A' }}>therishabh1119@gmail.com</a>
          </p>
        </div>
      </div>

      <footer style={{ padding: '24px 48px', borderTop: '1px solid #D4C9B8', display: 'flex', justifyContent: 'space-between', color: '#9A8878', fontSize: '13px', background: '#E8E2D8' }}>
        <span>ContentStudio © 2025</span>
        <div style={{ display: 'flex', gap: '18px' }}>
          <Link href="/privacy" style={{ color: '#A0622A', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#9A8878', textDecoration: 'none' }}>Terms</Link>
        </div>
      </footer>
    </main>
  );
}