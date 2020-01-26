import { parse } from './functions';
import { buttons } from './config';

const katex = require('katex');

export function redrawFormula(input: HTMLInputElement) {
  const target = input.parentNode.querySelector('.formula') as HTMLElement;
  try {
    const formula: string = parse(input.value);
    console.log(formula)
    if (!input.value) throw 'Введите выражение';
    katex.render(formula, target, {
      output: 'html',
      displayMode: true,
      leqno: false,
      fleqn: false,
      throwOnError: true,
      errorColor: "#cc0000",
      strict: "warn",
      trust: false,
    })
    input.classList.remove('error');
    buttons.calculate.status[1] = true;
    localStorage.setItem(`oars_${input.id}`, input.value);
  } catch (e) {
    target.innerHTML = `<div class="empty">${e}</div`;
    input.classList.add('error');
    buttons.calculate.status[1] = false;
  }
  buttons.calculate.checkStatus();
}