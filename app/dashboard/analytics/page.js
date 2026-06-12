'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Sparkles, Zap, FileText, TrendingUp } from 'lucide-react';

export default function Analytics() {
  const { token } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setAnalytics(res.data.analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAnalytics();
  }, [token]);

  const COLORS = ['#C17B3B', '#8B5E3C', '#A0522D', '#D2691E', '#CD853F'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '8px', padding: '10px 14px' }}>
          <p style={{ color: '#8B7355', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
          <p style={{ color: '#C17B3B', fontSize: '14px', fontWeight: '600' }}>
            {payload[0].value} generations
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ background: '#E8DFD0', height: '32px', width: '200px', borderRadius: '8px', marginBottom: '8px' }} />
          <div style={{ background: '#E8DFD0', height: '16px', width: '150px', borderRadius: '8px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px', height: '100px' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const stats = [
    { label: 'Total Generations', value: analytics.totalGenerated, sub: 'all time', icon: <Sparkles size={16} color="#C17B3B" /> },
    { label: 'Total Formats', value: analytics.totalFormats, sub: 'blog, linkedin & more', icon: <FileText size={16} color="#8B5E3C" /> },
    { label: 'Credits Used', value: analytics.creditsUsed, sub: 'of 5 free credits', icon: <Zap size={16} color="#A0522D" /> },
    { label: 'Credits Left', value: analytics.creditsRemaining, sub: analytics.plan + ' plan', icon: <TrendingUp size={16} color="#D2691E" /> },
  ];

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#2C1810', fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>Analytics 📊</h1>
        <p style={{ color: '#8B7355', fontSize: '14px' }}>Track your content generation activity</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#8B7355', fontSize: '12px' }}>{stat.label}</span>
              {stat.icon}
            </div>
            <div style={{ color: '#2C1810', fontSize: '28px', fontWeight: '700', marginBottom: '4px', textTransform: 'capitalize' }}>{stat.value}</div>
            <div style={{ color: '#B5A088', fontSize: '12px', textTransform: 'capitalize' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
        <h2 style={{ color: '#2C1810', fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>Generations — Last 7 Days</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={analytics.dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D3" />
            <XAxis dataKey="date" tick={{ fill: '#8B7355', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8B7355', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(193,123,59,0.06)' }} />
            <Bar dataKey="generations" fill="#C17B3B" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '24px' }}>
          <h2 style={{ color: '#2C1810', fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>Tone Breakdown</h2>
          {analytics.toneData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={analytics.toneData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {analytics.toneData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '8px', fontSize: '13px' }} itemStyle={{ color: '#2C1810' }} />
                <Legend formatter={(value) => <span style={{ color: '#8B7355', fontSize: '12px' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5A088', fontSize: '14px' }}>
              No data yet — generate some content!
            </div>
          )}
        </div>

        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '24px' }}>
          <h2 style={{ color: '#2C1810', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Recent Activity</h2>
          {analytics.recentContent.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {analytics.recentContent.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: '#F5F0E8', borderRadius: '10px', border: '1px solid #E8DFD0' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#2C1810', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.topic}</div>
                    <div style={{ color: '#B5A088', fontSize: '11px', marginTop: '2px', textTransform: 'capitalize' }}>
                      {c.tone} • {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5A088', fontSize: '14px' }}>
              No activity yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}