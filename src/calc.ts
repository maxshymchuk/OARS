import { inputs, configuration } from "./config";
import { X, Sign, Steps } from "./models";

import Worker from './worker';
import { step } from "./functions";

function randInt(a: number, b: number): number {
  return Math.round(Math.random() * (b - a) + a);
}

export let worker: Worker;

export function getLimitExps(): string[] {
  const limitItems = [...document.querySelectorAll('.limitations_container .list_item')] as HTMLElement[];
  const inputsLimit = {
    funcs: [...document.querySelectorAll('.limitations_container .limitations__expression')] as HTMLInputElement[],
    signs: [...document.querySelectorAll('.limitations_container .limitations__sign')] as HTMLSelectElement[],
    results: [...document.querySelectorAll('.limitations_container .limitations__result')] as HTMLInputElement[]
  }
  let limitExps: string[] = [];
  for (let i = 0; i < limitItems.length; i++) {
    const exp: string = inputsLimit.funcs[i].value;
    const res: number = +inputsLimit.results[i].value;
    const option: Sign = Sign[(inputsLimit.signs[i][inputsLimit.signs[i].selectedIndex] as HTMLOptionElement).value];
    switch (option) {
      case Sign.Equal:
        limitExps.push(`(${exp}-${res}>-${configuration.errorValue})and(${exp}-${res}<${configuration.errorValue})`);
        break;
      case Sign.Unequal:
        limitExps.push(`(${exp}-${res}<-${configuration.errorValue})and(${exp}-${res}>${configuration.errorValue})`);
        break;
      default:
        limitExps.push(`${inputsLimit.funcs[i].value}${option}${inputsLimit.results[i].value}`);
    } 
  }
  return limitExps;
}

export function calc() {
  const x: X[] = [];
  const inputsX = {
    values: [...document.querySelectorAll('input[id*=variables_list__input_x]')] as HTMLInputElement[],
    mins: [...document.querySelectorAll('input[id*=variables_list__input_min]')] as HTMLInputElement[],
    maxs: [...document.querySelectorAll('input[id*=variables_list__input_max]')] as HTMLInputElement[]
  }  
  for (let i = 0; i < +inputs.n.value; i++) {
    x.push({
      value: +inputsX.values[i].value,
      min: +(inputsX.mins[i].value ? inputsX.mins[i].value : -Infinity),
      max: +(inputsX.maxs[i].value ? inputsX.maxs[i].value : Infinity),
      const: randInt.apply(null, configuration.constRange)
    })
  }

  const preloader = document.getElementById('preloader');
  preloader.classList.add('visible');

  worker = new Worker();
  worker.postMessage({
    params: {
      n: +inputs.n.value,
      m: +inputs.m.value,
      h: +inputs.h.value,
      hmin: +inputs.hmin.value,
      targetFunction: inputs.targetFunction.value
    }, 
    values: x,
    limits: getLimitExps()
  });
  worker.addEventListener("message", (event: any) => {
    const result: X[] = event.data;
    let list: string = '';
    for (let record of result) {
      list += `<li>${record.value}</li>`
    }
    document.getElementById('result__list').innerHTML = `<ol>${list}</ol>`;

    preloader.classList.remove('visible');

    step.set(Steps.Results);
  });
}