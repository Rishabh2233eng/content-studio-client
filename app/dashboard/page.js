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
    { emoji: '📝', name: 'Blog Post', color: '#C17B3B' },
    { emoji: '💼', name: 'LinkedIn', color: '#8B5E3C' },
    { emoji: '🐦', name: 'Twitter', color: '#A0522D' },
    { emoji: '🎥', name: 'YouTube', color: '#D2691E' },
    { emoji: '📧', name: 'Email', color: '#CD853F' },
  ];

  const toneColors = {
    professional: '#C17B3B',
    casual: '#8B5E3C',
    humorous: '#D2691E',
    inspiring: '#A0522D'
  };

  return (
    <div style={{ maxWidth: '920px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ color: '#2C1810', fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p style={{ color: '#8B7355', fontSize: '14px' }}>Ready to create some amazing content today?</p>
        </div>
        <Link href="/dashboard/generate" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#C17B3B', color: 'white', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          <Sparkles size={15} /> Generate now
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Credits Left', value: user?.credits, sub: user?.plan + ' plan', icon: <Zap size={15} color="#C17B3B" /> },
          { label: 'Total Generated', value: totalGenerated, sub: 'all time', icon: <Sparkles size={15} color="#8B5E3C" /> },
          { label: 'Total Formats', value: totalGenerated * 5, sub: '5 per generation', icon: <FileText size={15} color="#A0522D" /> },
          { label: 'Hours Saved', value: Math.round(totalGenerated * 2.5), sub: 'vs manual writing', icon: <Clock size={15} color="#D2691E" /> },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#8B7355', fontSize: '12px' }}>{stat.label}</span>
              {stat.icon}
            </div>
            <div style={{ color: '#2C1810', fontSize: '26px', fontWeight: '700', marginBottom: '3px', textTransform: 'capitalize' }}>{stat.value}</div>
            <div style={{ color: '#B5A088', fontSize: '11px', textTransform: 'capitalize' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>

        {/* Generate card */}
        <Link href="/dashboard/generate" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#FDF6EE', border: '1px solid #DCC9A8', borderRadius: '14px', padding: '24px', cursor: 'pointer', height: '100%' }}>
            <div style={{ width: '40px', height: '40px', background: '#F0E6D3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Sparkles size={20} color="#C17B3B" />
            </div>
            <div style={{ color: '#2C1810', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Generate Content</div>
            <div style={{ color: '#8B7355', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>Enter a topic and get 5 content formats instantly with AI</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {formats.map((f, i) => (
                <span key={i} style={{ background: '#F0E6D3', border: '1px solid #DCC9A8', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', color: f.color, fontWeight: '500' }}>
                  {f.emoji} {f.name}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C17B3B', fontSize: '13px', fontWeight: '600' }}>
              Start generating <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ marginBottom: '14px' }}>
              <span style={{ color: '#2C1810', fontSize: '14px', fontWeight: '600' }}>Credits usage</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#8B7355', fontSize: '12px' }}>Used</span>
              <span style={{ color: '#5C4A35', fontSize: '12px' }}>{5 - user?.credits} / 5</span>
            </div>
            <div style={{ background: '#E8DFD0', borderRadius: '99px', height: '6px', marginBottom: '10px' }}>
              <div style={{ background: '#C17B3B', height: '6px', borderRadius: '99px', width: `${((5 - user?.credits) / 5) * 100}%` }} />
            </div>
            <Link href="/dashboard/profile" style={{ color: '#C17B3B', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>
              Upgrade for more credits →
            </Link>
          </div>

          <Link href="/dashboard/history" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#F0E6D3', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <History size={18} color="#C17B3B" />
                  </div>
                  <div>
                    <div style={{ color: '#2C1810', fontSize: '14px', fontWeight: '600' }}>Content History</div>
                    <div style={{ color: '#8B7355', fontSize: '12px' }}>{totalGenerated} generations</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#B5A088" />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/analytics" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#F0E6D3', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={18} color="#C17B3B" />
                  </div>
                  <div>
                    <div style={{ color: '#2C1810', fontSize: '14px', fontWeight: '600' }}>Analytics</div>
                    <div style={{ color: '#8B7355', fontSize: '12px' }}>Track your content output</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#B5A088" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent activity */}
      {recentContent.length > 0 && (
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#2C1810', fontSize: '15px', fontWeight: '600' }}>Recent Generations</h2>
            <Link href="/dashboard/history" style={{ color: '#8B7355', fontSize: '13px', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentContent.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F5F0E8', borderRadius: '10px', border: '1px solid #E8DFD0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: toneColors[c.tone] || '#C17B3B', flexShrink: 0 }} />
                  <span style={{ color: '#5C4A35', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.topic}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
                  <span style={{ color: '#C17B3B', fontSize: '11px', textTransform: 'capitalize', background: '#F0E6D3', padding: '2px 8px', borderRadius: '99px', border: '1px solid #DCC9A8' }}>{c.tone}</span>
                  <span style={{ color: '#B5A088', fontSize: '11px' }}>{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}