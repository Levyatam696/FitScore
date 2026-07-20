import { useState } from 'react'
import type { ScreenProps } from '../types'

type Fmt = 'xlsx' | 'ods' | 'pdf'

export default function Exportar({ navigate, user, avaliacoes }: ScreenProps) {
  const [fmt, setFmt]         = useState<Fmt>('xlsx')
  const [scope, setScope]     = useState<'minhas' | 'todas'>('minhas')
  const [sheets, setSheets]   = useState(false)
  const [exporting, setExp]   = useState(false)
  const [done, setDone]       = useState(false)

  const unsynced  = avaliacoes.filter(a => !a.sincronizado).length
  const myCount   = avaliacoes.filter(a => a.avaliadorId === user?.id).length

  const doExport = () => {
    setExp(true); setDone(false)
    setTimeout(() => { setExp(false); setDone(true) }, 1800)
  }

  const fmts = [
    { id: 'xlsx' as Fmt, emoji: '📗', label: 'Excel',   sub: '.xlsx',  color: '#22C55E' },
    { id: 'ods'  as Fmt, emoji: '📊', label: 'ODS',     sub: '.ods',   color: '#3B82F6' },
    { id: 'pdf'  as Fmt, emoji: '📄', label: 'PDF',     sub: 'relatório', color: '#EF4444' },
  ]

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {/* Blob */}
      <div style={{
        position: 'absolute', top: '60px', right: '-40px', width: '200px', height: '200px',
        borderRadius: '50%', background: 'radial-gradient(circle,#34D399,transparent 70%)',
        filter: 'blur(56px)', opacity: 0.12, pointerEvents: 'none',
        animation: 'floatBlob2 18s ease-in-out infinite',
      }}/>

      {/* Header */}
      <div style={{ padding: '52px 20px 16px', position: 'relative' }}>
        <button onClick={() => navigate('dashboard', {}, 'back')} style={{
          background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
          color: '#A855F7', padding: '8px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', marginBottom: '16px',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 800 }}>📥 Exportar</h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>Exporte seus dados em vários formatos</p>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>

        {/* Sync alert */}
        {unsynced > 0 && (
          <div className="glass" style={{
            padding: '12px 16px', borderRadius: '16px',
            background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.22)',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FB923C',
              boxShadow: '0 0 8px #FB923C', flexShrink: 0,
              animation: 'pulse-dot 1.5s ease-in-out infinite',
            }}/>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#FBBF24' }}>
                ⚡ {unsynced} pendente{unsynced > 1 ? 's' : ''} de sincronização
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6B7280' }}>Incluídas na exportação</p>
            </div>
          </div>
        )}

        {/* Format selector */}
        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            📂 FORMATO
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {fmts.map(f => (
              <button key={f.id} onClick={() => setFmt(f.id)} className="lift"
                style={{
                  flex: 1, padding: '16px 8px',
                  background: fmt === f.id
                    ? `linear-gradient(135deg, ${f.color}22, ${f.color}0A)`
                    : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${fmt === f.id ? f.color + '55' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '18px', cursor: 'pointer', textAlign: 'center',
                  boxShadow: fmt === f.id ? `0 4px 20px ${f.color}22` : 'none',
                  transition: 'all 0.2s',
                }}>
                <div style={{ fontSize: '26px', marginBottom: '6px' }}>{f.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: fmt === f.id ? f.color : '#D1D5DB' }}>{f.label}</div>
                <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px', fontWeight: 500 }}>{f.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#4B5060', letterSpacing: '1.2px' }}>
            🎯 ESCOPO
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'minhas' as const, emoji: '👤', label: 'Minhas avaliações', sub: `${myCount} avaliações suas` },
              ...(user?.role === 'admin'
                ? [{ id: 'todas' as const, emoji: '🌐', label: 'Todas as avaliações', sub: `${avaliacoes.length} avaliações no sistema` }]
                : []),
            ].map(s => (
              <button key={s.id} onClick={() => setScope(s.id)} className="lift" style={{
                padding: '14px 16px', cursor: 'pointer',
                background: scope === s.id
                  ? 'linear-gradient(135deg,rgba(109,40,217,0.2),rgba(168,85,247,0.08))'
                  : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${scope === s.id ? '#A855F766' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '18px',
                display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
                boxShadow: scope === s.id ? '0 4px 20px rgba(168,85,247,0.2)' : 'none',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: '24px' }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: scope === s.id ? '#C084FC' : '#F4F4F8' }}>{s.label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>{s.sub}</p>
                </div>
                {scope === s.id && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#A855F7"/>
                    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Google Sheets */}
        <div className="glass" style={{ borderRadius: '20px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>📊</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>Google Planilhas</p>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>Envio automático ao salvar avaliações</p>
            </div>
            <button onClick={() => setSheets(s => !s)} style={{
              width: '50px', height: '28px', borderRadius: '14px', position: 'relative',
              background: sheets ? 'linear-gradient(135deg,#6D28D9,#A855F7)' : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: 'pointer', flexShrink: 0,
              boxShadow: sheets ? '0 2px 12px rgba(109,40,217,0.4)' : 'none',
              transition: 'background 0.25s, box-shadow 0.25s',
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white',
                position: 'absolute', top: '3px', left: sheets ? '25px' : '3px',
                transition: 'left 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}/>
            </button>
          </div>
          {sheets && (
            <div className="slide-up" style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.8px' }}>
                URL DO GOOGLE PLANILHAS
              </label>
              <input placeholder="https://docs.google.com/spreadsheets/..." style={{
                width: '100%', marginTop: '8px', padding: '11px 14px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: '#F4F4F8', fontSize: '13px',
              }}/>
            </div>
          )}
        </div>

        {/* Export button */}
        <button onClick={doExport} disabled={exporting} className="lift" style={{
          padding: '16px',
          background: exporting ? 'rgba(109,40,217,0.5)' : 'linear-gradient(135deg,#6D28D9,#A855F7)',
          border: 'none', borderRadius: '18px',
          color: 'white', fontSize: '16px', fontWeight: 800,
          cursor: exporting ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          boxShadow: exporting ? 'none' : '0 8px 28px rgba(109,40,217,0.45)',
          transition: 'all 0.2s',
        }}>
          {exporting ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="3" strokeDasharray="28 56"/>
              </svg>
              Exportando...
            </>
          ) : `📥 Exportar como ${fmt.toUpperCase()}`}
        </button>

        {done && (
          <div className="glass slide-up" style={{
            padding: '16px', borderRadius: '18px',
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ fontSize: '28px' }}>✅</span>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#4ADE80' }}>Exportação concluída!</p>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>
                Arquivo {fmt.toUpperCase()} gerado com sucesso
                {sheets ? ' · Enviado ao Google Planilhas' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
