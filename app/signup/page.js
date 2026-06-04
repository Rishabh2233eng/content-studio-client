'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

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
    try {
      await signup(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', padding: '13px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '44px', height: '44px', background: '#7c3aed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Sparkles size={22} color="white" />
          </div>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '600', marginBottom: '6px' }}>Create your account</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Start generating content with AI today</p>
        </div>

        {/* Card */}
        <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '32px' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="John Doe" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required minLength={6} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#5b21b6' : '#7c3aed', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#555', fontSize: '13px', marginTop: '20px' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: '500' }}>Sign in</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#444', fontSize: '12px', marginTop: '16px' }}>
          5 free credits included • No credit card required
        </p>
      </div>
    </div>
  );
}