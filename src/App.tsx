import { useState } from 'react'
import type { Screen, User, Avaliado, Avaliacao } from './types'
import { AVALIADOS, AVALIACOES } from './data'
import Splash from './screens/Splash'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import AvaliadosList from './screens/Avaliados'
import AvaliadoDetail from './screens/AvaliadoDetail'
import NovaAvaliacao from './screens/NovaAvaliacao'
import Relatorio from './screens/Relatorio'
import Ajuda from './screens/Ajuda'
import Admin from './screens/Admin'
import Exportar from './screens/Exportar'
import BottomNav from './components/BottomNav'

const NO_NAV: Screen[] = ['splash', 'login']

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [params, setParams] = useState<Record<string, string>>({})
  const [user, setUser] = useState<User | null>(null)
  const [avaliados, setAvaliados] = useState<Avaliado[]>(AVALIADOS)
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(AVALIACOES)
  const [navKey, setNavKey] = useState(0)

  const navigate = (
    newScreen: Screen,
    newParams?: Record<string, string>,
    dir: 'forward' | 'back' = 'forward',
  ) => {
    setDirection(dir)
    setParams(newParams ?? {})
    setScreen(newScreen)
    setNavKey(k => k + 1)
  }

  const props = { navigate, params, user, setUser, avaliados, avaliacoes, setAvaliados, setAvaliacoes }
  const showNav = !NO_NAV.includes(screen)
  const cls = NO_NAV.includes(screen)
    ? 'fade-in'
    : direction === 'back' ? 'screen-enter-back' : 'screen-enter'

  const Screen = () => {
    switch (screen) {
      case 'splash':         return <Splash {...props} />
      case 'login':          return <Login {...props} />
      case 'dashboard':      return <Dashboard {...props} />
      case 'avaliados':      return <AvaliadosList {...props} />
      case 'avaliado-detail':return <AvaliadoDetail {...props} />
      case 'nova-avaliacao': return <NovaAvaliacao {...props} />
      case 'relatorio':      return <Relatorio {...props} />
      case 'ajuda':          return <Ajuda {...props} />
      case 'admin':          return <Admin {...props} />
      case 'exportar':       return <Exportar {...props} />
      default:               return null
    }
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <div
          key={navKey}
          className={`${cls} app-screen`}
          style={{ paddingBottom: showNav ? 84 : 0 }}
        >
          <Screen />
        </div>
        {showNav && <BottomNav screen={screen} navigate={navigate} user={user} />}
      </div>
    </div>
  )
}
