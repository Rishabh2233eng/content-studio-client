'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      await signup(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: '#E8E2D8',
    border: '1px solid #D4C9B8',
    color: '#1E0F08',
    padding: '13px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'var(--font-body, sans-serif)' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#1E0F08', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', transform: 'rotate(-4deg)' }}>
            <span style={{ fontSize: '18px', color: '#E8C89A' }}>✦</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#1E0F08', fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>Create account</h1>
          <p style={{ color: '#7A6555', fontSize: '14px' }}>Start generating content with AI</p>
        </div>

        <div style={{ background: '#E8E2D8', border: '1px solid #D4C9B8', borderRadius: '18px', padding: '32px', boxShadow: '0 8px 32px rgba(30,15,8,0.08)' }}>
          {error && (
            <div style={{ background: '#F5E8E8', border: '1px solid #D4AAAA', color: '#8B1A1A', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#7A6555', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A0622A'}
                onBlur={e => e.target.style.borderColor = '#D4C9B8'}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#7A6555', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A0622A'}
                onBlur={e => e.target.style.borderColor = '#D4C9B8'}
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={{ color: '#7A6555', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A0622A'}
                onBlur={e => e.target.style.borderColor = '#D4C9B8'}
              />
            </div>

            <p style={{ color: '#9A8878', fontSize: '12px', marginBottom: '22px' }}>
              Minimum 8 characters
            </p>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: loading ? '#C4AE8A' : '#1E0F08', color: '#EDE8DF', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#7A6555', fontSize: '13px', marginTop: '20px' }}>
            Already have one?{' '}
            <Link href="/login" style={{ color: '#A0622A', textDecoration: 'none', fontWeight: '700' }}>Sign in</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#9A8878', fontSize: '12px', marginTop: '16px' }}>
          5 free credits included · no card required
        </p>
      </div>
    </div>
  );
}