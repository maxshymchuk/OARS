import { X, Setup } from './models';
import { rand, evaluate, copy } from './functions';

export function optimize(params: Setup, values: X[]): X[] {
  let {n, m, h, hmin, targetFunction} = params;

  const isStepOver = (): boolean => h <= hmin;
  const isAttemptsOver = (M: number): boolean => M === m;

  let x0: X[] = values;
  let x: X[] = x0.map((i: X) => copy<X>(i));
  let f0: number = evaluate(targetFunction, x0);

  do {
    let M: number = 0;
    do {
      let L: number = 0;
      for (let i = 0; i < n; i++) {
        const r: number = rand(-1, 1);
        const S: number = (x0[i].max - x0[i].min) / x0[i].const;
        console.log(S);
        const delta: number = h * (S ? S : 1) * r;
        let temp: X[] = x0.map((i: X) => copy<X>(i));
        temp[i].value += delta;
        const fnew: number = evaluate(targetFunction, temp);

        x[i].value = x0[i].value + ((fnew <= f0) ? delta : 0);

        if (x[i].value < x0[i].min) {
          x[i].value = x0[i].min;
          L++;
        } else if (x[i].value > x0[i].max) {
          x[i].value = x0[i].max;
          L++;
        }
      }
      let a = evaluate('x1+x2+x3', x);
      // console.log(x);
      if (L === n) { // установить xmin = 0; xmax = 100; error = 0,0001
        M++; // 450+2*x1+1.5*x1^2+1.5*x2+1.2*x2^2+1.3*x3
      } else if (a == 1000) { // x1 + x2 + x3 = 1000; x1, x2, x3 >= 0
        M++;
      } else {
        const fnew: number = evaluate(targetFunction, x);
        if (fnew < f0) {
          f0 = fnew;
          x0 = x.map((i: X) => copy<X>(i));
          break;
        } else {
          M++;
        }
      }
    } while (!isAttemptsOver(M));
    if (isAttemptsOver(M) && !isStepOver()) {
      h /= 2;
    }
  } while (!isStepOver());

  return x;
}