'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', background: '#E8E2D8', border: '1px solid #D4C9B8', color: '#1E0F08', padding: '13px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' };

  return (
    <div style={{ minHeight: '100vh', background: '#EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'var(--font-body, sans-serif)' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#1E0F08', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', transform: 'rotate(-4deg)' }}>
            <span style={{ fontSize: '18px', color: '#E8C89A' }}>✦</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#1E0F08', fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>Welcome back</h1>
          <p style={{ color: '#7A6555', fontSize: '14px' }}>Sign in to ContentStudio</p>
        </div>
        <div style={{ background: '#E8E2D8', border: '1px solid #D4C9B8', borderRadius: '18px', padding: '32px', boxShadow: '0 8px 32px rgba(30,15,8,0.08)' }}>
          {error && (
            <div style={{ background: '#F5E8E8', border: '1px solid #D4AAAA', color: '#8B1A1A', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#7A6555', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A0622A'}
                onBlur={e => e.target.style.borderColor = '#D4C9B8'} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#7A6555', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A0622A'}
                onBlur={e => e.target.style.borderColor = '#D4C9B8'} />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', background: loading ? '#C4AE8A' : '#1E0F08', color: '#EDE8DF', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s', fontFamily: 'var(--font-body)' }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#7A6555', fontSize: '13px', marginTop: '20px' }}>
            No account?{' '}
            <Link href="/signup" style={{ color: '#A0622A', textDecoration: 'none', fontWeight: '700' }}>Sign up free</Link>
          </p>
        </div>
        <p style={{ textAlign: 'center', color: '#9A8878', fontSize: '12px', marginTop: '16px' }}>5 free credits on signup</p>
      </div>
    </div>
  );
}