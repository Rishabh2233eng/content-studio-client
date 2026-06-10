'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { History, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { token } = useAuth();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/content', {
        headers: { Authorization: 'Bearer ' + token }
      });
      setContents(res.data.contents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/content/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setContents(contents.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toneColors = {
    professional: '#a78bfa',
    casual: '#60a5fa',
    humorous: '#fbbf24',
    inspiring: '#f87171'
  };

  const filtered = contents.filter(c =>
    c.topic.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ maxWidth: '860px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ background: '#1a1a1a', height: '28px', width: '180px', borderRadius: '8px', marginBottom: '8px' }} />
          <div style={{ background: '#1a1a1a', height: '14px', width: '100px', borderRadius: '8px' }} />
        </div>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '20px 24px', marginBottom: '10px', height: '80px' }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '860px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>Content History 📚</h1>
          <p style={{ color: '#555', fontSize: '14px' }}>{contents.length} generation{contents.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link href="/dashboard/generate" style={{ background: '#7c3aed', color: '#fff', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          + Generate new
        </Link>
      </div>

      {/* Search */}
      {contents.length > 0 && (
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={14} color="#555" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by topic..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: '#111', border: '1px solid #1f1f1f', color: '#fff', padding: '11px 14px 11px 38px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#1f1f1f'}
          />
        </div>
      )}

      {filtered.length === 0 && contents.length === 0 ? (
        <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '60px', textAlign: 'center' }}>
          <History size={40} color="#2a2a2a" style={{ margin: '0 auto 16px' }} />
          <div style={{ color: '#444', fontSize: '15px', marginBottom: '8px' }}>No content generated yet</div>
          <div style={{ color: '#333', fontSize: '13px', marginBottom: '20px' }}>Generate your first piece of content to see it here</div>
          <Link href="/dashboard/generate" style={{ background: '#7c3aed', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Generate Now
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#444', fontSize: '14px' }}>
          No results for "{search}"
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(c => (
            <div key={c._id} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#ddd', fontSize: '14px', fontWeight: '500', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.topic}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(124,58,237,0.1)', color: toneColors[c.tone] || '#a78bfa', fontSize: '11px', padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(124,58,237,0.15)', textTransform: 'capitalize' }}>
                    {c.tone}
                  </span>
                  <span style={{ color: '#333', fontSize: '12px' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', gap: '4px' }}>
                    {['📝','💼','🐦','🎥','📧'].map((e, i) => (
                      <span key={i} style={{ fontSize: '12px' }}>{e}</span>
                    ))}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                <Link href={'/dashboard/history/' + c._id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#888', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', textDecoration: 'none' }}>
                  <Eye size={13} /> View
                </Link>
                <button onClick={() => handleDelete(c._id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)', color: '#ef4444', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}