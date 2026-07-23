import { useState } from 'react'
import type { ScreenProps, AvaliacaoTipo, TesteResult, Avaliacao } from '../types'

const SAUDE = [
  { nome: 'Resistência Abdominal', emoji: '💪', unidade: 'rep/min', placeholder: 'Ex: 28', hint: 'Sit-ups em 60 segundos' },
  { nome: 'Flexibilidade', emoji: '🤸', unidade: 'cm', placeholder: 'Ex: 30', hint: 'Sentar e alcançar (banco de Wells)' },
  { nome: 'Aptidão Cardiorrespiratória', emoji: '🫀', unidade: 'min:seg', placeholder: 'Ex: 9:20', hint: 'Corrida/caminhada de 9 minutos' },
]

const DESEMPENHO = [
  { nome: 'Velocidade 20m', emoji: '💨', unidade: 's', placeholder: 'Ex: 3.42', hint: 'Corrida de velocidade (s)' },
  { nome: 'Agilidade Shuttle Run', emoji: '🔄', unidade: 's', placeholder: 'Ex: 10.8', hint: '4 x 10 metros cronometrado' },
  { nome: 'Salto Horizontal', emoji: '🦘', unidade: 'cm', placeholder: 'Ex: 182', hint: 'Distância máxima do salto' },
  { nome: 'Preensão Manual', emoji: '🤜', unidade: 'kgf', placeholder: 'Ex: 38', hint: 'Dinamômetro manual (kgf)' },
]

function classify(nome: string, valor: string): TesteResult['classificacao'] {
  const v = parseFloat(valor)
  if (isNaN(v)) return 'Regular'
  if (nome.includes('Abdominal')) return v >= 30 ? 'Excelente' : v >= 22 ? 'Bom' : v >= 14 ? 'Regular' : 'Fraco'
  if (nome.includes('Flexibilidade')) return v >= 35 ? 'Excelente' : v >= 25 ? 'Bom' : v >= 15 ? 'Regular' : 'Fraco'
  if (nome.includes('Velocidade')) return v <= 3.2 ? 'Excelente' : v <= 3.6 ? 'Bom' : v <= 4.0 ? 'Regular' : 'Fraco'
  if (nome.includes('Shuttle')) return v <= 10 ? 'Excelente' : v <= 11 ? 'Bom' : v <= 12 ? 'Regular' : 'Fraco'
  if (nome.includes('Salto')) return v >= 200 ? 'Excelente' : v >= 170 ? 'Bom' : v >= 140 ? 'Regular' : 'Fraco'
  if (nome.includes('Preensão')) return v >= 42 ? 'Excelente' : v >= 32 ? 'Bom' : v >= 22 ? 'Regular' : 'Fraco'
  return 'Bom'
}

const clsColor = (c: string) => c === 'Excelente' ? '#4ADE80' : c === 'Bom' ? '#60A5FA' : c === 'Regular' ? '#FB923C' : '#F87171'
const clsBg    = (c: string) => c === 'Excelente' ? 'rgba(74,222,128,0.1)' : c === 'Bom' ? 'rgba(96,165,250,0.1)' : c === 'Regular' ? 'rgba(251,146,60,0.1)' : 'rgba(248,113,113,0.1)'

