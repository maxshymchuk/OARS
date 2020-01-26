import { Setup, StatusButton } from "./models";

export const configuration = {
  errorValue: 0.01,
  constRange: [5, 30]
}

export const inputs = {
  n: document.getElementById('settings__input_n') as HTMLInputElement,
  m: document.getElementById('settings__input_m') as HTMLInputElement,
  h: document.getElementById('settings__input_h') as HTMLInputElement,
  hmin: document.getElementById('settings__input_hmin') as HTMLInputElement,
  targetFunction: document.getElementById('target__input_function') as HTMLInputElement
}

export const buttons = {
  apply: document.getElementById('settings__button_apply') as HTMLButtonElement,
  calculate: document.getElementById('controls__button_calculate') as StatusButton,
  result: document.getElementById('controls__button_result') as HTMLButtonElement,
  addLimit: document.getElementById('limitations__button_add') as HTMLButtonElement
}

export const setupDefault: Setup = {
  n: 3,
  m: 20,
  h: 1,
  hmin: 0.001,
  targetFunction: '(1-x1)^2+(2-x2)^2+(3-x3)^2'
}

export const setupValidation = {
  n: (x: number) => (x ^ 0) && (x > 0),
  m: (x: number) => (x ^ 0) && (x > 0),
  h: (x: number) => (x > 0),
  hmin: (x: number) => (x > 0) && (x < +inputs.h.value),
}