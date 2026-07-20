import { useEffect, useState } from 'react'
import type { ScreenProps } from '../types'

export default function Splash({ navigate }: ScreenProps) {
  const cx = 120, cy = 120, r = 90, sw = 16
  const circ = 2 * Math.PI * r
  const arcTotal = circ * 0.75
  const arcGap = circ - arcTotal
  const TARGET = 0.82
  const ROT = 135

  const [progress, setProgress] = useState(0)
  const [showF, setShowF] = useState(false)
  const [showWord, setShowWord] = useState(false)
  const [scoreNum, setScoreNum] = useState(0)

  useEffect(() => {
    const t0 = setTimeout(() => {
      const dur = 1200, t = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t) / dur, 1)
        const e = 1 - Math.pow(1 - p, 3)
        setProgress(e * TARGET)
        setScoreNum(Math.round(e * 82))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 250)
    const t1 = setTimeout(() => setShowF(true), 550)
    const t2 = setTimeout(() => setShowWord(true), 1500)
    const t3 = setTimeout(() => navigate('login'), 2900)
    return () => [t0, t1, t2, t3].forEach(clearTimeout)
  }, [navigate])

  const filled = arcTotal * progress
  const empty = circ - filled
  const endDeg = ROT + progress * 270
  const endRad = (endDeg * Math.PI) / 180
  const dotX = cx + r * Math.cos(endRad)
  const dotY = cy + r * Math.sin(endRad)
  const startRad = (ROT * Math.PI) / 180
  const sDotX = cx + r * Math.cos(startRad)
  const sDotY = cy + r * Math.sin(startRad)
  const finalEndDeg = ROT + TARGET * 270
  const finalEndRad = (finalEndDeg * Math.PI) / 180
  const fDotX = cx + r * Math.cos(finalEndRad)
  const fDotY = cy + r * Math.sin(finalEndRad)

  return (
    <div style={{
      width: '100%', height: '100vh',
      backgroundColor: '#07070F',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
    }}>
      <style>{`
        @keyframes splashRing { from { opacity:0; transform:scale(0.85) } to { opacity:1; transform:scale(1) } }
        @keyframes splashF    { from { opacity:0 } to { opacity:1 } }
        @keyframes splashWord { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes dotPulse   {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.45); }
        }
        .s-ring { animation: splashRing 0.5s cubic-bezier(0.34,1.56,0.64,1) both }
        .s-f    { animation: splashF 0.4s ease both }
        .s-word { animation: splashWord 0.5s cubic-bezier(0.22,1,0.36,1) both }
        .s-dot  { transform-origin: ${fDotX}px ${fDotY}px; animation: dotPulse 1.8s ease-in-out infinite }
      `}</style>

      <div className="s-ring">
        <svg viewBox="0 0 240 240" width="240" height="240">
          <defs>
            <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#5B21B6" />
              <stop offset="55%"  stopColor="#9333EA" />
              <stop offset="100%" stopColor="#E879F9" />
            </linearGradient>
            <filter id="sGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sArcG" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="sBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#2D1B69" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#07070F"  stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r={115} fill="url(#sBg)" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1A1530" strokeWidth={sw} strokeLinecap="round"
            strokeDasharray={`${arcTotal} ${arcGap}`} transform={`rotate(${ROT} ${cx} ${cy})`} />

          {progress > 0 && (
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#splashGrad)" strokeWidth={sw}
              strokeLinecap="round" strokeDasharray={`${filled} ${empty}`}
              transform={`rotate(${ROT} ${cx} ${cy})`} filter="url(#sArcG)" />
          )}

          <circle cx={sDotX} cy={sDotY} r={4} fill="#3B0764" />

          {progress > 0.01 && (
            <>
              <circle cx={dotX} cy={dotY} r={10} fill="#E879F9" filter="url(#sGlow)"
                className={progress >= TARGET - 0.01 ? 's-dot' : ''} />
              <circle cx={dotX} cy={dotY} r={4.5} fill="white" />
            </>
          )}

          {showF && (
            <g className="s-f">
              <rect x="96" y="84" width="13" height="68" rx="3" fill="white" />
              <rect x="96" y="84" width="45" height="13" rx="3" fill="white" />
              <rect x="96" y="116" width="34" height="12" rx="3" fill="white" />
              <text x={cx + 10} y="175" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="700" letterSpacing="2">
                {scoreNum}
              </text>
            </g>
          )}
        </svg>
      </div>

      {showWord && (
        <div className="s-word" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '34px', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1,
            background: 'linear-gradient(135deg, #9333EA, #C084FC, #E879F9)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>FitScore</div>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '4px', color: '#4C1D95', marginTop: '6px' }}>
            EDUCAÇÃO FÍSICA
          </div>
        </div>
      )}
    </div>
  )
}
