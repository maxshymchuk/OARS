import { X, Setup } from '../models';
import { rand, evaluate, copy, isEqual } from '../functions';

type VarMessage = {
  params: Setup,
  values: X[]
}

const ctx: Worker = self as any;
 
ctx.addEventListener("message", (message: MessageEvent) => {
  console.log('To worker');
  console.log(message.data);

  const params = (message.data as VarMessage).params;
  const values = (message.data as VarMessage).values;

  let {n, m, h, hmin, targetFunction} = params;

  const isStepOver = (): boolean => h <= hmin;
  const isAttemptsOver = (M: number): boolean => M === m;

  let x0: X[] = values;
  let x: X[] = values;
  let f0: number = evaluate(targetFunction, x0);

  do {
    let M: number = 0;
    do {
      let L: number = 0;
      for (let i = 0; i < n; i++) {
        const r: number = rand(-1, 1);
        const S: number = (x[i].max - x[i].min) / x[i].const;
        const delta: number = h * (S ? S : 1) * r;
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
        M++; // 450+2*x1+1.5*x1^2+1.5*x2+1.2*x2^2+1.3*x3
        // 3+0.4x1+0.3x1^2+1.2x2+0.1x2^2
      } else if (false){//(!isEqual(evaluate('x1+x2', x), 1000)) {
        M++;
      } else {
        const fnew: number = evaluate(targetFunction, x);
        if (fnew < f0) {
          f0 = fnew; // ATTENTION
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