export default function NovaAvaliacao({ navigate, params, user, avaliados, avaliacoes, setAvaliacoes }: ScreenProps) {
  const [step, setStep]     = useState(params.avaliadoId ? 2 : 1)
  const [selId, setSelId]   = useState(params.avaliadoId ?? '')
  const [tipo, setTipo]     = useState<AvaliacaoTipo>('saude')
  const [peso, setPeso]     = useState('')
  const [altura, setAltura] = useState('')
  const [vals, setVals]     = useState<Record<string, string>>({})

  const al     = avaliados.find(a => a.id === selId)
  const testes = tipo === 'saude' ? SAUDE : DESEMPENHO
  const imc    = peso && altura ? (parseFloat(peso) / Math.pow(parseFloat(altura) / 100, 2)).toFixed(1) : ''
  const imcCls = imc ? (parseFloat(imc) < 18.5 ? 'Regular' : parseFloat(imc) < 25 ? 'Bom' : 'Regular') : 'Bom'

  const goBack = () => step > 1 ? setStep(s => s - 1) : navigate('dashboard')

  const save = () => {
    const results: TesteResult[] = []
    if (tipo === 'saude' && imc)
      results.push({ nome: 'IMC', valor: imc, unidade: 'kg/m²', classificacao: imcCls as any })
    testes.forEach(t => {
      const v = vals[t.nome] ?? ''
      if (v) results.push({ nome: t.nome, valor: v, unidade: t.unidade, classificacao: classify(t.nome, v) })
    })
    const scores = { Excelente: 4, Bom: 3, Regular: 2, Fraco: 1 }
    const score = results.length
      ? Math.round(results.reduce((s, t) => s + (scores[t.classificacao] ?? 2), 0) / (results.length * 4) * 100)
      : 60
    const nova: Avaliacao = {
      id: `av${Date.now()}`,
      avaliadoId: selId, avaliadorId: user?.id ?? 'u2',
      tipo, data: new Date().toISOString().split('T')[0],
      score, testes: results, sincronizado: false,
    }
    setAvaliacoes([...avaliacoes, nova])
    navigate('relatorio', { avaliacaoId: nova.id })
  }

  const STEPS = ['Aluno', 'Tipo', 'Medidas', 'Testes']
  const inputCss: React.CSSProperties = {
    width: '100%', padding: '13px 14px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px', color: '#F4F4F8', fontSize: '15px',
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '52px 20px 16px', position: 'relative' }}>
        <button onClick={goBack} style={{
          background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
          color: '#A855F7', padding: '8px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', marginBottom: '16px',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 800 }}>📋 Nova Avaliação</h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
          {al ? `Para ${al.name}` : 'Preencha as informações'}
        </p>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
              background: i + 1 < step ? 'linear-gradient(135deg,#6D28D9,#A855F7)' : i + 1 === step ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.06)',
              border: i + 1 === step ? '2px solid #A855F7' : '2px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700,
              color: i + 1 <= step ? '#F4F4F8' : '#4B5060',
              transition: 'all 0.3s ease',
            }}>
              {i + 1 < step ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: '2px', marginLeft: '4px',
                background: i + 1 < step ? 'linear-gradient(90deg,#6D28D9,#A855F7)' : 'rgba(255,255,255,0.06)',
                borderRadius: '2px', transition: 'background 0.3s',
              }}/>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {step === 1 && (
          <>
            <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>Selecionar Aluno</p>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6B7280' }}>Escolha quem será avaliado</p>
            {avaliados.map((a, i) => (
              <button key={a.id} onClick={() => setSelId(a.id)}
                className="item-in"
                style={{
                  background: selId === a.id
                    ? 'linear-gradient(135deg,rgba(109,40,217,0.25),rgba(168,85,247,0.1))'
                    : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${selId === a.id ? '#A855F7' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '18px', padding: '14px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
                  animationDelay: `${i * 40}ms`,
                  boxShadow: selId === a.id ? '0 4px 20px rgba(147,51,234,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0,
                  background: a.gender === 'F' ? 'linear-gradient(135deg,#BE185D,#E879F9)' : 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '17px', fontWeight: 800, color: 'white',
                }}>{a.name.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#F4F4F8' }}>{a.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>{a.age} anos · {a.turma}</p>
                </div>
                {selId === a.id && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#A855F7"/>
                    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
            <Btn disabled={!selId} onClick={() => setStep(2)}>Continuar →</Btn>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>Tipo de Avaliação</p>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6B7280' }}>Para {al?.name} · {al?.age} anos</p>
            {[
              { id: 'saude' as const, emoji: '❤️', label: 'Avaliação de Saúde', desc: 'IMC, resistência, flexibilidade, aptidão cardiorrespiratória', color: '#BE185D' },
              { id: 'desempenho' as const, emoji: '⚡', label: 'Desempenho Esportivo', desc: 'Velocidade, agilidade, salto horizontal, preensão manual', color: '#6D28D9' },
            ].map(t => (
              <button key={t.id} onClick={() => setTipo(t.id)}
                className="lift"
                style={{
                  background: tipo === t.id
                    ? `linear-gradient(135deg,rgba(109,40,217,0.2),rgba(168,85,247,0.08))`
                    : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${tipo === t.id ? '#A855F7' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '22px', padding: '20px', cursor: 'pointer', textAlign: 'left',
                  boxShadow: tipo === t.id ? '0 4px 24px rgba(147,51,234,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{t.emoji}</div>
                <p style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 800 }}>{t.label}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>{t.desc}</p>
              </button>
            ))}
            <Btn onClick={() => setStep(3)}>Continuar →</Btn>
          </>
        )}

        {step === 3 && (
          <>
            <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>📏 Dados Antropométricos</p>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6B7280' }}>Medidas básicas para cálculo do IMC</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={lbl}>⚖️ PESO (kg)</label>
                <input value={peso} onChange={e => setPeso(e.target.value)}
                  placeholder="Ex: 62.5" type="number" style={{ ...inputCss, marginTop: '6px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>📐 ALTURA (cm)</label>
                <input value={altura} onChange={e => setAltura(e.target.value)}
                  placeholder="Ex: 168" type="number" style={{ ...inputCss, marginTop: '6px' }} />
              </div>
            </div>
            {imc && (
              <div className="scale-in" style={{
                padding: '16px 18px', borderRadius: '18px',
                background: 'linear-gradient(135deg,rgba(109,40,217,0.15),rgba(168,85,247,0.06))',
                border: '1px solid rgba(168,85,247,0.2)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#A855F7', letterSpacing: '1px' }}>
                    📊 IMC CALCULADO
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: '32px', fontWeight: 900, color: '#C084FC', lineHeight: 1 }}>{imc}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6B7280' }}>kg/m²</p>
                </div>
                <div style={{
                  padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 700,
                  background: clsBg(imcCls), color: clsColor(imcCls),
                }}>{imcCls}</div>
              </div>
            )}
            <Btn onClick={() => setStep(4)}>Continuar →</Btn>
          </>
        )}

        {step === 4 && (
          <>
            <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700 }}>
              {tipo === 'saude' ? '❤️ Testes de Saúde' : '⚡ Testes de Desempenho'}
            </p>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6B7280' }}>Insira os valores coletados</p>
            {testes.map((t, i) => {
              const cls = vals[t.nome] ? classify(t.nome, vals[t.nome]) : null
              return (
                <div key={t.nome} className="glass item-in" style={{ borderRadius: '18px', padding: '16px', animationDelay: `${i * 60}ms` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '22px' }}>{t.emoji}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700 }}>{t.nome}</p>
                      <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#6B7280' }}>{t.hint}</p>
                    </div>
                    {cls && (
                      <span style={{
                        marginLeft: 'auto', padding: '4px 10px', borderRadius: '20px',
                        fontSize: '11px', fontWeight: 700,
                        background: clsBg(cls), color: clsColor(cls),
                      }}>{cls}</span>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      value={vals[t.nome] ?? ''}
                      onChange={e => setVals(v => ({ ...v, [t.nome]: e.target.value }))}
                      placeholder={t.placeholder} style={inputCss}
                    />
                    <span style={{
                      position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                      fontSize: '12px', color: '#6B7280', fontWeight: 700,
                    }}>{t.unidade}</span>
                  </div>
                </div>
              )
            })}
            <Btn onClick={save} style={{ marginTop: '4px' }}>✅ Salvar Avaliação</Btn>
          </>
        )}
      </div>
    </div>
  )
}

const lbl: React.CSSProperties = { fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.8px' }

function Btn({ children, onClick, disabled, style }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '15px', width: '100%',
      background: disabled ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg,#6D28D9,#A855F7)',
      border: 'none', borderRadius: '16px',
      color: disabled ? '#4B5060' : 'white', fontSize: '15px', fontWeight: 800,
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : '0 6px 24px rgba(147,51,234,0.4)',
      transition: 'all 0.18s ease',
      ...style,
    }}>{children}</button>
  )
}
