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
      <div style={{ minHeight: '100vh', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#C17B3B', fontSize: '16px' }}>Loading...</div>
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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F0E8', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{ width: '240px', background: '#FFFDF7', borderRight: '1px solid #E8DFD0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', top: 0, left: 0 }}>

        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #E8DFD0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: '#C17B3B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>
            ✦
          </div>
          <span style={{ color: '#2C1810', fontWeight: '700', fontSize: '16px' }}>ContentStudio</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 14px', borderRadius: '10px', marginBottom: '4px',
                  background: isActive ? '#F0E6D3' : 'transparent',
                  border: isActive ? '1px solid #DCC9A8' : '1px solid transparent',
                  color: isActive ? '#C17B3B' : '#8B7355',
                  fontSize: '14px', fontWeight: isActive ? '600' : '500', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}>
                  <Icon size={17} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px', borderTop: '1px solid #E8DFD0' }}>
          {/* Credits */}
          <div style={{ background: '#F5F0E8', borderRadius: '12px', padding: '14px', marginBottom: '12px', border: '1px solid #E8DFD0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#8B7355', fontSize: '12px' }}>Credits remaining</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#C17B3B' }}>
                <Zap size={13} />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{user.credits}</span>
              </div>
            </div>
            <div style={{ background: '#E8DFD0', borderRadius: '99px', height: '4px' }}>
              <div style={{ background: '#C17B3B', height: '4px', borderRadius: '99px', width: `${creditPct}%`, transition: 'width 0.3s' }} />
            </div>
            <div style={{ color: '#B5A088', fontSize: '11px', marginTop: '6px', textTransform: 'capitalize' }}>{user.plan} plan</div>
          </div>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 6px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', background: '#C17B3B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: '600', flexShrink: 0 }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#2C1810', fontSize: '13px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div style={{ color: '#B5A088', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            </div>
          </div>

          {/* Logout */}
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', color: '#8B7355', background: 'transparent', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', width: '100%', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C0392B'; e.currentTarget.style.background = '#FEF2F0'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8B7355'; e.currentTarget.style.background = 'transparent'; }}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}