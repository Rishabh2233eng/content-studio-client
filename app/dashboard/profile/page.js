'use client';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, CreditCard, Zap, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const plans = [
    { name: 'free', credits: 5, price: '₹0', color: '#666', desc: 'Perfect for trying out' },
    { name: 'pro', credits: 100, price: '₹999/mo', color: '#a78bfa', desc: 'For serious creators' },
    { name: 'agency', credits: 999, price: '₹2999/mo', color: '#fbbf24', desc: 'For teams & agencies' },
  ];

  return (
    <div style={{ maxWidth: '700px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '600', marginBottom: '8px' }}>Profile</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Manage your account and subscription</p>
      </div>

      {/* Profile card */}
      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ width: '64px', height: '64px', background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: '600', flexShrink: 0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>{user?.name}</div>
            <div style={{ color: '#555', fontSize: '14px' }}>{user?.email}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { icon: <User size={16} color="#a78bfa" />, label: 'Full Name', value: user?.name },
            { icon: <Mail size={16} color="#60a5fa" />, label: 'Email', value: user?.email },
            { icon: <CreditCard size={16} color="#34d399" />, label: 'Current Plan', value: user?.plan, capitalize: true },
            { icon: <Zap size={16} color="#fbbf24" />, label: 'Credits Remaining', value: user?.credits + ' credits' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {item.icon}
                <span style={{ color: '#555', fontSize: '12px' }}>{item.label}</span>
              </div>
              <div style={{ color: '#ddd', fontSize: '14px', fontWeight: '500', textTransform: item.capitalize ? 'capitalize' : 'none' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Shield size={18} color="#a78bfa" />
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Subscription Plans</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {plans.map(plan => {
            const isActive = user?.plan === plan.name;
            return (
              <div key={plan.name} style={{ border: isActive ? `1px solid ${plan.color}50` : '1px solid #2a2a2a', background: isActive ? `${plan.color}10` : '#1a1a1a', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <div style={{ color: plan.color, fontSize: '13px', fontWeight: '600', textTransform: 'capitalize', marginBottom: '8px' }}>
                  {plan.name} {isActive && '✓'}
                </div>
                <div style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>{plan.price}</div>
                <div style={{ color: '#555', fontSize: '12px', marginBottom: '12px' }}>{plan.credits} credits/mo</div>
                <div style={{ color: '#444', fontSize: '11px', marginBottom: '16px' }}>{plan.desc}</div>
                {isActive ? (
                  <div style={{ background: `${plan.color}20`, color: plan.color, fontSize: '12px', padding: '7px', borderRadius: '8px', fontWeight: '500' }}>
                    Current Plan
                  </div>
                ) : (
                  <button style={{ width: '100%', background: '#7c3aed', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>
                    Upgrade
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}