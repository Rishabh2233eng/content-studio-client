'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Trash2 } from 'lucide-react';

export default function ContentView({ params }) {
  const { token } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState('');
  const [activeTab, setActiveTab] = useState('blogPost');

  const formats = [
    { key: 'blogPost', label: 'Blog Post', emoji: '📝', color: '#a78bfa' },
    { key: 'linkedInPost', label: 'LinkedIn', emoji: '💼', color: '#60a5fa' },
    { key: 'twitterThread', label: 'Twitter', emoji: '🐦', color: '#38bdf8' },
    { key: 'youtubeScript', label: 'YouTube', emoji: '🎥', color: '#f87171' },
    { key: 'emailNewsletter', label: 'Email', emoji: '📧', color: '#34d399' },
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/content/' + params.id,
          { headers: { Authorization: 'Bearer ' + token } }
        );
        setContent(res.data.content);
      } catch (err) {
        router.push('/dashboard/history');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchContent();
  }, [token, params.id]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        'http://localhost:5000/api/content/' + params.id,
        { headers: { Authorization: 'Bearer ' + token } }
      );
      router.push('/dashboard/history');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ color: '#a78bfa' }}>Loading content...</div>
      </div>
    );
  }

  if (!content) return null;

  const activeContent = content.generatedContent?.[activeTab];
  const activeFormat = formats.find(f => f.key === activeTab);

  return (
    <div style={{ maxWidth: '860px' }}>

      {/* Back button */}
      <Link href="/dashboard/history" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '13px', textDecoration: 'none', marginBottom: '24px' }}
        onMouseEnter={e => e.currentTarget.style.color = '#aaa'}
        onMouseLeave={e => e.currentTarget.style.color = '#666'}>
        <ArrowLeft size={15} /> Back to History
      </Link>

      {/* Header */}
      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '24px 28px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '10px', lineHeight: '1.4' }}>
              {content.topic}
            </h1>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '12px', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(124,58,237,0.2)', textTransform: 'capitalize' }}>
                {content.tone}
              </span>
              <span style={{ color: '#444', fontSize: '12px' }}>
                {new Date(content.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span style={{ color: '#444', fontSize: '12px' }}>
                1 credit used
              </span>
            </div>
          </div>
          <button onClick={handleDelete}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#ef4444', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Format tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {formats.map(f => (
          <button key={f.key} onClick={() => setActiveTab(f.key)}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '10px', border: activeTab === f.key ? `1px solid ${f.color}40` : '1px solid #1f1f1f', background: activeTab === f.key ? `${f.color}15` : '#111', color: activeTab === f.key ? f.color : '#555', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
            <span>{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      {activeContent && (
        <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #1f1f1f' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>{activeFormat?.emoji}</span>
              <span style={{ color: activeFormat?.color, fontSize: '14px', fontWeight: '600' }}>{activeFormat?.label}</span>
            </div>
            <button onClick={() => handleCopy(activeContent, activeTab)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: copied === activeTab ? 'rgba(52,211,153,0.1)' : '#1a1a1a', border: copied === activeTab ? '1px solid rgba(52,211,153,0.3)' : '1px solid #2a2a2a', color: copied === activeTab ? '#34d399' : '#666', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}>
              {copied === activeTab ? <Check size={14} /> : <Copy size={14} />}
              {copied === activeTab ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ padding: '24px', color: '#bbb', fontSize: '14px', lineHeight: '1.9', whiteSpace: 'pre-wrap', minHeight: '300px', maxHeight: '500px', overflowY: 'auto' }}>
            {activeContent}
          </div>
        </div>
      )}
    </div>
  );
}