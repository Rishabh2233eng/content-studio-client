'use client';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, CreditCard, Zap, Shield, Check } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'free', price: '₹0', period: '/month',
      credits: 5, desc: 'Perfect for trying out',
      features: ['5 credits/month', 'All 5 formats', 'Content history', 'Basic analytics'],
      color: '#666', btnColor: '#2a2a2a', btnText: 'Current Plan'
    },
    {
      name: 'pro', price: '₹999', period: '/month',
      credits: 100, desc: 'For serious creators',
      features: ['100 credits/month', 'All 5 formats', 'Writing style AI', 'Advanced analytics', 'Priority support'],
      color: '#a78bfa', btnColor: '#7c3aed', btnText: 'Upgrade to Pro', popular: true
    },
    {
      name: 'agency', price: '₹2,999', period: '/month',
      credits: 999, desc: 'For teams and agencies',
      features: ['Unlimited credits', 'All 5 formats', 'Team access', 'API access', 'Dedicated support'],
      color: '#fbbf24', btnColor: '#92400e', btnText: 'Contact Us'
    },
  ];

  return (
    <div style={{ maxWidth: '720px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '6px' }}>Profile</h1>
        <p style={{ color: '#555', fontSize: '14px' }}>Manage your account and subscription</p>
      </div>

      {/* Profile card */}
      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px', marginBottom: '20px' }}>

        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid #1f1f1f' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: '600', flexShrink: 0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>{user?.name}</div>
            <div style={{ color: '#555', fontSize: '14px', marginBottom: '8px' }}>{user?.email}</div>
            <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '12px', padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(124,58,237,0.2)', textTransform: 'capitalize' }}>
              {user?.plan} plan
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            { icon: <User size={15} color="#a78bfa" />, label: 'Full Name', value: user?.name },
            { icon: <Mail size={15} color="#60a5fa" />, label: 'Email Address', value: user?.email },
            { icon: <CreditCard size={15} color="#34d399" />, label: 'Current Plan', value: user?.plan, cap: true },
            { icon: <Zap size={15} color="#fbbf24" />, label: 'Credits Remaining', value: user?.credits + ' credits' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {item.icon}
                <span style={{ color: '#444', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>{item.label}</span>
              </div>
              <div style={{ color: '#ddd', fontSize: '14px', fontWeight: '500', textTransform: item.cap ? 'capitalize' : 'none' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
          <Shield size={18} color="#a78bfa" />
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Subscription Plans</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {plans.map(plan => {
            const isActive = user?.plan === plan.name;
            return (
              <div key={plan.name} style={{ border: isActive ? '1px solid rgba(124,58,237,0.4)' : plan.popular ? '1px solid rgba(124,58,237,0.2)' : '1px solid #2a2a2a', background: isActive ? 'rgba(124,58,237,0.08)' : '#1a1a1a', borderRadius: '12px', padding: '20px', position: 'relative' }}>
                {plan.popular && !isActive && (
                  <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#7c3aed', color: '#fff', fontSize: '10px', padding: '3px 10px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: '500' }}>
                    Most popular
                  </div>
                )}
                {isActive && (
                  <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#059669', color: '#fff', fontSize: '10px', padding: '3px 10px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: '500' }}>
                    ✓ Active
                  </div>
                )}
                <div style={{ color: plan.color, fontSize: '13px', fontWeight: '600', textTransform: 'capitalize', marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '2px' }}>
                  {plan.price} <span style={{ color: '#555', fontSize: '13px', fontWeight: '400' }}>{plan.period}</span>
                </div>
                <div style={{ color: '#555', fontSize: '12px', marginBottom: '16px' }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', marginBottom: '18px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#666', fontSize: '12px', padding: '4px 0' }}>
                      <Check size={12} color="#34d399" /> {f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: isActive ? 'default' : 'pointer', border: 'none', background: isActive ? '#1f1f1f' : plan.btnColor, color: isActive ? '#555' : '#fff', opacity: isActive ? 0.7 : 1 }}>
                  {isActive ? '✓ Current Plan' : plan.btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}