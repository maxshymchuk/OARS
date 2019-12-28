import { Setup } from "./models";

export const setupConfig: Setup = {
  n: 3,
  m: 20,
  h: 1,
  hmin: 0.001,
  targetFunction: '(1-x1)^2+(2-x2)^2+(3-x3)^2'
}

export const setupValidation = {
  n: (x: number) => (x ^ 0) && (x > 0),
  m: (x: number) => (x ^ 0) && (x > 0),
  h: (x: number) => (x > 0) && (x <= 1),
  hmin: (x: number) => (x > 0) && (x <= 1)
}