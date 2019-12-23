import { X } from './models';
import * as math from 'mathjs';
const katex = require('katex');

// const templateInputX = document.getElementById('template__input_x') as HTMLTemplateElement;
// const columnRight: HTMLElement = document.querySelector('.column.right');
const targetFunctionElem = document.getElementById('controls__input_function') as HTMLInputElement;

targetFunctionElem.addEventListener('keyup', (e) => {
  const target = e.target as HTMLInputElement;
  let formula: string = math.parse(target.value).toTex({parenthesis: 'auto', implicit: 'hide'});
  katex.render(formula, document.getElementById('visual_formula'), {
    output: 'html',
    displayMode: true,
    leqno: false,
    fleqn: false,
    throwOnError: true,
    errorColor: "#cc0000",
    strict: "warn",
    trust: false,
  })
})

// document.getElementById('controls__apply').addEventListener('click', () => {
//   columnRight.innerHTML = '';
//   const elem = document.getElementById('controls__input_n') as HTMLInputElement;
//   for (let i = 0; i < +elem.value; i++) {
//     const clone: Node = templateInputX.content.cloneNode(true);
//     const label: HTMLLabelElement = (clone as Element).querySelector('label');
//     const inputs: HTMLInputElement[] = [...label.querySelectorAll('input')];
//     label.querySelector('span').innerText = `Input x${i + 1}`;
//     for (let input of inputs) {
//       input.setAttribute('id', `${input.name}${i + 1}`);
//       input.setAttribute('value', "0");
//     }
//     columnRight.appendChild(label);
//   }
// })

// let vars: X[];
// document.getElementById('controls__confirm').addEventListener('click', () => {
//   const inputs = [...document.querySelectorAll('input[id*=controls__input_x]')] as HTMLInputElement[];
//   for (let input of inputs) {
//     const prop: string = input.id.substring(input.id.lastIndexOf('_') + 1, input.id.length);
//     vars[prop] = input.value;
//   }
//   console.log(vars);
//   console.log(f(vars))
// })

// function f(params: X[]) {
//   return math.evaluate(targetFunctionElem.value, params);
// }

function rand(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}

const n: number = 3; // number of x-vars
const m: number = 20; // number of attempts
const hmin: number = 0.000001; // min step value
let h: number = 1; // start step

let x1: X = {
  value: 3,
  min: -10,
  max: 10,
  const: 25
}

let x2: X = {
  value: -11,
  min: -20,
  max: 20,
  const: 5
}

let x3: X = {
  value: 7,
  min: -30,
  max: 30,
  const: 15
}

function copy<T>(obj: T): T {
  return {...obj};
}

function f(params: X[]): number {
  const func = '(1-x1)^2+(2-x2)^2+(3-x3)^2';
  let obj = {};
  for (let i = 0; i < params.length; i++) {
    obj[`x${i + 1}`] = params[i].value;
  }
  return math.evaluate(func, obj);
}

function isStepOver(): boolean {
  return h <= hmin;
}

function isAttemptsOver(M: number): boolean {
  return M === m;
}

let x0: X[] = [x1, x2, x3];
let x: X[] = x0.map((i: X) => copy<X>(i));
let f0: number = f(x0);
console.log(x0.map((i: X) => copy<X>(i)));

do {
  let M: number = 0;
  do {
    let L: number = 0;
    for (let i = 0; i < n; i++) {
      const r: number = rand(-1, 1);
      const S: number = (x0[i].max - x0[i].min) / x0[i].const;
      const delta: number = h * S * r;
      let temp: X[] = x0.map((i: X) => copy<X>(i));
      temp[i].value += delta;
      const fnew: number = f(temp);

      x[i].value = x0[i].value + ((fnew <= f0) ? delta : 0);

      if (x[i].value < x0[i].min) {
        x[i].value = x0[i].min;
        L++;
      } else if (x[i].value > x0[i].max) {
        x[i].value = x0[i].max;
        L++;
      }
    }
    if (L === n) {
      M++;
    } else if (false) {
      M++;
    } else {
      const fnew: number = f(x);
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

console.log(x.forEach((v, i) => console.log(`x${i + 1} = ${v.value}`)));

// n = +(document.getElementById('controls__input_n') as HTMLInputElement).value;
// m = +(document.getElementById('controls__input_m') as HTMLInputElement).value;
// h = +(document.getElementById('controls__input_h') as HTMLInputElement).value;
// hmin = +(document.getElementById('controls__input_hmin') as HTMLInputElement).value;