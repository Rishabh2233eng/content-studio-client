'use client';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { Sparkles, History, Zap, ArrowRight, FileText, Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const formats = [
    { icon: FileText, label: 'Blog Post', color: '#a78bfa' },
    { icon: Linkedin, label: 'LinkedIn', color: '#60a5fa' },
    { icon: Twitter, label: 'Twitter Thread', color: '#38bdf8' },
    { icon: Youtube, label: 'YouTube Script', color: '#f87171' },
    { icon: Mail, label: 'Email Newsletter', color: '#34d399' },
  ];

  return (
    <div style={{ maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Ready to create some amazing content today?</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Credits Remaining', value: user?.credits, sub: 'of 5 free credits', icon: <Zap size={16} color="#fbbf24" /> },
          { label: 'Current Plan', value: user?.plan, sub: 'Upgrade for more credits', icon: <Sparkles size={16} color="#a78bfa" /> },
          { label: 'Formats / Generation', value: '5', sub: 'Blog, LinkedIn & more', icon: <History size={16} color="#34d399" /> },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#555', fontSize: '12px', textTransform: 'capitalize' }}>{stat.label}</span>
              {stat.icon}
            </div>
            <div style={{ color: '#ffffff', fontSize: '28px', fontWeight: '600', textTransform: 'capitalize' }}>{stat.value}</div>
            <div style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* What you generate */}
      <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>One topic → 5 formats instantly</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {formats.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '8px 14px' }}>
                <Icon size={15} color={f.color} />
                <span style={{ color: '#aaa', fontSize: '13px' }}>{f.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Link href="/dashboard/generate" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '14px', padding: '28px', cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'}>
            <Sparkles size={30} color="#a78bfa" style={{ marginBottom: '14px' }} />
            <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Generate Content</div>
            <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>Enter a topic and get 5 content formats instantly with AI</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a78bfa', fontSize: '13px', fontWeight: '500' }}>
              Start generating <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/history" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px', cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}>
            <History size={30} color="#34d399" style={{ marginBottom: '14px' }} />
            <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>View History</div>
            <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>Browse and reuse all your previously generated content</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '13px', fontWeight: '500' }}>
              View history <ArrowRight size={14} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}