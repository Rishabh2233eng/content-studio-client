'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ContentView({ params }) {
  const { token } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState('');
  const [activeTab, setActiveTab] = useState('blogPost');

  const formats = [
    { key: 'blogPost', label: 'Blog Post', emoji: '📝', color: '#C17B3B' },
    { key: 'linkedInPost', label: 'LinkedIn', emoji: '💼', color: '#8B5E3C' },
    { key: 'twitterThread', label: 'Twitter', emoji: '🐦', color: '#A0522D' },
    { key: 'youtubeScript', label: 'YouTube', emoji: '🎥', color: '#D2691E' },
    { key: 'emailNewsletter', label: 'Email', emoji: '📧', color: '#CD853F' },
  ];

  const markdownComponents = {
    h1: ({node, ...props}) => <h1 style={{ color: '#2C1810', fontSize: '20px', fontWeight: '700', marginBottom: '12px', marginTop: '8px' }} {...props} />,
    h2: ({node, ...props}) => <h2 style={{ color: '#3D2314', fontSize: '17px', fontWeight: '600', marginBottom: '10px', marginTop: '16px' }} {...props} />,
    h3: ({node, ...props}) => <h3 style={{ color: '#5C4A35', fontSize: '15px', fontWeight: '600', marginBottom: '8px', marginTop: '14px' }} {...props} />,
    p: ({node, ...props}) => <p style={{ color: '#5C4A35', fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }} {...props} />,
    strong: ({node, ...props}) => <strong style={{ color: '#2C1810', fontWeight: '700' }} {...props} />,
    ul: ({node, ...props}) => <ul style={{ color: '#5C4A35', paddingLeft: '20px', marginBottom: '12px' }} {...props} />,
    ol: ({node, ...props}) => <ol style={{ color: '#5C4A35', paddingLeft: '20px', marginBottom: '12px' }} {...props} />,
    li: ({node, ...props}) => <li style={{ marginBottom: '6px', lineHeight: '1.7' }} {...props} />,
    blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: '3px solid #C17B3B', paddingLeft: '14px', color: '#8B7355', fontStyle: 'italic', margin: '16px 0' }} {...props} />,
    code: ({node, ...props}) => <code style={{ background: '#F0E6D3', color: '#C17B3B', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }} {...props} />,
    hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid #E8DFD0', margin: '16px 0' }} {...props} />,
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          API_URL + '/content/' + params.id,
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
        API_URL + '/content/' + params.id,
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
        <div style={{ color: '#C17B3B' }}>Loading content...</div>
      </div>
    );
  }

  if (!content) return null;

  const activeContent = content.generatedContent?.[activeTab];
  const activeFormat = formats.find(f => f.key === activeTab);

  return (
    <div style={{ maxWidth: '860px' }}>
      <Link href="/dashboard/history" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8B7355', fontSize: '13px', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft size={15} /> Back to History
      </Link>

      <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '24px 28px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: '#2C1810', fontSize: '20px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4' }}>{content.topic}</h1>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ background: '#F0E6D3', color: '#C17B3B', fontSize: '12px', padding: '4px 12px', borderRadius: '99px', border: '1px solid #DCC9A8', textTransform: 'capitalize' }}>{content.tone}</span>
              <span style={{ color: '#B5A088', fontSize: '12px' }}>{new Date(content.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <button onClick={handleDelete} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF2F0', border: '1px solid #FCCDC7', color: '#C0392B', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {formats.map(f => (
          <button key={f.key} onClick={() => setActiveTab(f.key)}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '10px', border: activeTab === f.key ? '1px solid ' + f.color : '1px solid #E8DFD0', background: activeTab === f.key ? '#F0E6D3' : '#FFFDF7', color: activeTab === f.key ? f.color : '#8B7355', fontSize: '13px', fontWeight: activeTab === f.key ? '600' : '400', cursor: 'pointer', transition: 'all 0.15s' }}>
            <span>{f.emoji}</span> {f.label}
          </button>
        ))}
      </div>

      {activeContent && (
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #E8DFD0', background: '#FAF7F2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>{activeFormat?.emoji}</span>
              <span style={{ color: activeFormat?.color, fontSize: '14px', fontWeight: '600' }}>{activeFormat?.label}</span>
            </div>
            <button onClick={() => handleCopy(activeContent, activeTab)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: copied === activeTab ? '#F0FAF4' : '#F5F0E8', border: copied === activeTab ? '1px solid #B8DFC8' : '1px solid #E8DFD0', color: copied === activeTab ? '#2D6A4F' : '#8B7355', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}>
              {copied === activeTab ? <Check size={14} /> : <Copy size={14} />}
              {copied === activeTab ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ padding: '24px', fontSize: '14px', lineHeight: '1.9', minHeight: '300px', maxHeight: '500px', overflowY: 'auto' }}>
            <ReactMarkdown components={markdownComponents}>{activeContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}