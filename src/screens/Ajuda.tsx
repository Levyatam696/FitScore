import { useState } from 'react'
import type { ScreenProps } from '../types'

const sections = [
  {
    emoji: '📱', title: 'Como usar o FitScore',
    color: '#A855F7',
    content: `1️⃣  Cadastre seus alunos em "Avaliados"\n2️⃣  Toque no botão + para nova avaliação\n3️⃣  Selecione o tipo: Saúde ou Desempenho\n4️⃣  Insira os dados coletados\n5️⃣  Veja o relatório com score automático\n6️⃣  Exporte em PDF, XLSX ou ODS`,
  },
  {
    emoji: '❤️', title: 'Avaliação de Saúde',
    color: '#F472B6',
    content: `Baseada no PROESP-BR, avalia aptidão voltada à saúde:\n\n⚖️  IMC — calculado automaticamente (kg/m²)\n\n💪  Resistência Abdominal — máximo de sit-ups em 1 minuto\n\n🤸  Flexibilidade — sentar e alcançar com banco de Wells (cm)\n\n🫀  Aptidão Cardiorrespiratória — corrida/caminhada de 9 min`,
  },
  {
    emoji: '⚡', title: 'Avaliação de Desempenho',
    color: '#FB923C',
    content: `Avalia aptidão física voltada ao desempenho esportivo:\n\n💨  Velocidade 20m — cronometrado em segundos\n\n🔄  Agilidade Shuttle Run — 4x10m em zigue-zague (s)\n\n🦘  Salto Horizontal — distância máxima em cm\n\n🤜  Preensão Manual — força medida em kgf\n\n🏃  Resistência Aeróbica — Teste de Cooper (12 min)`,
  },
  {
    emoji: '📊', title: 'Tabelas de Classificação',
    color: '#60A5FA',
    content: `Classificações seguem normas do PROESP-BR por sexo e faixa etária:\n\n🟢 Excelente — zona saudável superior\n🔵 Bom — zona saudável\n🟠 Regular — zona de atenção\n🔴 Fraco — zona de risco\n\nO FitScore (0–100) é calculado pela média ponderada de todos os testes realizados na avaliação.\n\n📚 Referência: Gaya, A. et al. (2021). PROESP-BR: Manual de Medidas e Testes, Normas e Critérios de Avaliação.`,
  },
  {
    emoji: '☁️', title: 'Sincronização & Offline',
    color: '#34D399',
    content: `O FitScore funciona 100% offline:\n\n✅  Avaliações salvas localmente primeiro\n📡  Enviadas automaticamente ao reconectar\n🔢  Ordem cronológica sempre preservada\n📊  Histórico completo sincronizado na 1ª conexão\n⚡  Ícone laranja indica dados aguardando sync`,
  },
  {
    emoji: '🔒', title: 'Privacidade & LGPD',
    color: '#F87171',
    content: `O FitScore segue a LGPD (Lei nº 13.709/2018):\n\n🔐  Dados armazenados localmente e no Google Planilhas autorizado\n🚫  Nenhum compartilhamento com terceiros sem consentimento\n👤  Acesso restrito ao avaliador e ao administrador geral\n📧  Notificação por e-mail em caso de incidente\n🗑️  Exclusão completa dos dados disponível sob solicitação\n\n✉️  privacidade@fitscore.app`,
  },
]

export default function Ajuda({ navigate: _ }: ScreenProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div style={{ flex: 1 }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 16px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-20px', right: '-30px', width: '180px', height: '180px',
          borderRadius: '50%', background: 'radial-gradient(circle,#7C3AED,transparent 70%)',
          filter: 'blur(48px)', opacity: 0.15, pointerEvents: 'none',
          animation: 'floatBlob2 16s ease-in-out infinite',
        }}/>
        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', position: 'relative' }}>
          📖 Ajuda
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', position: 'relative' }}>
          Orientações e referências do PROESP-BR
        </p>
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
          {[
            { label: 'IMC', emoji: '⚖️' },
            { label: 'Flexibilidade', emoji: '🤸' },
            { label: 'Shuttle Run', emoji: '🔄' },
          ].map(v => (
            <button key={v.label} className="glass lift" style={{
              flex: 1, padding: '12px 6px',
              borderRadius: '16px', cursor: 'pointer', textAlign: 'center',
              background: 'linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.04))',
              border: '1px solid rgba(239,68,68,0.18)',
            }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>{v.emoji}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#FCA5A5' }}>▶ {v.label}</div>
            </button>
          ))}
        </div>

        {/* PROESP badge */}
        <div className="glass" style={{
          padding: '14px 16px', borderRadius: '18px',
          background: 'linear-gradient(135deg,rgba(109,40,217,0.15),rgba(168,85,247,0.06))',
          border: '1px solid rgba(168,85,247,0.2)',
          display: 'flex', gap: '14px', alignItems: 'center',
        }}>
          <span style={{ fontSize: '32px' }}>📘</span>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#C084FC' }}>Projeto Esporte Brasil</p>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>
              Todo o conteúdo é baseado no manual PROESP-BR
            </p>
          </div>
        </div>

        {/* Accordion */}
        {sections.map((s, i) => (
          <div key={i} className="glass item-in" style={{
            borderRadius: '20px', overflow: 'hidden',
            border: `1px solid ${open === i ? s.color + '44' : 'rgba(255,255,255,0.07)'}`,
            transition: 'border-color 0.25s',
            animationDelay: `${i * 50}ms`,
          }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', padding: '16px 18px',
              background: open === i ? `linear-gradient(135deg, ${s.color}18, transparent)` : 'none',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
              transition: 'background 0.25s',
            }}>
              <span style={{
                fontSize: '24px',
                filter: open === i ? 'drop-shadow(0 0 8px currentColor)' : 'none',
              }}>{s.emoji}</span>
              <span style={{ flex: 1, fontSize: '15px', fontWeight: 700, color: open === i ? s.color : '#D1D5DB' }}>
                {s.title}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', color: open === i ? s.color : '#6B7280' }}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {open === i && (
              <div style={{ padding: '0 18px 18px' }} className="fade-in">
                <div style={{ height: '1px', background: `linear-gradient(90deg, ${s.color}44, transparent)`, marginBottom: '14px' }}/>
                <p style={{
                  margin: 0, fontSize: '13px', color: '#9CA3AF', lineHeight: 1.75, whiteSpace: 'pre-line',
                }}>{s.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
