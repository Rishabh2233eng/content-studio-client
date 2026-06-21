'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, History, LayoutDashboard, LogOut, Zap, User, TrendingUp } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', background: '#EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#A0622A', fontSize: '16px', fontFamily: 'var(--font-display)' }}>Loading...</div>
      </div>
    );
  }

  const handleLogout = () => { logout(); router.push('/'); };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/generate', icon: Sparkles, label: 'Generate' },
    { href: '/dashboard/history', icon: History, label: 'History' },
    { href: '/dashboard/analytics', icon: TrendingUp, label: 'Analytics' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  const creditPct = Math.min((user.credits / 5) * 100, 100);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#EDE8DF', fontFamily: 'var(--font-body, sans-serif)' }}>

      <aside style={{ width: '240px', background: '#E0D8CC', borderRight: '1px solid #D4C9B8', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', top: 0, left: 0 }}>

        <div style={{ padding: '22px 20px', borderBottom: '1px solid #D4C9B8', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', background: '#1E0F08', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: 'rotate(-4deg)' }}>
            <span style={{ fontSize: '13px', color: '#E8C89A' }}>✦</span>
          </div>
          <span style={{ color: '#1E0F08', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '16px' }}>ContentStudio</span>
        </div>

        <nav style={{ flex: 1, padding: '14px 10px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 14px', borderRadius: '10px', marginBottom: '3px', background: isActive ? '#D4C4A8' : 'transparent', border: isActive ? '1px solid #C4AE8A' : '1px solid transparent', color: isActive ? '#1E0F08' : '#7A6555', fontSize: '14px', fontWeight: isActive ? '600' : '500', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <Icon size={16} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '14px', borderTop: '1px solid #D4C9B8' }}>
          <div style={{ background: '#D8D0C4', borderRadius: '12px', padding: '14px', marginBottom: '12px', border: '1px solid #C8BBA8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#7A6555', fontSize: '12px' }}>Credits remaining</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#A0622A' }}>
                <Zap size={12} />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>{user.credits}</span>
              </div>
            </div>
            <div style={{ background: '#C8BBA8', borderRadius: '99px', height: '4px' }}>
              <div style={{ background: '#A0622A', height: '4px', borderRadius: '99px', width: `${creditPct}%`, transition: 'width 0.3s' }} />
            </div>
            <div style={{ color: '#9A8878', fontSize: '11px', marginTop: '6px', textTransform: 'capitalize' }}>{user.plan} plan</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 6px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', background: '#1E0F08', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8C89A', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#1E0F08', fontSize: '13px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div style={{ color: '#9A8878', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            </div>
          </div>

          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', color: '#7A6555', background: 'transparent', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', width: '100%', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#8B1A1A'; e.currentTarget.style.background = 'rgba(139,26,26,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7A6555'; e.currentTarget.style.background = 'transparent'; }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}