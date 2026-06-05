'use client';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Copy, Check, Loader } from 'lucide-react';

export default function Generate() {
  const { user, token } = useAuth();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const tones = ['professional', 'casual', 'humorous', 'inspiring'];

  const formats = [
    { key: 'blogPost', label: 'Blog Post', emoji: '📝', color: '#a78bfa' },
    { key: 'linkedInPost', label: 'LinkedIn Post', emoji: '💼', color: '#60a5fa' },
    { key: 'twitterThread', label: 'Twitter Thread', emoji: '🐦', color: '#38bdf8' },
    { key: 'youtubeScript', label: 'YouTube Script', emoji: '🎥', color: '#f87171' },
    { key: 'emailNewsletter', label: 'Email Newsletter', emoji: '📧', color: '#34d399' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    if (user?.credits <= 0) {
      setError('No credits remaining. Please upgrade your plan.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/content/generate',
        { topic, tone },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      setResult(res.data.content);
    } catch (err) {
      setError(err.response?.data?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ maxWidth: '860px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '8px' }}>
          Generate Content ✨
        </h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Enter a topic and get 5 content formats instantly</p>
      </div>

      {/* Input card */}
      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px', marginBottom: '24px' }}>

        {/* Topic input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
            Topic or idea
          </label>
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Why every developer should learn AI in 2025"
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#2a2a2a'}
          />
        </div>

        {/* Tone selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
            Tone
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tones.map(t => (
              <button key={t} onClick={() => setTone(t)}
                style={{ padding: '8px 18px', borderRadius: '8px', border: tone === t ? '1px solid #7c3aed' : '1px solid #2a2a2a', background: tone === t ? 'rgba(124,58,237,0.15)' : '#1a1a1a', color: tone === t ? '#a78bfa' : '#666', fontSize: '13px', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {/* Generate button */}
        <button onClick={handleGenerate} disabled={loading || !topic.trim()}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: loading || !topic.trim() ? '#3b1f6e' : '#7c3aed', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: loading || !topic.trim() ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}>
          {loading ? <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={18} />}
          {loading ? 'Generating all 5 formats...' : 'Generate Content'}
        </button>

        {loading && (
          <p style={{ color: '#555', fontSize: '12px', marginTop: '12px' }}>
            ⏳ This takes 10-20 seconds — AI is generating all 5 formats simultaneously...
          </p>
        )}
      </div>

      {/* Results */}
      {result && (
        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
            Generated Content 🎉
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {formats.map(f => {
              const content = result.generatedContent?.[f.key];
              if (!content) return null;
              return (
                <div key={f.key} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', overflow: 'hidden' }}>
                  {/* Format header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #1f1f1f' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>{f.emoji}</span>
                      <span style={{ color: f.color, fontSize: '14px', fontWeight: '600' }}>{f.label}</span>
                    </div>
                    <button onClick={() => handleCopy(content, f.key)}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', background: copied === f.key ? 'rgba(52,211,153,0.1)' : '#1a1a1a', border: copied === f.key ? '1px solid rgba(52,211,153,0.3)' : '1px solid #2a2a2a', color: copied === f.key ? '#34d399' : '#666', padding: '7px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {copied === f.key ? <Check size={13} /> : <Copy size={13} />}
                      {copied === f.key ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  {/* Content */}
                  <div style={{ padding: '20px', color: '#aaa', fontSize: '13px', lineHeight: '1.8', whiteSpace: 'pre-wrap', maxHeight: '280px', overflowY: 'auto' }}>
                    {content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}