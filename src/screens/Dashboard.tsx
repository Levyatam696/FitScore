import { useEffect, useState } from 'react'
import type { ScreenProps } from '../types'

function AnimNum({ to, delay = 0 }: { to: number; delay?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      const dur = 900, t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1)
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [to, delay])
  return <>{n}</>
}

const clsColor = (s: number) => s >= 85 ? '#4ADE80' : s >= 70 ? '#FB923C' : '#F87171'

export default function Dashboard({ navigate, user, avaliados, avaliacoes }: ScreenProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const greetEmoji = hour < 12 ? '🌅' : hour < 18 ? '☀️' : '🌙'

  const firstName = user?.name.split(' ')[0] ?? 'Usuário'
  const avgScore  = Math.round(avaliacoes.reduce((s, a) => s + a.score, 0) / (avaliacoes.length || 1))
  const unsynced  = avaliacoes.filter(a => !a.sincronizado)

  const actions = [
    { label: 'Nova Avaliação', emoji: '📋', screen: 'nova-avaliacao', grad: 'linear-gradient(135deg,rgba(109,40,217,0.25),rgba(168,85,247,0.12))' },
    { label: 'Ver Avaliados',  emoji: '👥', screen: 'avaliados',      grad: 'linear-gradient(135deg,rgba(6,182,212,0.18),rgba(6,182,212,0.06))' },
    { label: 'Exportar',       emoji: '📤', screen: 'exportar',       grad: 'linear-gradient(135deg,rgba(16,185,129,0.18),rgba(16,185,129,0.06))' },
    { label: 'Ajuda',          emoji: '📖', screen: 'ajuda',          grad: 'linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.06))' },
  ]

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-60px', right: '-40px', width: '260px', height: '260px',
        borderRadius: '50%', background: 'radial-gradient(circle,#7C3AED,transparent 70%)',
        filter: 'blur(56px)', opacity: 0.22, pointerEvents: 'none',
        animation: 'floatBlob 14s ease-in-out infinite',
      }}/>
      <div style={{
        position: 'absolute', top: '140px', left: '-60px', width: '200px', height: '200px',
        borderRadius: '50%', background: 'radial-gradient(circle,#E879F9,transparent 70%)',
        filter: 'blur(56px)', opacity: 0.14, pointerEvents: 'none',
        animation: 'floatBlob2 18s ease-in-out infinite',
      }}/>

      <div style={{ padding: '52px 20px 20px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>
              {greetEmoji} {greeting},
            </p>
            <h1 style={{ margin: '2px 0 0', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              {firstName}
            </h1>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>
              🏫 {avaliados[0]?.escola ?? 'EMEF Santos Dumont'}
            </p>
          </div>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#6D28D9,#E879F9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '19px', fontWeight: 800, color: 'white',
            boxShadow: '0 0 0 3px rgba(147,51,234,0.25)',
          }}>{user?.name.charAt(0)}</div>
        </div>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>

        <div className="glass scale-in" style={{
          borderRadius: '24px', padding: '20px',
          background: 'linear-gradient(135deg,rgba(109,40,217,0.18),rgba(232,121,249,0.08))',
          border: '1px solid rgba(147,51,234,0.22)',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <ScoreRing score={avgScore} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#A855F7', letterSpacing: '1.2px' }}>
              🏆 SCORE MÉDIO GERAL
            </p>
            <p style={{ margin: '6px 0 2px', fontSize: '42px', fontWeight: 900, lineHeight: 1, color: clsColor(avgScore) }}>
              <AnimNum to={avgScore} delay={200} />
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
              {avaliacoes.length} avaliações · {avaliados.length} alunos
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
          {[
            { label: 'Avaliados', value: avaliados.length, emoji: '👤', delay: 100 },
            { label: 'Avaliações', value: avaliacoes.length, emoji: '📊', delay: 200 },
            { label: 'Sem sync', value: unsynced.length, emoji: '⚡', delay: 300 },
          ].map((s, i) => (
            <div key={s.label} className="glass item-in" style={{
              borderRadius: '20px', padding: '14px 10px', textAlign: 'center',
              animationDelay: `${i * 60}ms`,
            }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{s.emoji}</div>
              <div className="grad-text" style={{ fontSize: '26px', fontWeight: 800 }}>
                <AnimNum to={s.value} delay={s.delay} />
              </div>
              <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '3px', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {unsynced.length > 0 && (
          <div className="glass item-in" style={{
            borderRadius: '16px', padding: '14px 16px',
            background: 'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.04))',
            border: '1px solid rgba(245,158,11,0.2)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: '#FB923C',
              boxShadow: '0 0 8px #FB923C',
              animation: 'pulse-dot 1.5s ease-in-out infinite',
            }}/>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#FBBF24' }}>
                ⚡ {unsynced.length} pendente{unsynced.length > 1 ? 's' : ''} de sincronização
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6B7280' }}>
                Aguardando conexão com Google Planilhas
              </p>
            </div>
            <button onClick={() => navigate('exportar')} style={{
              background: 'linear-gradient(135deg,#D97706,#F59E0B)',
              border: 'none', borderRadius: '10px',
              color: 'white', fontSize: '11px', fontWeight: 700,
              padding: '7px 12px', cursor: 'pointer', flexShrink: 0,
            }}>Sync</button>
          </div>
        )}

        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            ⚡ AÇÕES RÁPIDAS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {actions.map((a, i) => (
              <button key={a.label} onClick={() => navigate(a.screen as any)}
                className="glass lift item-in"
                style={{
                  background: a.grad, border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px', padding: '18px', cursor: 'pointer', textAlign: 'left',
                  animationDelay: `${i * 50 + 200}ms`,
                }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{a.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#F4F4F8' }}>{a.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
              🕐 RECENTES
            </p>
            <button onClick={() => navigate('avaliados')} style={{
              background: 'none', border: 'none', color: '#A855F7',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
            }}>Ver todos →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {avaliacoes.slice(0, 5).map((av, i) => {
              const al = avaliados.find(a => a.id === av.avaliadoId)
              return (
                <button key={av.id} onClick={() => navigate('relatorio', { avaliacaoId: av.id })}
                  className="glass lift item-in"
                  style={{
                    borderRadius: '18px', padding: '14px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
                    animationDelay: `${i * 70 + 300}ms`,
                  }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0,
                    background: al?.gender === 'F'
                      ? 'linear-gradient(135deg,#BE185D,#E879F9)'
                      : 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', fontWeight: 800, color: 'white',
                  }}>{al?.name.charAt(0)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#F4F4F8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {al?.name}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6B7280' }}>
                      {av.tipo === 'saude' ? '❤️ Saúde' : '⚡ Desempenho'} · {av.data}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontSize: '18px', fontWeight: 900, color: clsColor(av.score),
                      textShadow: `0 0 12px ${clsColor(av.score)}66`,
                    }}>{av.score}</div>
                    {!av.sincronizado && <div style={{ fontSize: '9px', color: '#FB923C', fontWeight: 700, marginTop: '1px' }}>⚡ offline</div>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const cx = 44, cy = 44, r = 36, sw = 7
  const circ = 2 * Math.PI * r
  const arcTotal = circ * 0.75
  const arcGap = circ - arcTotal
  const filled = arcTotal * (score / 100)
  const ROT = 135
  return (
    <svg viewBox="0 0 88 88" width="88" height="88" style={{ flexShrink: 0 }} className="ring-glow">
      <defs>
        <linearGradient id="dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#6D28D9"/>
          <stop offset="60%"  stopColor="#A855F7"/>
          <stop offset="100%" stopColor="#E879F9"/>
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${arcTotal} ${arcGap}`} transform={`rotate(${ROT} ${cx} ${cy})`}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#dGrad)" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${filled} ${circ - filled}`} transform={`rotate(${ROT} ${cx} ${cy})`}/>
    </svg>
  )
}
