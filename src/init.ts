import { X, SetupElements, StatusButton } from "./models";
import { randInt, scrollToPos } from "./functions";
import { optimize } from "./calc";
import { Modal } from "./Modal";
import { setupValidation } from "./config";

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

function checkX(target: HTMLInputElement, min: number, max: number): boolean {
  if (+target.value < min || +target.value > max) {
    target.classList.add('error');
    return false;
  } else {
    target.classList.remove('error');
    return true;
  }
}

function checkMin(target: HTMLInputElement, max: number): boolean {
  if (+target.value > max) {
    target.classList.add('error');
    return false;
  } else {
    target.classList.remove('error');
    return true;
  }
}

function checkMax(target: HTMLInputElement, min: number): boolean {
  if (+target.value < min) {
    target.classList.add('error');
    return false;
  } else {
    target.classList.remove('error');
    return true;
  }
}

function check(x: HTMLInputElement, min: HTMLInputElement, max: HTMLInputElement) {
  const buttonCalculate = document.getElementById('controls__button_calculate') as StatusButton;
  const isCheckX: boolean = checkX(x, +min.value, +max.value);
  const isCheckMin: boolean = checkMin(min, +max.value);
  const isCheckMax: boolean = checkMax(max, +min.value);
  buttonCalculate.status[2] = (isCheckX && isCheckMin && isCheckMax);
  buttonCalculate.checkStatus();
}

export function initApply(setupParamsElems: SetupElements) {
  const templateTableLine = document.getElementById('template__table_line') as HTMLTemplateElement;
  const settingsValuesElem = document.querySelector('.settings__values') as HTMLElement;
  const table = settingsValuesElem.querySelector('.table') as HTMLElement;
  const placeholder = settingsValuesElem.querySelector('.placeholder') as HTMLElement;
  const title = settingsValuesElem.querySelector('.title') as HTMLElement;
  const buttonCalculate = document.getElementById('controls__button_calculate') as StatusButton;
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
      const inputsX = inputs.filter(i => i.id.includes('input_x'));
      const inputsMin = inputs.filter(i => i.id.includes('input_min'));
      const inputsMax = inputs.filter(i => i.id.includes('input_max'));
      for (let i = 0; i < inputsX.length; i++) {
        inputsX[i].addEventListener('keyup', () => check(inputsX[i], inputsMin[i], inputsMax[i]));
        inputsMin[i].addEventListener('keyup', () => check(inputsX[i], inputsMin[i], inputsMax[i]));
        inputsMax[i].addEventListener('keyup', () => check(inputsX[i], inputsMin[i], inputsMax[i]));
      }
      table.appendChild(tableLine);
    }
    buttonCalculate.status[0] = true;
  } else {
    table.innerHTML = '';
    placeholder.style.display = 'block';
    title.style.display = 'none';
    table.style.display = 'none';
    buttonCalculate.status[0] = false;
  }
  buttonCalculate.checkStatus();
}

export function initCalculate(setupParamsElems: SetupElements) {
  const x: X[] = [];
  const inputsX = [...document.querySelectorAll('input[id*=settings__input_x]')] as HTMLInputElement[];
  const inputsXmin = [...document.querySelectorAll('input[id*=settings__input_min]')] as HTMLInputElement[];
  const inputsXmax = [...document.querySelectorAll('input[id*=settings__input_max]')] as HTMLInputElement[];
  const targetFunction = (document.getElementById('target__input_function') as HTMLInputElement).value;
  const resultListElem = document.getElementById('result__list');
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
    let list: string = '';
    for (let record of result) {
      list += `<li>${record.value}</li>`
    }
    resultListElem.innerHTML = `<ol>${list}</ol>`;
  } catch (error) {
    const modal = new Modal('template__alert');
    modal.alert({title: 'Ошибка!', content: error});
  }
}

export function initResult() {
  const resultListElem = document.getElementById('result__list');
  const scrollPos: number = resultListElem.getBoundingClientRect().top + window.scrollY;
  scrollToPos(scrollPos);
}