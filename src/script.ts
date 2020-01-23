import { SetupElements, Setup, StatusButton } from './models';
import { setupConfig } from './config';
import { redrawFormula } from './formula';
import { initApply, initCalculate, initResult, initLimitations } from './init';

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
    setupParamsElems[i].addEventListener('keyup', () => localStorage.setItem(`oars_${i}`, setupParamsElems[i].value));
    setupParamsElems[i].value = setupParams[i];
  }
  const targetFunction = document.getElementById('target__input_function') as HTMLInputElement;
  targetFunction.value = setupParams.targetFunction;

  const buttonApply = document.getElementById('settings__button_apply') as HTMLButtonElement;
  const buttonCalculate = document.getElementById('controls__button_calculate') as StatusButton;
  const buttonResult = document.getElementById('controls__button_result') as HTMLButtonElement;
  const buttonAddLimit = document.getElementById('limitations__button_add') as HTMLButtonElement;

  buttonCalculate.status = [false, false, true];
  buttonCalculate.checkStatus = () => {
    buttonCalculate.disabled = !buttonCalculate.status.reduce((prev: boolean, curr: boolean) => prev && curr, true)
  }

  buttonApply.addEventListener('click', () => initApply(setupParamsElems));
  buttonCalculate.addEventListener('click', () => initCalculate(setupParamsElems));
  buttonResult.addEventListener('click', () => initResult());
  buttonAddLimit.addEventListener('click', () => initLimitations());

  const expressions: NodeList = document.querySelectorAll('input[name="expression"]');
  expressions.forEach(exp => {
    ['keyup','focus'].forEach(event =>
      exp.addEventListener(event, (e: any) => redrawFormula((e.target as HTMLInputElement)))
    );
  })

  redrawFormula(targetFunction);
}