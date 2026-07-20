import type { User, Avaliado, Avaliacao } from './types'

export const USERS: User[] = [
  { id: 'u1', name: 'Carlos Oliveira', email: 'admin@fitscore.app', role: 'admin' },
  { id: 'u2', name: 'Ana Lima', email: 'ana.lima@escola.edu.br', role: 'avaliador' },
  { id: 'u3', name: 'Roberto Mendes', email: 'roberto@escola.edu.br', role: 'avaliador' },
]

export const AVALIADOS: Avaliado[] = [
  { id: 'a1', name: 'João Silva', age: 14, gender: 'M', escola: 'EMEF Santos Dumont', turma: '9ºA', createdAt: '2024-03-10' },
  { id: 'a2', name: 'Maria Santos', age: 13, gender: 'F', escola: 'EMEF Santos Dumont', turma: '8ºB', createdAt: '2024-03-10' },
  { id: 'a3', name: 'Pedro Costa', age: 15, gender: 'M', escola: 'EMEF Santos Dumont', turma: '9ºB', createdAt: '2024-03-11' },
  { id: 'a4', name: 'Lúcia Ferreira', age: 14, gender: 'F', escola: 'EMEF Santos Dumont', turma: '9ºA', createdAt: '2024-03-11' },
  { id: 'a5', name: 'Rafael Alves', age: 16, gender: 'M', escola: 'EMEF Santos Dumont', turma: '1ºEM', createdAt: '2024-03-12' },
  { id: 'a6', name: 'Camila Torres', age: 13, gender: 'F', escola: 'EMEF Santos Dumont', turma: '8ºA', createdAt: '2024-03-12' },
]

export const AVALIACOES: Avaliacao[] = [
  {
    id: 'av1', avaliadoId: 'a1', avaliadorId: 'u2', tipo: 'saude',
    data: '2024-06-15', score: 78,
    testes: [
      { nome: 'IMC', valor: '21.3', unidade: 'kg/m²', classificacao: 'Bom' },
      { nome: 'Resist. Abdominal', valor: '28', unidade: 'rep/min', classificacao: 'Bom' },
      { nome: 'Flexibilidade', valor: '31', unidade: 'cm', classificacao: 'Excelente' },
      { nome: 'Apt. Cardiorrespiratória', valor: '9:20', unidade: 'min', classificacao: 'Regular' },
    ],
    sincronizado: true,
  },
  {
    id: 'av2', avaliadoId: 'a2', avaliadorId: 'u2', tipo: 'saude',
    data: '2024-06-15', score: 85,
    testes: [
      { nome: 'IMC', valor: '19.8', unidade: 'kg/m²', classificacao: 'Excelente' },
      { nome: 'Resist. Abdominal', valor: '32', unidade: 'rep/min', classificacao: 'Excelente' },
      { nome: 'Flexibilidade', valor: '38', unidade: 'cm', classificacao: 'Excelente' },
      { nome: 'Apt. Cardiorrespiratória', valor: '8:45', unidade: 'min', classificacao: 'Bom' },
    ],
    sincronizado: true,
  },
  {
    id: 'av3', avaliadoId: 'a3', avaliadorId: 'u2', tipo: 'desempenho',
    data: '2024-06-16', score: 72,
    testes: [
      { nome: 'Velocidade 20m', valor: '3.42', unidade: 's', classificacao: 'Bom' },
      { nome: 'Agilidade Shuttle Run', valor: '10.8', unidade: 's', classificacao: 'Regular' },
      { nome: 'Salto Horizontal', valor: '182', unidade: 'cm', classificacao: 'Bom' },
      { nome: 'Preensão Manual', valor: '38', unidade: 'kgf', classificacao: 'Excelente' },
    ],
    sincronizado: false,
  },
  {
    id: 'av4', avaliadoId: 'a4', avaliadorId: 'u2', tipo: 'saude',
    data: '2024-06-17', score: 91,
    testes: [
      { nome: 'IMC', valor: '18.9', unidade: 'kg/m²', classificacao: 'Excelente' },
      { nome: 'Resist. Abdominal', valor: '36', unidade: 'rep/min', classificacao: 'Excelente' },
      { nome: 'Flexibilidade', valor: '42', unidade: 'cm', classificacao: 'Excelente' },
      { nome: 'Apt. Cardiorrespiratória', valor: '8:10', unidade: 'min', classificacao: 'Excelente' },
    ],
    sincronizado: true,
  },
  {
    id: 'av5', avaliadoId: 'a5', avaliadorId: 'u2', tipo: 'desempenho',
    data: '2024-06-18', score: 88,
    testes: [
      { nome: 'Velocidade 20m', valor: '2.98', unidade: 's', classificacao: 'Excelente' },
      { nome: 'Agilidade Shuttle Run', valor: '9.8', unidade: 's', classificacao: 'Excelente' },
      { nome: 'Salto Horizontal', valor: '210', unidade: 'cm', classificacao: 'Excelente' },
      { nome: 'Preensão Manual', valor: '45', unidade: 'kgf', classificacao: 'Excelente' },
    ],
    sincronizado: true,
  },
  {
    id: 'av6', avaliadoId: 'a6', avaliadorId: 'u2', tipo: 'saude',
    data: '2024-06-18', score: 64,
    testes: [
      { nome: 'IMC', valor: '23.1', unidade: 'kg/m²', classificacao: 'Bom' },
      { nome: 'Resist. Abdominal', valor: '19', unidade: 'rep/min', classificacao: 'Regular' },
      { nome: 'Flexibilidade', valor: '24', unidade: 'cm', classificacao: 'Fraco' },
      { nome: 'Apt. Cardiorrespiratória', valor: '11:30', unidade: 'min', classificacao: 'Regular' },
    ],
    sincronizado: false,
  },
]
