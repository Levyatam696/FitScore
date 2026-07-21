import type { Screen, User } from '../types'

interface Props {
  screen: Screen
  navigate: (screen: Screen, params?: Record<string, string>, direction?: 'forward' | 'back') => void
  user: User | null
}

const icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" stroke="currentColor"/>
      <path d="M9 21V12h6v9" strokeWidth="1.8" stroke="currentColor" strokeLinejoin="round"/>
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" strokeWidth="1.8" stroke="currentColor"/>
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" strokeWidth="1.8" stroke="currentColor"/>
      <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" strokeWidth="1.8" stroke="currentColor"/>
    </svg>
  ),
  book: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeWidth="1.8" stroke="currentColor"/>
    </svg>
  ),
  download: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round"/>
      <path d="M7 10l5 5 5-5M12 15V3" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" stroke="currentColor" fill="currentColor" fillOpacity="0.12"/>
      <path d="M9 12l2 2 4-4" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

interface TabProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function Tab({ icon, label, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        padding: '6px 10px', borderRadius: '14px',
        color: active ? '#A855F7' : '#4B5060',
        backgroundColor: active ? 'rgba(147,51,234,0.12)' : 'transparent',
        transition: 'color 0.2s, background-color 0.2s',
        minWidth: '52px',
      }}
    >
      {icon}
      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2px' }}>{label}</span>
    </button>
  )
}

export default function BottomNav({ screen, navigate, user }: Props) {
  const isAvaliados = screen === 'avaliados' || screen === 'avaliado-detail'

  return (
    <div className="bottom-nav" style={{ paddingBottom: '8px', paddingLeft: '4px', paddingRight: '4px' }}>
      <Tab icon={icons.home}  label="Início"    active={screen === 'dashboard'} onClick={() => navigate('dashboard')} />
      <Tab icon={icons.users} label="Avaliados" active={isAvaliados}            onClick={() => navigate('avaliados')} />

      <button
        onClick={() => navigate('nova-avaliacao')}
        style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '4px',
          boxShadow: '0 0 0 4px rgba(147,51,234,0.18), 0 6px 24px rgba(147,51,234,0.45)',
          flexShrink: 0,
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      <Tab icon={icons.book} label="Ajuda" active={screen === 'ajuda'} onClick={() => navigate('ajuda')} />

      {user?.role === 'admin'
        ? <Tab icon={icons.shield}   label="Admin"    active={screen === 'admin'}    onClick={() => navigate('admin')} />
        : <Tab icon={icons.download} label="Exportar" active={screen === 'exportar'} onClick={() => navigate('exportar')} />
      }
    </div>
  )
}
