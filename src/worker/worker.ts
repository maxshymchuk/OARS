import { X, Setup } from '../models';
import math = require('mathjs');

function evaluate(func: string, params: X[]): number {
  let obj = {};
  for (let i = 0; i < params.length; i++) {
    obj[`x${i + 1}`] = params[i].value;
  }
  return math.evaluate(func, obj);
}

type VarMessage = {
  params: Setup,
  values: X[],
  limits: string[]
}

function copy<T>(obj: T): T {
  return {...obj};
}

function rand(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}

const ctx: Worker = self as any;
 
ctx.addEventListener("message", (message: MessageEvent) => {
  const {params, values, limits} = (message.data as VarMessage);
  let {n, m, h, hmin, targetFunction} = params;

  const checkLimits = (x: X[]): boolean => {
    return limits.map(i => !!evaluate(i, x)).reduce((prev: boolean, curr: boolean) => prev && curr, true);
  }

  const isStepOver = (): boolean => h <= hmin;
  const isAttemptsOver = (M: number): boolean => M === m;

  let x0: X[] = values.map((i: X) => copy<X>(i));
  let x: X[] = values.map((i: X) => copy<X>(i));
  let f0: number = evaluate(targetFunction, x0);

  do {
    let M: number = 0;
    do {
      let L: number = 0;
      for (let i = 0; i < n; i++) {
        const r: number = rand(-1, 1);
        const S: number = (x[i].max - x[i].min) / x[i].const;
        const delta: number = h * S * r;
        let temp: X[] = x.map((i: X) => copy<X>(i));
        temp[i].value += delta;
        const fnew: number = evaluate(targetFunction, temp);

        x[i].value = x[i].value + ((fnew <= f0) ? delta : 0);

        if (x[i].value < x[i].min) {
          x[i].value = x[i].min;
          L++;
        } else if (x[i].value > x[i].max) {
          x[i].value = x[i].max;
          L++;
        }
      }
      if (L === n) {
        M++; 
        // 450+2*x1+1.5*x1^2+1.5*x2+1.2*x2^2+1.3*x3
        // 3+0.4x1+0.3x1^2+1.2x2+0.1x2^2
        // (1-x1)^2+(2-x2)^2+(3-x3)^2
      } else if (!checkLimits(x)) {
        M++;
      } else {
        const fnew: number = evaluate(targetFunction, x);
        if (fnew < f0) {
          f0 = fnew;
          x0 = x.map((i: X) => copy<X>(i));
        } else {
          M++;
        }
      }
    } while (!isAttemptsOver(M));
    if (isAttemptsOver(M) && !isStepOver()) {
      h /= 2;
    }
  } while (!isStepOver());

  ctx.postMessage(x0);
});