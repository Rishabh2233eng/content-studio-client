'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { History, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { token } = useAuth();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

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

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ color: '#a78bfa', fontSize: '15px' }}>Loading history...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '8px' }}>Content History 📚</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>{contents.length} generation{contents.length !== 1 ? 's' : ''} so far</p>
      </div>

      {contents.length === 0 ? (
        <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '60px', textAlign: 'center' }}>
          <History size={40} color="#333" style={{ margin: '0 auto 16px' }} />
          <div style={{ color: '#555', fontSize: '15px', marginBottom: '8px' }}>No content generated yet</div>
          <div style={{ color: '#444', fontSize: '13px', marginBottom: '20px' }}>Generate your first piece of content to see it here</div>
          <Link href="/dashboard/generate" style={{ background: '#7c3aed', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Generate Now
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {contents.map(c => (
            <div key={c._id} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontSize: '15px', fontWeight: '500', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.topic}
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '11px', padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(124,58,237,0.2)', textTransform: 'capitalize' }}>
                    {c.tone}
                  </span>
                  <span style={{ color: '#444', fontSize: '12px' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                <Link href={'/dashboard/history/' + c._id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#888', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', textDecoration: 'none', cursor: 'pointer' }}>
                  <Eye size={13} /> View
                </Link>
                <button onClick={() => handleDelete(c._id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#ef4444', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
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