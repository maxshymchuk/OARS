export type ModalAlert = {
  title: string;
  content?: string;
  closeText?: string;
};

export type X = {
  value: number,
  min: number,
  max: number,
  const: number,
}

export enum Sign {
  Greater = ' > ',
  GreaterEqual = ' >= ',
  Less = ' < ',
  LessEqual = ' <= ',
  Equal = ' == ',
  Unequal = ' != '
}

export type Limit = {
  func: string,
  sign: Sign,
  result: number
}

export type Setup = {
  n: number,
  m: number,
  h: number,
  hmin: number,
  targetFunction: string
}

export interface StatusButton extends HTMLButtonElement {
  status: boolean[];
  checkStatus(): void;
}