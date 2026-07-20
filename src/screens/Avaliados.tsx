import { useState } from 'react'
import type { ScreenProps } from '../types'

type Filter = 'todos' | 'M' | 'F'

const clsColor = (s: number) => s >= 85 ? '#4ADE80' : s >= 70 ? '#FB923C' : '#F87171'

export default function Avaliados({ navigate, avaliados, avaliacoes }: ScreenProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('todos')

  const lastAv = (id: string) => avaliacoes.filter(a => a.avaliadoId === id).at(-1)
  const countAv = (id: string) => avaliacoes.filter(a => a.avaliadoId === id).length

  const list = avaliados.filter(a =>
    (filter === 'todos' || a.gender === filter) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {/* Blob */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px',
        borderRadius: '50%', background: 'radial-gradient(circle,#7C3AED,transparent 70%)',
        filter: 'blur(50px)', opacity: 0.15, pointerEvents: 'none',
        animation: 'floatBlob 16s ease-in-out infinite',
      }}/>

      {/* Header */}
      <div style={{ padding: '52px 20px 16px' }}>
        <h1 style={{ margin: '0 0 2px', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          👥 Avaliados
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
          {avaliados.length} alunos cadastrados
        </p>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}
            width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar aluno..."
            style={{
              width: '100%', padding: '12px 14px 12px 40px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', color: '#F4F4F8', fontSize: '14px',
              backdropFilter: 'blur(8px)',
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['todos', 'M', 'F'] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 16px',
              background: filter === f ? 'linear-gradient(135deg,#6D28D9,#A855F7)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '20px', cursor: 'pointer',
              color: filter === f ? 'white' : '#6B7280',
              fontSize: '13px', fontWeight: 700,
              transition: 'all 0.18s ease',
              boxShadow: filter === f ? '0 4px 16px rgba(147,51,234,0.4)' : 'none',
            }}>
              {f === 'todos' ? 'Todos' : f === 'M' ? '♂ Masc' : '♀ Fem'}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#6B7280', alignSelf: 'center', fontWeight: 600 }}>
            {list.length} aluno{list.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {list.map((al, i) => {
            const av = lastAv(al.id)
            const cnt = countAv(al.id)
            return (
              <button key={al.id} onClick={() => navigate('avaliado-detail', { avaliadoId: al.id })}
                className="glass lift item-in"
                style={{
                  borderRadius: '20px', padding: '14px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left',
                  animationDelay: `${i * 55}ms`,
                }}>
                {/* Avatar */}
                <div style={{
                  width: '50px', height: '50px', borderRadius: '16px', flexShrink: 0,
                  background: al.gender === 'F'
                    ? 'linear-gradient(135deg,#BE185D,#E879F9)'
                    : 'linear-gradient(135deg,#1D4ED8,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 800, color: 'white',
                  boxShadow: al.gender === 'F'
                    ? '0 4px 16px rgba(232,121,249,0.3)'
                    : '0 4px 16px rgba(109,40,217,0.3)',
                }}>{al.name.charAt(0)}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#F4F4F8' }}>{al.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>
                    {al.age} anos · {al.turma}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#A855F7', fontWeight: 600 }}>
                    {cnt === 0 ? '📋 Sem avaliações' : `📊 ${cnt} avaliação${cnt !== 1 ? 'ões' : ''}`}
                  </p>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {av && (
                    <div style={{
                      fontSize: '20px', fontWeight: 900, color: clsColor(av.score),
                      textShadow: `0 0 10px ${clsColor(av.score)}55`,
                    }}>{av.score}</div>
                  )}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginTop: '4px' }}>
                    <path d="M9 18l6-6-6-6" stroke="#4B5060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            )
          })}

          {list.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#9CA3AF' }}>Nenhum aluno encontrado</p>
              <p style={{ margin: '6px 0 0', fontSize: '13px' }}>Tente outro nome ou filtro</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
