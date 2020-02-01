export enum Steps {
  Settings = 1,
  Target = 2,
  Limits = 3,
  Vars = 4,
  Calc = 5,
  Results = 6
}

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