interface Props {
  title: string
  onBack?: () => void
  right?: React.ReactNode
}

export default function TopBar({ title, onBack, right }: Props) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '48px 16px 14px',
      position: 'sticky', top: 0, zIndex: 10,
      backgroundColor: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
    }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--primary)', padding: '6px', borderRadius: '10px',
            display: 'flex', alignItems: 'center',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text)', flex: 1 }}>
        {title}
      </h1>
      {right}
    </div>
  )
}
