import { X, SetupElements, Setup } from './models';
import { setupConfig, setupValidation } from './config';
import { randInt } from './functions';
import { optimize } from './calc';
import { redrawFormula } from './formula';
import { Modal } from './Modal';

function validate(params: SetupElements): boolean {
  let result: boolean = true;
  for (let i in params) {
    if (!setupValidation[i](+params[i].value)) {
      params[i].classList.add('error');
      result = false;
    } else {
      params[i].classList.remove('error');
    }
  }
  return result;
}

document.body.onload = () => {
  const setupParams: Setup = {
    n: +(localStorage.getItem('oars_n') ?? setupConfig.n),
    m: +(localStorage.getItem('oars_m') ?? setupConfig.m),
    h: +(localStorage.getItem('oars_h') ?? setupConfig.h),
    hmin: +(localStorage.getItem('oars_hmin') ?? setupConfig.hmin),
    targetFunction: localStorage.getItem('oars_target__input_function')  ?? setupConfig.targetFunction,
  }
  const setupParamsElems: SetupElements = {
    n: document.getElementById('settings__input_n') as HTMLInputElement,
    m: document.getElementById('settings__input_m') as HTMLInputElement,
    h: document.getElementById('settings__input_h') as HTMLInputElement,
    hmin: document.getElementById('settings__input_hmin') as HTMLInputElement
  };
  for (let i in setupParamsElems) {
    setupParamsElems[i].addEventListener('focus', e => (e.target as HTMLInputElement).classList.remove('error'));
    setupParamsElems[i].addEventListener('keyup', e => localStorage.setItem(`oars_${i}`, setupParamsElems[i].value));
    setupParamsElems[i].value = setupParams[i];
  }
  const targetFunction = document.getElementById('target__input_function') as HTMLInputElement;
  targetFunction.value = setupParams.targetFunction;
  const templateTableLine = document.getElementById('template__table_line') as HTMLTemplateElement;
  const buttonApply = document.getElementById('settings__button_apply') as HTMLButtonElement;
  const buttonCalculate = document.getElementById('controls__button_calculate') as HTMLButtonElement;
  const buttonResult = document.getElementById('controls__button_result') as HTMLButtonElement;

  buttonApply.addEventListener('click', () => {
    const settingsValuesElem = document.querySelector('.settings__values') as HTMLElement;
    const table = settingsValuesElem.querySelector('.table') as HTMLElement;
    const placeholder = settingsValuesElem.querySelector('.placeholder') as HTMLElement;
    const title = settingsValuesElem.querySelector('.title') as HTMLElement;
    if (validate(setupParamsElems)) {
      placeholder.style.display = 'none';
      title.style.display = 'flex';
      table.style.display = 'block';

      table.innerHTML = '';
      for (let i = 0; i < +setupParamsElems.n.value; i++) {
        const clone: Node = templateTableLine.content.cloneNode(true);
        const tableLine: HTMLLabelElement = (clone as Element).querySelector('.table_line');
        const inputs: HTMLInputElement[] = [...tableLine.querySelectorAll('input')];
        for (let input of inputs) {
          input.setAttribute('id', `${input.id}${i + 1}`);
        }
        table.appendChild(tableLine);
      }
      buttonCalculate.disabled = false;
    } else {
      table.innerHTML = '';
      placeholder.style.display = 'block';
      title.style.display = 'none';
      table.style.display = 'none';
      buttonCalculate.disabled = true;
    }
  })

  buttonCalculate.addEventListener('click', () => {
    const x: X[] = [];
    const inputsX = [...document.querySelectorAll('input[id*=settings__input_x]')] as HTMLInputElement[];
    const inputsXmin = [...document.querySelectorAll('input[id*=settings__input_min]')] as HTMLInputElement[];
    const inputsXmax = [...document.querySelectorAll('input[id*=settings__input_max]')] as HTMLInputElement[];
    const targetFunction = (document.getElementById('target__input_function') as HTMLInputElement).value;
    for (let i = 0; i < +setupParamsElems.n.value; i++) {
      x.push({
        value: +inputsX[i].value,
        min: +inputsXmin[i].value,
        max: +inputsXmax[i].value,
        const: randInt(5, 30)
      })
    }
    try {
      const result = optimize({
        n: +setupParamsElems.n.value,
        m: +setupParamsElems.m.value,
        h: +setupParamsElems.h.value,
        hmin: +setupParamsElems.hmin.value,
        targetFunction: targetFunction
      }, x);
      console.log(result);
    } catch (error) {
      const modal = new Modal('template__alert');
      modal.alert({title: 'Ошибка!', content: error});
    }
  })

  const expressions: NodeList = document.querySelectorAll('input[name="expression"]');
  expressions.forEach(exp => {
    ['keyup','focus'].forEach(event =>
      exp.addEventListener(event, (e) => redrawFormula((e.target as HTMLInputElement)))
    );
  })
  // const values: X[] = getValues();
}