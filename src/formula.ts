import { parse } from './functions';
const katex = require('katex');

export function redrawFormula(element: HTMLInputElement) {
  const buttonCalculate = document.getElementById('controls__button_calculate') as HTMLButtonElement;
  const target = element.parentNode.querySelector('.formula') as HTMLElement;
  try {
    const formula: string = parse(element.value);
    if (!element.value) throw 'Введите функцию';
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
    element.classList.remove('error');
    buttonCalculate.disabled = false;
    localStorage.setItem(`oars_${element.id}`, element.value);
  } catch (e) {
    target.innerHTML = `<div>${e}</div`;
    element.classList.add('error');
    buttonCalculate.disabled = true;
  }
}