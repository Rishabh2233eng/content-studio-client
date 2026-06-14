'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { History, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HistoryPage() {
  const { token } = useAuth();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(API_URL + '/content', {
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
      await axios.delete(API_URL + '/content/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setContents(contents.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toneColors = {
    professional: '#C17B3B',
    casual: '#8B5E3C',
    humorous: '#D2691E',
    inspiring: '#A0522D'
  };

  const filtered = contents.filter(c =>
    c.topic.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ maxWidth: '860px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ background: '#E8DFD0', height: '28px', width: '180px', borderRadius: '8px', marginBottom: '8px' }} />
          <div style={{ background: '#E8DFD0', height: '14px', width: '100px', borderRadius: '8px' }} />
        </div>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '20px 24px', marginBottom: '10px', height: '80px' }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#2C1810', fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>Content History 📚</h1>
          <p style={{ color: '#8B7355', fontSize: '14px' }}>{contents.length} generation{contents.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link href="/dashboard/generate" style={{ background: '#C17B3B', color: 'white', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          + Generate new
        </Link>
      </div>

      {contents.length > 0 && (
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={14} color="#B5A088" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by topic..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: '#FFFDF7', border: '1px solid #E8DFD0', color: '#2C1810', padding: '11px 14px 11px 38px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#C17B3B'}
            onBlur={e => e.target.style.borderColor = '#E8DFD0'}
          />
        </div>
      )}

      {filtered.length === 0 && contents.length === 0 ? (
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '60px', textAlign: 'center' }}>
          <History size={40} color="#DCC9A8" style={{ margin: '0 auto 16px' }} />
          <div style={{ color: '#8B7355', fontSize: '15px', marginBottom: '8px' }}>No content generated yet</div>
          <div style={{ color: '#B5A088', fontSize: '13px', marginBottom: '20px' }}>Generate your first piece of content to see it here</div>
          <Link href="/dashboard/generate" style={{ background: '#C17B3B', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
            Generate Now
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8B7355', fontSize: '14px' }}>
          No results for "{search}"
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(c => (
            <div key={c._id} style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#2C1810', fontSize: '14px', fontWeight: '600', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.topic}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ background: '#F0E6D3', color: toneColors[c.tone] || '#C17B3B', fontSize: '11px', padding: '3px 10px', borderRadius: '99px', border: '1px solid #DCC9A8', textTransform: 'capitalize', fontWeight: '500' }}>
                    {c.tone}
                  </span>
                  <span style={{ color: '#B5A088', fontSize: '12px' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', gap: '3px' }}>
                    {['📝','💼','🐦','🎥','📧'].map((e, i) => (
                      <span key={i} style={{ fontSize: '12px' }}>{e}</span>
                    ))}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                <Link href={'/dashboard/history/' + c._id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F5F0E8', border: '1px solid #E8DFD0', color: '#8B7355', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>
                  <Eye size={13} /> View
                </Link>
                <button onClick={() => handleDelete(c._id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF2F0', border: '1px solid #FCCDC7', color: '#C0392B', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}>
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