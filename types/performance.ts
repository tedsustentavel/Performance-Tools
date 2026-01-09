export interface Dimensao {
  id: string;
  nome: string;
  def: string;
}

export interface Competencia {
  nome: string;
  icon: string;
  cor: string;
  dimensoes: Dimensao[];
}

export interface GrupoCompetencia {
  [key: string]: Competencia;
}

export interface Comportamentos {
  [key: string]: {
    [nivel: number]: string;
  };
}

export interface DadosAvaliacao {
  nomeColaborador: string;
  cargoColaborador: string;
  unidade: string;
  nomeGestor: string;
  cargoGestor: string;
  dataAvaliacao: string;
}

export interface Notas {
  [dimensaoId: string]: number;
}

export interface Comentarios {
  [dimensaoId: string]: string;
}

export interface Destaques {
  [dimensaoId: string]: boolean;
}

export interface Cargo {
  value: string;
  label: string;
  lideranca: boolean;
}