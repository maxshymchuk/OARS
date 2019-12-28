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

export type Setup = {
  n: number,
  m: number,
  h: number,
  hmin: number,
  targetFunction: string
}

export type SetupElements = {
  [x: string]: HTMLInputElement
}