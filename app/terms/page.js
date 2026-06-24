import Link from 'next/link';

export default function Terms() {
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
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '700', color: '#1E0F08', marginBottom: '8px' }}>Terms of Service</h1>
        <p style={{ color: '#9A8878', fontSize: '14px', marginBottom: '40px' }}>Last updated: June 2025</p>

        {[
          {
            title: '1. Acceptance of terms',
            content: 'By creating an account or using ContentStudio, you agree to these Terms of Service. If you do not agree, please do not use the service. These terms apply to all users of contentstudio.vercel.app.'
          },
          {
            title: '2. Description of service',
            content: 'ContentStudio is an AI-powered content generation tool that creates blog posts, LinkedIn posts, Twitter threads, YouTube scripts, and email newsletters from user-provided topics. The service is provided on a free and paid subscription basis.'
          },
          {
            title: '3. Account registration',
            content: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized use of your account. You must be at least 13 years old to use ContentStudio.'
          },
          {
            title: '4. Acceptable use',
            content: 'You agree not to use ContentStudio to generate content that is illegal, harmful, defamatory, or infringes on the rights of others. You may not use the service to generate spam, misinformation, hate speech, or content that violates any applicable laws. We reserve the right to suspend accounts that violate these terms.'
          },
          {
            title: '5. Content ownership',
            content: 'You retain full ownership of the content you generate using ContentStudio. By using the service, you grant us a limited license to store and display your content within the platform for the purpose of providing the service. We do not claim any ownership over your generated content.'
          },
          {
            title: '6. Credits and payments',
            content: 'Free accounts receive 5 credits per month. Paid plans provide additional credits as described on the pricing page. Credits are non-transferable and non-refundable. Paid subscriptions are billed monthly and can be cancelled at any time. No refunds are provided for unused credits or partial months.'
          },
          {
            title: '7. AI-generated content disclaimer',
            content: 'ContentStudio uses artificial intelligence to generate content. AI-generated content may contain inaccuracies, errors, or inappropriate material. You are solely responsible for reviewing, editing, and verifying all generated content before publishing or using it. We do not guarantee the accuracy, quality, or suitability of AI-generated content.'
          },
          {
            title: '8. Intellectual property',
            content: 'ContentStudio, its logo, design, and underlying technology are the intellectual property of Rishabh Jadaun. You may not copy, modify, distribute, or reverse engineer any part of the service without prior written permission.'
          },
          {
            title: '9. Limitation of liability',
            content: 'ContentStudio is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability to you shall not exceed the amount you paid us in the 3 months preceding the claim.'
          },
          {
            title: '10. Service availability',
            content: 'We strive to maintain high availability but do not guarantee uninterrupted access to ContentStudio. We may perform maintenance, updates, or experience downtime. We are not liable for any losses resulting from service unavailability.'
          },
          {
            title: '11. Termination',
            content: 'We reserve the right to suspend or terminate your account at any time for violations of these terms. You may delete your account at any time. Upon termination, your right to use the service ceases immediately and your data will be deleted within 30 days.'
          },
          {
            title: '12. Governing law',
            content: 'These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.'
          },
          {
            title: '13. Changes to terms',
            content: 'We may update these Terms of Service at any time. Significant changes will be communicated via email or in-app notification. Continued use of ContentStudio after changes are posted constitutes acceptance of the updated terms.'
          },
          {
            title: '14. Contact',
            content: 'For questions about these Terms of Service, contact us at therishabh1119@gmail.com.'
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
          <Link href="/privacy" style={{ color: '#9A8878', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#A0622A', textDecoration: 'none' }}>Terms</Link>
        </div>
      </footer>
    </main>
  );
}