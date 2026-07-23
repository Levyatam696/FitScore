import type { ScreenProps } from '../types'

const clsColor = (s: number) => s >= 85 ? '#4ADE80' : s >= 70 ? '#FB923C' : '#F87171'
const clsBg    = (s: number) => s >= 85 ? 'rgba(74,222,128,0.1)' : s >= 70 ? 'rgba(251,146,60,0.1)' : 'rgba(248,113,113,0.1)'

export default function AvaliadoDetail({ navigate, params, avaliados, avaliacoes }: ScreenProps) {
  const al  = avaliados.find(a => a.id === params.avaliadoId)
  const avs = avaliacoes.filter(a => a.avaliadoId === params.avaliadoId)
  if (!al) return null

  const last = avs.length ? avs[avs.length - 1] : undefined
  const avgScore = avs.length ? Math.round(avs.reduce((s, a) => s + a.score, 0) / avs.length) : 0
  const isFemale = al.gender === 'F'

  return (
    <div style={{ flex: 1 }}>
      <div style={{
        padding: '48px 20px 24px',
        background: isFemale
          ? 'linear-gradient(160deg,rgba(190,24,93,0.25) 0%,rgba(7,7,15,0) 60%)'
          : 'linear-gradient(160deg,rgba(29,78,216,0.25) 0%,rgba(7,7,15,0) 60%)',
        position: 'relative',
      }}>
        <button onClick={() => navigate('avaliados', undefined, 'back')} style={{
          background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
          color: '#A855F7', padding: '8px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', marginBottom: '20px', backdropFilter: 'blur(8px)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '22px', flexShrink: 0,
            background: isFemale
              ? 'linear-gradient(135deg,#BE185D,#E879F9)'
              : 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 900, color: 'white',
            boxShadow: isFemale ? '0 8px 32px rgba(232,121,249,0.4)' : '0 8px 32px rgba(109,40,217,0.4)',
          }}>{al.name.charAt(0)}</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 2px', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.3px' }}>{al.name}</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
              {isFemale ? '👧' : '👦'} {al.age} anos · {al.turma}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>🏫 {al.escola}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {avs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Último Score', value: last?.score ?? 0, emoji: '🎯' },
              { label: 'Score Médio', value: avgScore, emoji: '📈' },
              { label: 'Avaliações', value: avs.length, emoji: '📋' },
            ].map(s => (
              <div key={s.label} className="glass scale-in" style={{ borderRadius: '18px', padding: '14px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{s.emoji}</div>
                <div style={{
                  fontSize: '22px', fontWeight: 900,
                  color: s.label !== 'Avaliações' ? clsColor(s.value) : '#C084FC',
                  textShadow: s.label !== 'Avaliações' ? `0 0 10px ${clsColor(s.value)}44` : 'none',
                }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '3px', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {avs.length > 0 && (
          <div className="glass" style={{
            borderRadius: '22px', padding: '20px',
            display: 'flex', alignItems: 'center', gap: '18px',
          }}>
            <RingMini score={last?.score ?? 0} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 700, color: '#A855F7', letterSpacing: '1px' }}>
                🏆 ÚLTIMO FITSCORE
              </p>
              <p style={{ margin: 0, fontSize: '44px', fontWeight: 900, lineHeight: 1, color: clsColor(last?.score ?? 0) }}>
                {last?.score}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#6B7280' }}>
                {last?.data} · {last?.tipo === 'saude' ? '❤️ Saúde' : '⚡ Desempenho'}
              </p>
              <div style={{
                marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', borderRadius: '20px',
                background: clsBg(last?.score ?? 0), border: `1px solid ${clsColor(last?.score ?? 0)}33`,
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: clsColor(last?.score ?? 0) }}/>
                <span style={{ fontSize: '12px', fontWeight: 700, color: clsColor(last?.score ?? 0) }}>
                  {(last?.score ?? 0) >= 85 ? 'Excelente' : (last?.score ?? 0) >= 70 ? 'Bom' : 'Regular'}
                </span>
              </div>
            </div>
          </div>
        )}

        <button onClick={() => navigate('nova-avaliacao', { avaliadoId: al.id })} style={{
          padding: '15px', width: '100%',
          background: 'linear-gradient(135deg,#6D28D9,#A855F7)',
          border: 'none', borderRadius: '18px',
          color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(147,51,234,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          📋 Nova Avaliação
        </button>

        <div>
          <p style={{ margin: '4px 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            📅 HISTÓRICO ({avs.length})
          </p>
          {avs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📋</div>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Nenhuma avaliação ainda</p>
              <p style={{ margin: '4px 0 0', fontSize: '13px' }}>Toque em Nova Avaliação para começar</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[...avs].reverse().map((av, i) => (
              <button key={av.id} onClick={() => navigate('relatorio', { avaliacaoId: av.id })}
                className="glass lift item-in"
                style={{
                  borderRadius: '18px', padding: '14px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
                  animationDelay: `${i * 60}ms`,
                }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                  background: clsBg(av.score), border: `1.5px solid ${clsColor(av.score)}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 900, color: clsColor(av.score),
                }}>{av.score}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#F4F4F8' }}>
                    {av.tipo === 'saude' ? '❤️ Avaliação de Saúde' : '⚡ Desempenho Esportivo'}
                  </p>
                  <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>
                    📅 {av.data} · {av.testes.length} testes
                    {!av.sincronizado && ' · ⚡ offline'}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#4B5060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        <button style={{
          padding: '14px', background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: '16px', color: '#F87171', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
        }}>🗑️ Excluir Aluno</button>
      </div>
    </div>
  )
}

function RingMini({ score }: { score: number }) {
  const cx = 44, cy = 44, r = 36, sw = 7
  const circ = 2 * Math.PI * r
  const arcTotal = circ * 0.75
  const filled = arcTotal * (score / 100)
  const ROT = 135
  return (
    <svg viewBox="0 0 88 88" width="88" height="88" style={{ flexShrink: 0 }} className="ring-glow">
      <defs>
        <linearGradient id="rmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#6D28D9"/>
          <stop offset="100%" stopColor="#E879F9"/>
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${arcTotal} ${circ - arcTotal}`} transform={`rotate(${ROT} ${cx} ${cy})`}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#rmGrad)" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${filled} ${circ - filled}`} transform={`rotate(${ROT} ${cx} ${cy})`}/>
    </svg>
  )
}
