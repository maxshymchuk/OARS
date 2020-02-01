import { Setup, Steps } from './models';
import { settingsDefault, inputs, buttons } from './config';
import { redrawFormula } from './formula';
import { apply } from './apply';
import { calc, worker } from './calc';
import { step } from './functions';
import { initValidation } from './validation';

document.body.onload = () => {
  // localStorage.clear();
  const setupParams: Setup = {
    n: +(localStorage.getItem('oars_n') ?? settingsDefault.n),
    m: +(localStorage.getItem('oars_m') ?? settingsDefault.m),
    h: +(localStorage.getItem('oars_h') ?? settingsDefault.h),
    hmin: +(localStorage.getItem('oars_hmin') ?? settingsDefault.hmin),
    targetFunction: localStorage.getItem('oars_targetFunction') ?? settingsDefault.targetFunction,
  }
  for (let i in inputs) {
    inputs[i].addEventListener('keyup', () => {
      localStorage.setItem(`oars_${i}`, inputs[i].value);
    });
    inputs[i].addEventListener('keydown', () => step.set(Steps.Settings));
    inputs[i].value = setupParams[i];
  }

  buttons.apply.addEventListener('click', () => apply());
  buttons.calculate.addEventListener('click', () => calc());

  buttons.addLimit.addEventListener('click', () => {
    step.set(Steps.Limits)

    const templateLineItem = document.getElementById('template__limitations__list_item') as HTMLTemplateElement;
    const limitationsList = document.querySelector('.limitations .limitations__list');

    const clone: Node = templateLineItem.content.cloneNode(true);
    const lineItem = (clone as Element).querySelector('.list_item');

    const input = lineItem.querySelector('input[name="expression"]');
    ['keyup','focus'].forEach(event =>
      input.addEventListener(event, (e: Event) => redrawFormula((e.target as HTMLInputElement)))
    );
    input.addEventListener('keydown', () => step.set(Steps.Limits));

    const delLimitButton = lineItem.querySelector('.list_item__button_delete') as HTMLButtonElement;
    delLimitButton.addEventListener('click', () => {
      limitationsList.removeChild(lineItem);
    })

    limitationsList.appendChild(lineItem);
  });

  inputs.targetFunction.addEventListener('keydown', () => step.set(Steps.Target));
  ['keyup','focus'].forEach(event =>
    inputs.targetFunction.addEventListener(event, (e: Event) => redrawFormula((e.target as HTMLInputElement)))
  );
  
  initValidation();

  const preloader = document.getElementById('preloader');
  preloader.addEventListener('dblclick', () => {
    document.getElementById('result__list').innerText = '';
    worker.terminate();
    preloader.classList.remove('visible');
  })

  const showHideInstrButton = document.getElementById('instruction__button_showhide') as HTMLButtonElement;
  showHideInstrButton.addEventListener('click', (e: Event) => {
    const target = (e.target as HTMLElement);
    const content = document.querySelector('.instruction__container .content') as HTMLElement;
    if (target.classList.contains('closed')) {
      target.classList.remove('closed');
      content.style.removeProperty('display');
    } else {
      target.classList.add('closed');
      content.style.display = 'none';
    }
  })

  step.reset();

  document.body.style.opacity = '1';
}