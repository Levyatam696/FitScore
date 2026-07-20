export type Screen =
  | 'splash' | 'login' | 'dashboard'
  | 'avaliados' | 'avaliado-detail' | 'nova-avaliacao'
  | 'relatorio' | 'ajuda' | 'admin' | 'exportar'

export type UserRole = 'admin' | 'avaliador'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Avaliado {
  id: string
  name: string
  age: number
  gender: 'M' | 'F'
  escola: string
  turma: string
  createdAt: string
}

export type AvaliacaoTipo = 'saude' | 'desempenho'
export type Classificacao = 'Excelente' | 'Bom' | 'Regular' | 'Fraco'

export interface TesteResult {
  nome: string
  valor: string
  unidade: string
  classificacao: Classificacao
}

export interface Avaliacao {
  id: string
  avaliadoId: string
  avaliadorId: string
  tipo: AvaliacaoTipo
  data: string
  score: number
  testes: TesteResult[]
  sincronizado: boolean
}

export interface ScreenProps {
  navigate: (screen: Screen, params?: Record<string, string>) => void
  params: Record<string, string>
  user: User | null
  setUser: (user: User | null) => void
  avaliados: Avaliado[]
  avaliacoes: Avaliacao[]
  setAvaliados: (avaliados: Avaliado[]) => void
  setAvaliacoes: (avaliacoes: Avaliacao[]) => void
}
