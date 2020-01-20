import { parse } from './functions';
import { StatusButton } from './models';
const katex = require('katex');

export function redrawFormula(element: HTMLInputElement) {
  const buttonCalculate = document.getElementById('controls__button_calculate') as StatusButton;
  const target = element.parentNode.querySelector('.formula') as HTMLElement;
  try {
    const formula: string = parse(element.value);
    if (!element.value) throw 'Введите выражение';
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
    buttonCalculate.status[1] = true;
    localStorage.setItem(`oars_${element.id}`, element.value);
  } catch (e) {
    target.innerHTML = `<div>${e}</div`;
    element.classList.add('error');
    buttonCalculate.status[1] = false;
  }
  buttonCalculate.checkStatus();
}