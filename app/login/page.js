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

  const inputStyle = { width: '100%', background: '#FFFDF7', border: '1px solid #E8DFD0', color: '#2C1810', padding: '13px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '44px', height: '44px', background: '#C17B3B', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '20px' }}>✦</div>
          <h1 style={{ color: '#2C1810', fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>Welcome back</h1>
          <p style={{ color: '#8B7355', fontSize: '14px' }}>Sign in to your ContentStudio</p>
        </div>
        <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '16px', padding: '32px' }}>
          {error && (
            <div style={{ background: '#FEF2F0', border: '1px solid #FCCDC7', color: '#C0392B', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ color: '#8B7355', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C17B3B'}
                onBlur={e => e.target.style.borderColor = '#E8DFD0'} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#8B7355', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C17B3B'}
                onBlur={e => e.target.style.borderColor = '#E8DFD0'} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#DBA876' : '#C17B3B', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#8B7355', fontSize: '13px', marginTop: '20px' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#C17B3B', textDecoration: 'none', fontWeight: '600' }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}