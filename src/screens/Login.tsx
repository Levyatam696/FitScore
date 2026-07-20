import { useState } from 'react'
import type { ScreenProps } from '../types'
import { USERS } from '../data'

export default function Login({ navigate, setUser }: ScreenProps) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const doLogin = () => {
    setError('')
    setLoading(true)
    setTimeout(() => {
      const u = USERS.find(u => u.email === email.trim())
      if (u && password === '123456') {
        setUser(u)
        navigate('dashboard')
      } else {
        setError('E-mail ou senha incorretos')
        setLoading(false)
      }
    }, 900)
  }

  const doSocial = () => {
    setLoading(true)
    setTimeout(() => {
      setUser(USERS[1])
      navigate('dashboard')
    }, 1100)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    backgroundColor: '#0A0A1A', border: '1.5px solid #1E1B3A',
    borderRadius: '12px', color: 'var(--text)', fontSize: '15px',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  }

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#07070F',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes blobA { 0%,100% { transform:scale(1) translate(0,0); } 50% { transform:scale(1.12) translate(12px,-12px); } }
        @keyframes blobB { 0%,100% { transform:scale(1) translate(0,0); } 50% { transform:scale(1.08) translate(-8px,10px); } }
        @keyframes loginIn { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        .blob-a { animation: blobA 9s ease-in-out infinite; }
        .blob-b { animation: blobB 11s ease-in-out infinite; }
        .card-in { animation: loginIn 0.55s cubic-bezier(0.22,1,0.36,1) both 0.1s; }
        .logo-in { animation: loginIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .field:focus { border-color: #9333EA !important; box-shadow: 0 0 0 3px #9333EA22 !important; }
        .social:hover { opacity:0.88; transform:translateY(-1px); }
        .social { transition: opacity 0.15s, transform 0.15s; }
        .btn-primary:hover:not(:disabled) { opacity:0.9; transform:translateY(-1px); }
        .btn-primary { transition: opacity 0.15s, transform 0.15s; }
      `}</style>

      {/* Background blobs */}
      <div className="blob-a" style={{
        position: 'absolute', top: '-100px', left: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, #7C3AED, transparent 70%)',
        filter: 'blur(48px)', opacity: 0.28, pointerEvents: 'none',
      }} />
      <div className="blob-b" style={{
        position: 'absolute', bottom: '-120px', right: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, #E879F9, transparent 70%)',
        filter: 'blur(48px)', opacity: 0.22, pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div className="logo-in" style={{ marginBottom: '28px', textAlign: 'center' }}>
        <div style={{
          fontSize: '30px', fontWeight: 800,
          background: 'linear-gradient(135deg, #9333EA, #C084FC, #E879F9)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>FitScore</div>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: '#4C1D95', marginTop: '2px' }}>
          EDUCAÇÃO FÍSICA
        </div>
      </div>

      {/* Card */}
      <div className="card-in" style={{
        width: '100%', maxWidth: '380px',
        backgroundColor: '#0D0D1C', borderRadius: '24px',
        border: '1px solid #1E1B3A', padding: '28px 22px',
      }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 700 }}>Bem-vindo de volta</h2>
        <p style={{ margin: '0 0 22px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Entre para continuar avaliando
        </p>

        {/* Email */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.8px' }}>E-MAIL</label>
          <input
            className="field"
            style={{ ...inputStyle, marginTop: '6px' }}
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: error ? '10px' : '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.8px' }}>SENHA</label>
          <div style={{ position: 'relative', marginTop: '6px' }}>
            <input
              className="field"
              style={{ ...inputStyle, paddingRight: '44px' }}
              type={showPass ? 'text' : 'password'}
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && doLogin()}
            />
            <button onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px',
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                {showPass
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {error && <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--danger)', textAlign: 'center' }}>{error}</p>}

        <div style={{ textAlign: 'right', marginBottom: '16px' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>
            Esqueceu a senha?
          </button>
        </div>

        {/* Login button */}
        <button
          className="btn-primary"
          onClick={doLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            background: loading ? '#4C1D95' : 'linear-gradient(135deg, #7C3AED, #A855F7)',
            border: 'none', borderRadius: '12px',
            color: 'white', fontSize: '15px', fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {loading
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="3" strokeDasharray="28 56" />
              </svg>
            : 'Entrar'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1E1B3A' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>ou continue com</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1E1B3A' }} />
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="social" onClick={doSocial} style={{
            flex: 1, padding: '12px',
            backgroundColor: 'white', border: 'none', borderRadius: '12px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontSize: '14px', fontWeight: 600, color: '#1F1F1F',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          <button className="social" onClick={doSocial} style={{
            flex: 1, padding: '12px',
            backgroundColor: '#161B22', border: '1.5px solid #30363D', borderRadius: '12px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontSize: '14px', fontWeight: 600, color: 'white',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </button>
        </div>

        <p style={{ textAlign: 'center', margin: '18px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
          Não tem conta?{' '}
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '13px' }}>
            Criar conta
          </button>
        </p>

        {/* Demo hint */}
        <div style={{
          marginTop: '14px', padding: '10px 14px',
          backgroundColor: '#12102A', borderRadius: '10px', border: '1px solid #2D1B69',
        }}>
          <p style={{ margin: 0, fontSize: '10px', color: '#7C3AED', fontWeight: 700, letterSpacing: '1px' }}>DEMO</p>
          <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Admin: admin@fitscore.app<br />
            Avaliador: ana.lima@escola.edu.br<br />
            <span style={{ color: '#C084FC' }}>Senha: 123456</span>
          </p>
        </div>
      </div>
    </div>
  )
}
