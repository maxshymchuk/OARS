import { StatusButton } from "./models";
import { setupValidation } from "./config";

export function validate(params: {[x: string]: HTMLInputElement}): boolean {
  let result: boolean = true;
  for (let i in params) {
    const checker = setupValidation[i];
    if (checker && !checker(+params[i].value)) {
      params[i].classList.add('error');
      result = false;
    } else {
      params[i].classList.remove('error');
    }
  }
  return result;
}

function checkX(target: HTMLInputElement, minElem: HTMLInputElement, maxElem: HTMLInputElement): boolean {
  const min: number = +(!minElem.value ? -Infinity : minElem.value);
  const max: number = +(!maxElem.value ? Infinity : maxElem.value);
  if (+target.value < min || +target.value > max) {
    target.classList.add('error');
    return false;
  } else {
    target.classList.remove('error');
    return true;
  }
}

function checkMin(target: HTMLInputElement, maxElem: HTMLInputElement): boolean {
  const max: number = +(!maxElem.value ? Infinity : maxElem.value);
  const value = !target.value ? -Infinity : +target.value;
  if (value > max) {
    target.classList.add('error');
    return false;
  } else {
    target.classList.remove('error');
    return true;
  }
}

function checkMax(target: HTMLInputElement, minElem: HTMLInputElement): boolean {
  const min: number = !minElem.value ? -Infinity : +minElem.value;
  const value = !target.value ? Infinity : +target.value;
  if (value < min) {
    target.classList.add('error');
    return false;
  } else {
    target.classList.remove('error');
    return true;
  }
}

export function check(x: HTMLInputElement, min: HTMLInputElement, max: HTMLInputElement) {
  const buttonCalculate = document.getElementById('controls__button_calculate') as StatusButton;
  const isCheckX: boolean = checkX(x, min, max);
  const isCheckMin: boolean = checkMin(min, max);
  const isCheckMax: boolean = checkMax(max, min);
  buttonCalculate.status[2] = (isCheckX && isCheckMin && isCheckMax);
  buttonCalculate.checkStatus();
}