import { X } from './models';
import * as math from 'mathjs';

export function parse(value: string) {
  return math.parse(value).toTex({parenthesis: 'auto', implicit: 'hide'});
}

export function copy<T>(obj: T): T {
  return {...obj};
}

export function evaluate(func: string, params: X[]): number {
  let obj = {};
  for (let i = 0; i < params.length; i++) {
    obj[`x${i + 1}`] = params[i].value;
  }
  return math.evaluate(func, obj);
}

export function rand(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}

export function randInt(a: number, b: number): number {
  return Math.round(Math.random() * (b - a) + a);
}

export function scrollToPos(pos: number): void {
  window.scroll({
    top: pos,
    behavior: 'smooth'
  });
}