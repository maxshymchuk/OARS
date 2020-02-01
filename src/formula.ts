import { parse } from './functions';

const katex = require('katex');

export function redrawFormula(input: HTMLInputElement) {
  const target = input.parentNode.querySelector('.formula') as HTMLElement;
  try {
    const formula: string = parse(input.value);
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
    // localStorage.setItem(`oars_${input.id}`, input.value);
  } catch (e) {
    target.innerHTML = `<div class="empty">${e}</div`;
  }
}