import type { ScreenProps } from '../types'

const clsColor = (c: string) => c === 'Excelente' ? '#4ADE80' : c === 'Bom' ? '#60A5FA' : c === 'Regular' ? '#FB923C' : '#F87171'
const clsBg    = (c: string) => c === 'Excelente' ? 'rgba(74,222,128,0.1)' : c === 'Bom' ? 'rgba(96,165,250,0.1)' : c === 'Regular' ? 'rgba(251,146,60,0.1)' : 'rgba(248,113,113,0.1)'
const scoreColor = (s: number) => s >= 85 ? '#4ADE80' : s >= 70 ? '#FB923C' : '#F87171'
const overallCls = (s: number) => s >= 85 ? 'Excelente' : s >= 70 ? 'Bom' : s >= 55 ? 'Regular' : 'Fraco'

export default function Relatorio({ navigate, params, avaliados, avaliacoes }: ScreenProps) {
  const av = avaliacoes.find(a => a.id === params.avaliacaoId)
  const al = avaliados.find(a => a.id === av?.avaliadoId)

  if (!av || !al) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>😕</div>
        <p>Relatório não encontrado</p>
      </div>
    </div>
  )

  const isFemale = al.gender === 'F'
  const cls = overallCls(av.score)

  /* Ring math */
  const cx = 64, cy = 64, r = 52, sw = 9
  const circ = 2 * Math.PI * r
  const arcTotal = circ * 0.75
  const filled   = arcTotal * (av.score / 100)
  const ROT = 135

  return (
    <div style={{ flex: 1 }}>
      {/* Header hero */}
      <div style={{
        padding: '48px 20px 24px',
        background: `linear-gradient(160deg, ${isFemale ? 'rgba(190,24,93,0.22)' : 'rgba(109,40,217,0.22)'} 0%, rgba(7,7,15,0) 65%)`,
        position: 'relative',
      }}>
        {/* Blob */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '200px', height: '200px',
          borderRadius: '50%', background: 'radial-gradient(circle,#7C3AED,transparent 70%)',
          filter: 'blur(48px)', opacity: 0.18, pointerEvents: 'none',
          animation: 'floatBlob 14s ease-in-out infinite',
        }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <button onClick={() => navigate('avaliados', {}, 'back')} style={{
            background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
            color: '#A855F7', padding: '8px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', backdropFilter: 'blur(8px)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button style={{
            background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
            color: '#F4F4F8', padding: '8px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 700,
            backdropFilter: 'blur(8px)',
          }}>📤 Compartilhar</button>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#A855F7', letterSpacing: '1.2px' }}>
              PROJETO ESPORTE BRASIL
            </p>
            <h2 style={{ margin: '4px 0 2px', fontSize: '20px', fontWeight: 800 }}>{al.name}</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
              {isFemale ? '👧' : '👦'} {al.age} anos · {al.turma} · {al.escola}
            </p>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>
              📅 {av.data} · {av.tipo === 'saude' ? '❤️ Avaliação de Saúde' : '⚡ Desempenho Esportivo'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Score card */}
        <div className="glass scale-in" style={{
          borderRadius: '24px', padding: '22px',
          background: `linear-gradient(135deg, ${clsBg(cls).replace('0.1', '0.15')}, rgba(109,40,217,0.08))`,
          border: `1px solid ${clsColor(cls)}33`,
          display: 'flex', alignItems: 'center', gap: '20px',
        }}>
          <svg viewBox="0 0 128 128" width="128" height="128" style={{ flexShrink: 0 }} className="ring-glow">
            <defs>
              <linearGradient id="rRelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#6D28D9"/>
                <stop offset="50%"  stopColor="#A855F7"/>
                <stop offset="100%" stopColor="#E879F9"/>
              </linearGradient>
              <filter id="rRelGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} strokeLinecap="round"
              strokeDasharray={`${arcTotal} ${circ - arcTotal}`} transform={`rotate(${ROT} ${cx} ${cy})`}/>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#rRelGrad)" strokeWidth={sw} strokeLinecap="round"
              strokeDasharray={`${filled} ${circ - filled}`} transform={`rotate(${ROT} ${cx} ${cy})`} filter="url(#rRelGlow)"/>
            <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="26" fontWeight="900">{av.score}</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#6B7280" fontSize="9" fontWeight="700" letterSpacing="1">SCORE</text>
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 700, color: '#A855F7', letterSpacing: '1.2px' }}>
              🏆 FITSCORE GERAL
            </p>
            <p style={{ margin: 0, fontSize: '52px', fontWeight: 900, lineHeight: 1, color: scoreColor(av.score),
              textShadow: `0 0 20px ${scoreColor(av.score)}55`,
            }}>
              {av.score}
              <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 500 }}>/100</span>
            </p>
            <div style={{
              marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '20px',
              background: clsBg(cls), border: `1px solid ${clsColor(cls)}44`,
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: clsColor(cls) }}/>
              <span style={{ fontSize: '13px', fontWeight: 800, color: clsColor(cls) }}>{cls}</span>
            </div>
          </div>
        </div>

        {/* Tests */}
        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            📊 RESULTADOS DOS TESTES
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {av.testes.map((t, i) => (
              <div key={t.nome} className="glass item-in" style={{
                borderRadius: '18px', padding: '14px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                animationDelay: `${i * 60}ms`,
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#D1D5DB' }}>{t.nome}</p>
                  <p style={{ margin: '4px 0 0' }}>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: '#C084FC' }}>{t.valor}</span>
                    {t.unidade && <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '4px' }}>{t.unidade}</span>}
                  </p>
                </div>
                <div style={{
                  padding: '7px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 800,
                  background: clsBg(t.classificacao), color: clsColor(t.classificacao),
                  border: `1px solid ${clsColor(t.classificacao)}33`,
                  flexShrink: 0,
                }}>{t.classificacao}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Export */}
        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            📥 EXPORTAR RELATÓRIO
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { fmt: 'PDF',  emoji: '📄', color: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.2)' },
              { fmt: 'XLSX', emoji: '📗', color: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.2)' },
              { fmt: 'ODS',  emoji: '📊', color: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.2)' },
            ].map(f => (
              <button key={f.fmt} className="lift" style={{
                flex: 1, padding: '14px 8px',
                background: f.color, border: `1px solid ${f.border}`,
                borderRadius: '16px', cursor: 'pointer', textAlign: 'center',
              }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{f.emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#D1D5DB' }}>{f.fmt}</div>
              </button>
            ))}
          </div>
        </div>

        {!av.sincronizado && (
          <div className="glass" style={{
            padding: '14px 16px', borderRadius: '16px',
            background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)',
            display: 'flex', gap: '12px', alignItems: 'center',
          }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#FB923C' }}>Dados offline</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>
                Será sincronizado ao conectar ao Google Planilhas
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
