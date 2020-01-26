import { Setup } from './models';
import { setupDefault, inputs, buttons } from './config';
import { redrawFormula } from './formula';
import { apply } from './apply';
import { calc } from './calc';
import { scrollToPos } from './functions';

document.body.onload = () => {
  // localStorage.clear();
  console.log(localStorage)
  const setupParams: Setup = {
    n: +(localStorage.getItem('oars_n') ?? setupDefault.n),
    m: +(localStorage.getItem('oars_m') ?? setupDefault.m),
    h: +(localStorage.getItem('oars_h') ?? setupDefault.h),
    hmin: +(localStorage.getItem('oars_hmin') ?? setupDefault.hmin),
    targetFunction: localStorage.getItem('oars_targetFunction')  ?? setupDefault.targetFunction,
  }
  for (let i in inputs) {
    // inputs[i].addEventListener('focus', (e: { target: HTMLInputElement; }) => (e.target as HTMLInputElement).classList.remove('error'));
    inputs[i].addEventListener('keyup', () => {
      localStorage.setItem(`oars_${i}`, inputs[i].value);
    });
    inputs[i].value = setupParams[i];
  }

  buttons.calculate.status = [false, false, true];
  buttons.calculate.checkStatus = () => {
    buttons.calculate.disabled = !buttons.calculate.status.reduce((prev: boolean, curr: boolean) => prev && curr, true)
  }

  buttons.apply.addEventListener('click', () => apply());
  buttons.calculate.addEventListener('click', () => calc());

  buttons.result.addEventListener('click', () => {
    const resultListElem = document.getElementById('result__list');
    const scrollPos: number = resultListElem.getBoundingClientRect().top + window.scrollY;
    scrollToPos(scrollPos);
  });

  buttons.addLimit.addEventListener('click', () => {
    const templateLineItem = document.getElementById('template__limitations__list_item') as HTMLTemplateElement;
    const limitationsList = document.querySelector('.limitations .limitations__list');

    const clone: Node = templateLineItem.content.cloneNode(true);
    const lineItem = (clone as Element).querySelector('.list_item');

    const input = lineItem.querySelector('input[name="expression"]');
    ['keyup','focus'].forEach(event =>
      input.addEventListener(event, e => redrawFormula((e.target as HTMLInputElement)))
    );

    limitationsList.appendChild(lineItem);
  });

  ['keyup','focus'].forEach(event =>
    inputs.targetFunction.addEventListener(event, e => redrawFormula((e.target as HTMLInputElement)))
  );
}