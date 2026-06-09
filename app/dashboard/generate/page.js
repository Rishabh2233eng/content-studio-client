'use client';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Copy, Check, Loader, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

export default function Generate() {
  const { user, token, refreshUser } = useAuth();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState('');
  const [step, setStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('blogPost');

  const tones = [
    { value: 'professional', emoji: '💼' },
    { value: 'casual', emoji: '😊' },
    { value: 'humorous', emoji: '😄' },
    { value: 'inspiring', emoji: '🔥' },
  ];

  const formats = [
    { key: 'blogPost', label: 'Blog Post', emoji: '📝', color: '#a78bfa' },
    { key: 'linkedInPost', label: 'LinkedIn', emoji: '💼', color: '#60a5fa' },
    { key: 'twitterThread', label: 'Twitter', emoji: '🐦', color: '#38bdf8' },
    { key: 'youtubeScript', label: 'YouTube', emoji: '🎥', color: '#f87171' },
    { key: 'emailNewsletter', label: 'Email', emoji: '📧', color: '#34d399' },
  ];

  const steps = [
    '🧠 Analyzing your topic...',
    '✍️ Writing blog post...',
    '💼 Crafting LinkedIn post...',
    '🐦 Building Twitter thread...',
    '🎥 Scripting YouTube video...',
    '📧 Writing email newsletter...',
    '✅ Finalizing content...',
  ];

  const markdownComponents = {
    h1: ({node, ...props}) => <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '12px', marginTop: '8px' }} {...props} />,
    h2: ({node, ...props}) => <h2 style={{ color: '#ddd', fontSize: '17px', fontWeight: '600', marginBottom: '10px', marginTop: '16px' }} {...props} />,
    h3: ({node, ...props}) => <h3 style={{ color: '#ccc', fontSize: '15px', fontWeight: '600', marginBottom: '8px', marginTop: '14px' }} {...props} />,
    p: ({node, ...props}) => <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }} {...props} />,
    strong: ({node, ...props}) => <strong style={{ color: '#ddd', fontWeight: '600' }} {...props} />,
    ul: ({node, ...props}) => <ul style={{ color: '#aaa', paddingLeft: '20px', marginBottom: '12px' }} {...props} />,
    ol: ({node, ...props}) => <ol style={{ color: '#aaa', paddingLeft: '20px', marginBottom: '12px' }} {...props} />,
    li: ({node, ...props}) => <li style={{ marginBottom: '6px', lineHeight: '1.7' }} {...props} />,
    blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: '3px solid #7c3aed', paddingLeft: '14px', color: '#888', fontStyle: 'italic', margin: '16px 0' }} {...props} />,
    code: ({node, ...props}) => <code style={{ background: '#1a1a1a', color: '#a78bfa', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }} {...props} />,
    hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid #2a2a2a', margin: '16px 0' }} {...props} />,
  };

  const pollJobStatus = async (jobId, contentId) => {
    let stepIndex = 0;
    setStep(steps[0]);

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/content/status/' + jobId + '?contentId=' + contentId,
          { headers: { Authorization: 'Bearer ' + token } }
        );

        const { status, progress: prog, content } = res.data;
        setProgress(prog || 0);

        if (stepIndex < steps.length - 1) {
          stepIndex++;
          setStep(steps[stepIndex]);
        }

        if (status === 'completed') {
          clearInterval(interval);
          setResult(content);
          setActiveTab('blogPost');
          setLoading(false);
          setStep('✅ Done!');
          await refreshUser();
          toast.success('Content generated successfully! 🎉');
        }

        if (status === 'failed') {
          clearInterval(interval);
          setLoading(false);
          setStep('');
          toast.error('Generation failed. Please try again.');
        }

      } catch (err) {
        clearInterval(interval);
        setLoading(false);
        setStep('');
        toast.error(err.response?.data?.message || 'Polling failed: ' + err.message);
      }
    }, 3000);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) { toast.error('Please enter a topic first!'); return; }
    if (user?.credits <= 0) { toast.error('No credits remaining. Please upgrade your plan.'); return; }

    setLoading(true);
    setResult(null);
    setProgress(0);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/content/generate',
        { topic, tone },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      const { jobId, contentId } = res.data;
      toast.success('Generation started! ⚡');
      pollJobStatus(jobId, contentId);
    } catch (err) {
      setLoading(false);
      setStep('');
      toast.error(err.response?.data?.message || 'Failed to start generation');
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(''), 2000);
  };

  const wordCount = (text) => text?.trim().split(/\s+/).length || 0;
  const activeContent = result?.generatedContent?.[activeTab];
  const activeFormat = formats.find(f => f.key === activeTab);

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '8px' }}>Generate Content ✨</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Enter a topic and get 5 content formats instantly with AI</p>
      </div>

      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px', marginBottom: '24px' }}>
        {user?.credits <= 1 && (
          <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={15} color="#fbbf24" />
            <span style={{ color: '#fbbf24', fontSize: '13px' }}>
              {user.credits === 0 ? 'No credits remaining — upgrade to continue' : 'Only 1 credit remaining!'}
            </span>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Topic or idea</label>
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Why every developer should learn AI in 2025"
            rows={3}
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6', fontFamily: 'inherit' }}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#2a2a2a'}
          />
          <div style={{ color: '#333', fontSize: '12px', marginTop: '6px', textAlign: 'right' }}>{topic.length} characters</div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '10px' }}>Tone</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tones.map(t => (
              <button key={t.value} onClick={() => setTone(t.value)}
                style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '8px', border: tone === t.value ? '1px solid #7c3aed' : '1px solid #2a2a2a', background: tone === t.value ? 'rgba(124,58,237,0.15)' : '#1a1a1a', color: tone === t.value ? '#a78bfa' : '#555', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' }}>
                <span>{t.emoji}</span> {t.value}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '10px', padding: '16px 20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Loader size={16} color="#a78bfa" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
              <span style={{ color: '#a78bfa', fontSize: '14px' }}>{step}</span>
            </div>
            <div style={{ background: '#2a2a2a', borderRadius: '99px', height: '4px' }}>
              <div style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)', height: '4px', borderRadius: '99px', width: progress + '%', transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <p style={{ color: '#444', fontSize: '12px' }}>Processing in background queue...</p>
              <p style={{ color: '#555', fontSize: '12px' }}>{progress}%</p>
            </div>
          </div>
        )}

        <button onClick={handleGenerate} disabled={loading || !topic.trim() || user?.credits <= 0}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: loading || !topic.trim() || user?.credits <= 0 ? '#2a1a4a' : '#7c3aed', color: loading || !topic.trim() ? '#666' : 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: loading || !topic.trim() || user?.credits <= 0 ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
          {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : <><Sparkles size={18} /> Generate Content</>}
        </button>
      </div>

      {result && (
        <div>
          <div style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '12px', padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🎉</span>
              <span style={{ color: '#34d399', fontSize: '14px', fontWeight: '500' }}>5 formats generated for: <span style={{ color: '#6ee7b7' }}>"{result.topic}"</span></span>
            </div>
            <span style={{ color: '#555', fontSize: '12px' }}>1 credit used</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {formats.map(f => (
              <button key={f.key} onClick={() => setActiveTab(f.key)}
                style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '10px', border: activeTab === f.key ? '1px solid ' + f.color + '40' : '1px solid #1f1f1f', background: activeTab === f.key ? f.color + '15' : '#111', color: activeTab === f.key ? f.color : '#555', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
                <span>{f.emoji}</span> {f.label}
              </button>
            ))}
          </div>

          {activeContent && (
            <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #1f1f1f' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{activeFormat?.emoji}</span>
                  <span style={{ color: activeFormat?.color, fontSize: '14px', fontWeight: '600' }}>{activeFormat?.label}</span>
                  <span style={{ color: '#333', fontSize: '12px' }}>{wordCount(activeContent)} words</span>
                </div>
                <button onClick={() => handleCopy(activeContent, activeTab)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: copied === activeTab ? 'rgba(52,211,153,0.1)' : '#1a1a1a', border: copied === activeTab ? '1px solid rgba(52,211,153,0.3)' : '1px solid #2a2a2a', color: copied === activeTab ? '#34d399' : '#666', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}>
                  {copied === activeTab ? <Check size={14} /> : <Copy size={14} />}
                  {copied === activeTab ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ padding: '24px', fontSize: '14px', lineHeight: '1.9', maxHeight: '500px', overflowY: 'auto' }}>
                <ReactMarkdown components={markdownComponents}>{activeContent}</ReactMarkdown>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={() => { setResult(null); setTopic(''); setStep(''); setProgress(0); }}
              style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
              Generate something new
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}