'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import axios from 'axios';
import { Sparkles, History, Zap, ArrowRight, TrendingUp, FileText, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [recentContent, setRecentContent] = useState([]);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setRecentContent(res.data.analytics.recentContent || []);
        setTotalGenerated(res.data.analytics.totalGenerated || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const formats = [
    { emoji: '📝', name: 'Blog Post', color: '#a78bfa' },
    { emoji: '💼', name: 'LinkedIn', color: '#60a5fa' },
    { emoji: '🐦', name: 'Twitter', color: '#38bdf8' },
    { emoji: '🎥', name: 'YouTube', color: '#f87171' },
    { emoji: '📧', name: 'Email', color: '#34d399' },
  ];

  const toneColors = {
    professional: '#a78bfa',
    casual: '#60a5fa',
    humorous: '#fbbf24',
    inspiring: '#f87171'
  };

  return (
    <div style={{ maxWidth: '920px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p style={{ color: '#555', fontSize: '14px' }}>Ready to create some amazing content today?</p>
        </div>
        <Link href="/dashboard/generate" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#7c3aed', color: '#fff', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          <Sparkles size={15} /> Generate now
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Credits Left', value: user?.credits, sub: user?.plan + ' plan', icon: <Zap size={15} color="#fbbf24" />, highlight: user?.credits <= 1 },
          { label: 'Total Generated', value: totalGenerated, sub: 'all time', icon: <Sparkles size={15} color="#a78bfa" /> },
          { label: 'Total Formats', value: totalGenerated * 5, sub: '5 per generation', icon: <FileText size={15} color="#60a5fa" /> },
          { label: 'Hours Saved', value: Math.round(totalGenerated * 2.5), sub: 'vs manual writing', icon: <Clock size={15} color="#34d399" /> },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#111', border: stat.highlight ? '1px solid rgba(251,191,36,0.3)' : '1px solid #1f1f1f', borderRadius: '14px', padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#555', fontSize: '12px' }}>{stat.label}</span>
              {stat.icon}
            </div>
            <div style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '3px', textTransform: 'capitalize' }}>{stat.value}</div>
            <div style={{ color: '#444', fontSize: '11px', textTransform: 'capitalize' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>

        {/* Generate card */}
        <Link href="/dashboard/generate" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.08))', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '14px', padding: '24px', cursor: 'pointer', height: '100%' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(124,58,237,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Sparkles size={20} color="#a78bfa" />
            </div>
            <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Generate Content</div>
            <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>Enter a topic and get 5 content formats instantly with AI</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {formats.map((f, i) => (
                <span key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', color: f.color }}>
                  {f.emoji} {f.name}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a78bfa', fontSize: '13px', fontWeight: '500' }}>
              Start generating <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Quick stats */}
          <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>Credits usage</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#555', fontSize: '12px' }}>Used</span>
              <span style={{ color: '#aaa', fontSize: '12px' }}>{5 - user?.credits} / 5</span>
            </div>
            <div style={{ background: '#2a2a2a', borderRadius: '99px', height: '6px', marginBottom: '10px' }}>
              <div style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)', height: '6px', borderRadius: '99px', width: `${((5 - user?.credits) / 5) * 100}%`, transition: 'width 0.3s' }} />
            </div>
            <Link href="/dashboard/profile" style={{ color: '#a78bfa', fontSize: '12px', textDecoration: 'none' }}>
              Upgrade for more credits →
            </Link>
          </div>

          {/* View History */}
          <Link href="/dashboard/history" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(52,211,153,0.1)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <History size={18} color="#34d399" />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>Content History</div>
                    <div style={{ color: '#555', fontSize: '12px' }}>{totalGenerated} generations</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#555" />
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link href="/dashboard/analytics" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(59,130,246,0.1)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={18} color="#60a5fa" />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>Analytics</div>
                    <div style={{ color: '#555', fontSize: '12px' }}>Track your content output</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#555" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      {recentContent.length > 0 && (
        <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>Recent Generations</h2>
            <Link href="/dashboard/history" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentContent.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#1a1a1a', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: toneColors[c.tone] || '#a78bfa', flexShrink: 0 }} />
                  <span style={{ color: '#ccc', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.topic}</span>
                </div>
                <div style={{ display: 'flex', align: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
                  <span style={{ color: toneColors[c.tone] || '#a78bfa', fontSize: '11px', textTransform: 'capitalize', background: 'rgba(124,58,237,0.1)', padding: '2px 8px', borderRadius: '99px' }}>{c.tone}</span>
                  <span style={{ color: '#444', fontSize: '11px' }}>{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}