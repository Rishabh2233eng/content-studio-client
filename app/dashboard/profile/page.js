'use client';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, CreditCard, Zap, Shield, Check } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const plans = [
    { name: 'free', price: '₹0', period: '/month', credits: 5, desc: 'Perfect for trying out', features: ['5 credits/month', 'All 5 formats', 'Content history', 'Basic analytics'], color: '#8B7355', btnText: 'Current Plan' },
    { name: 'pro', price: '₹999', period: '/month', credits: 100, desc: 'For serious creators', features: ['100 credits/month', 'All 5 formats', 'Writing style AI', 'Advanced analytics', 'Priority support'], color: '#C17B3B', btnText: 'Upgrade to Pro', popular: true },
    { name: 'agency', price: '₹2,999', period: '/month', credits: 999, desc: 'For teams and agencies', features: ['Unlimited credits', 'All 5 formats', 'Team access', 'API access', 'Dedicated support'], color: '#8B5E3C', btnText: 'Contact Us' },
  ];

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#2C1810', fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>Profile</h1>
        <p style={{ color: '#8B7355', fontSize: '14px' }}>Manage your account and subscription</p>
      </div>

      {/* Profile card */}
      <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '28px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid #E8DFD0' }}>
          <div style={{ width: '64px', height: '64px', background: '#C17B3B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: '700', flexShrink: 0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ color: '#2C1810', fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{user?.name}</div>
            <div style={{ color: '#8B7355', fontSize: '14px', marginBottom: '8px' }}>{user?.email}</div>
            <span style={{ background: '#F0E6D3', color: '#C17B3B', fontSize: '12px', padding: '3px 10px', borderRadius: '99px', border: '1px solid #DCC9A8', textTransform: 'capitalize', fontWeight: '500' }}>
              {user?.plan} plan
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            { icon: <User size={15} color="#C17B3B" />, label: 'Full Name', value: user?.name },
            { icon: <Mail size={15} color="#8B5E3C" />, label: 'Email Address', value: user?.email },
            { icon: <CreditCard size={15} color="#A0522D" />, label: 'Current Plan', value: user?.plan, cap: true },
            { icon: <Zap size={15} color="#D2691E" />, label: 'Credits Remaining', value: user?.credits + ' credits' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F5F0E8', border: '1px solid #E8DFD0', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {item.icon}
                <span style={{ color: '#B5A088', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>{item.label}</span>
              </div>
              <div style={{ color: '#2C1810', fontSize: '14px', fontWeight: '600', textTransform: item.cap ? 'capitalize' : 'none' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div style={{ background: '#FFFDF7', border: '1px solid #E8DFD0', borderRadius: '14px', padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
          <Shield size={18} color="#C17B3B" />
          <h2 style={{ color: '#2C1810', fontSize: '16px', fontWeight: '700' }}>Subscription Plans</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {plans.map(plan => {
            const isActive = user?.plan === plan.name;
            return (
              <div key={plan.name} style={{ border: isActive ? '2px solid #C17B3B' : plan.popular ? '1px solid #DCC9A8' : '1px solid #E8DFD0', background: isActive ? '#FDF6EE' : '#F5F0E8', borderRadius: '12px', padding: '20px', position: 'relative' }}>
                {plan.popular && !isActive && (
                  <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#C17B3B', color: 'white', fontSize: '10px', padding: '3px 10px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: '600' }}>
                    Most popular
                  </div>
                )}
                {isActive && (
                  <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#2D6A4F', color: 'white', fontSize: '10px', padding: '3px 10px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: '600' }}>
                    ✓ Active
                  </div>
                )}
                <div style={{ color: plan.color, fontSize: '13px', fontWeight: '600', textTransform: 'capitalize', marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ color: '#2C1810', fontSize: '24px', fontWeight: '700', marginBottom: '2px' }}>
                  {plan.price} <span style={{ color: '#B5A088', fontSize: '13px', fontWeight: '400' }}>{plan.period}</span>
                </div>
                <div style={{ color: '#8B7355', fontSize: '12px', marginBottom: '16px' }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', marginBottom: '18px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#5C4A35', fontSize: '12px', padding: '4px 0' }}>
                      <Check size={12} color="#C17B3B" /> {f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: isActive ? 'default' : 'pointer', border: 'none', background: isActive ? '#E8DFD0' : '#C17B3B', color: isActive ? '#8B7355' : 'white' }}>
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