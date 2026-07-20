import type { ScreenProps } from '../types'
import { USERS } from '../data'

const clsColor = (s: number) => s >= 85 ? '#4ADE80' : s >= 70 ? '#FB923C' : '#F87171'

export default function Admin({ navigate, avaliados, avaliacoes }: ScreenProps) {
  const avaliadores = USERS.filter(u => u.role === 'avaliador')
  const avgScore = avaliacoes.length
    ? Math.round(avaliacoes.reduce((s, a) => s + a.score, 0) / avaliacoes.length)
    : 0
  const unsynced = avaliacoes.filter(a => !a.sincronizado).length
  const topScore = Math.max(...avaliacoes.map(a => a.score), 0)

  const stats = [
    { label: 'Avaliados',    value: avaliados.length,   emoji: '👤', color: '#C084FC' },
    { label: 'Avaliações',   value: avaliacoes.length,  emoji: '📊', color: '#60A5FA' },
    { label: 'Score Médio',  value: avgScore,            emoji: '🏆', color: clsColor(avgScore) },
    { label: 'Score Máximo', value: topScore,            emoji: '🔥', color: '#4ADE80' },
    { label: 'Pendentes',    value: unsynced,            emoji: '⚡', color: unsynced > 0 ? '#FB923C' : '#4ADE80' },
    { label: 'Avaliadores',  value: avaliadores.length, emoji: '👨‍🏫', color: '#F472B6' },
  ]

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {/* Blob */}
      <div style={{
        position: 'absolute', top: '-30px', left: '-30px', width: '200px', height: '200px',
        borderRadius: '50%', background: 'radial-gradient(circle,#6D28D9,transparent 70%)',
        filter: 'blur(50px)', opacity: 0.18, pointerEvents: 'none',
        animation: 'floatBlob 15s ease-in-out infinite',
      }}/>

      {/* Header */}
      <div style={{ padding: '52px 20px 20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'linear-gradient(135deg,#6D28D9,#A855F7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 4px 20px rgba(109,40,217,0.4)',
          }}>🛡️</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Painel Admin</h1>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>Visão geral do sistema</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
          {stats.map((s, i) => (
            <div key={s.label} className="glass item-in" style={{
              borderRadius: '18px', padding: '14px 10px', textAlign: 'center',
              animationDelay: `${i * 50}ms`,
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>{s.emoji}</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: s.color,
                textShadow: `0 0 12px ${s.color}44`,
              }}>{s.value}</div>
              <div style={{ fontSize: '9px', color: '#6B7280', marginTop: '3px', fontWeight: 700, letterSpacing: '0.3px' }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Avaliadores */}
        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            👨‍🏫 AVALIADORES ({avaliadores.length})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {avaliadores.map((u, i) => {
              const avs  = avaliacoes.filter(a => a.avaliadorId === u.id)
              const avg  = avs.length ? Math.round(avs.reduce((s, a) => s + a.score, 0) / avs.length) : 0
              const pend = avs.filter(a => !a.sincronizado).length
              return (
                <div key={u.id} className="glass item-in" style={{
                  borderRadius: '20px', padding: '16px',
                  animationDelay: `${i * 70 + 200}ms`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '15px', flexShrink: 0,
                      background: 'linear-gradient(135deg,#6D28D9,#E879F9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '19px', fontWeight: 800, color: 'white',
                      boxShadow: '0 4px 16px rgba(109,40,217,0.35)',
                    }}>{u.name.charAt(0)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{u.name}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6B7280',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{u.email}</p>
                    </div>
                  </div>
                  <div style={{
                    marginTop: '12px', display: 'flex', gap: '8px',
                  }}>
                    {[
                      { label: 'Avaliações', value: avs.length, emoji: '📋', color: '#C084FC' },
                      { label: 'Score ⌀', value: avg || '—', emoji: '⭐', color: clsColor(avg) },
                      { label: 'Pendentes', value: pend, emoji: '⚡', color: pend > 0 ? '#FB923C' : '#4ADE80' },
                    ].map(b => (
                      <div key={b.label} style={{
                        flex: 1, padding: '8px', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                        textAlign: 'center',
                      }}>
                        <div style={{ fontSize: '14px' }}>{b.emoji}</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: b.color, marginTop: '2px' }}>{b.value}</div>
                        <div style={{ fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>{b.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* All recent */}
        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            🕐 TODAS AS AVALIAÇÕES
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {[...avaliacoes].reverse().map((av, i) => {
              const al = avaliados.find(a => a.id === av.avaliadoId)
              return (
                <button key={av.id} onClick={() => navigate('relatorio', { avaliacaoId: av.id })}
                  className="glass lift item-in"
                  style={{
                    borderRadius: '16px', padding: '12px 14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left',
                    animationDelay: `${i * 50 + 300}ms`,
                  }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
                    background: al?.gender === 'F' ? 'linear-gradient(135deg,#BE185D,#E879F9)' : 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 800, color: 'white',
                  }}>{al?.name.charAt(0)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{al?.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6B7280' }}>
                      {av.tipo === 'saude' ? '❤️' : '⚡'} {av.data}{!av.sincronizado && ' · ⚡ offline'}
                    </p>
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: clsColor(av.score), flexShrink: 0,
                    textShadow: `0 0 8px ${clsColor(av.score)}55`,
                  }}>{av.score}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Admin actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('exportar')} className="lift" style={{
            flex: 1, padding: '14px',
            background: 'linear-gradient(135deg,#6D28D9,#A855F7)',
            border: 'none', borderRadius: '16px',
            color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(109,40,217,0.4)',
          }}>📥 Exportar Tudo</button>
          <button className="lift" style={{
            flex: 1, padding: '14px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', color: '#D1D5DB', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
          }}>⚙️ Configurações</button>
        </div>
      </div>
    </div>
  )
}
