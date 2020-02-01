import { settingsValidation, buttons, settingsErrors, inputs } from "./config";
import { step, test } from "./functions";
import { Steps } from "./models";

export function initValidation() {

  buttons.checkTarget.addEventListener('click', (e) => {
    try {
      test(inputs.targetFunction.value);
    } catch (error) {
      inputs.targetFunction.classList.add('error');
      inputs.targetFunction.setAttribute('title', error);
      return;
    }
    inputs.targetFunction.classList.remove('error');
    inputs.targetFunction.removeAttribute('title');
    step.set(Steps.Limits);
  });
  
  buttons.checkLimits.addEventListener('click', () => {
    const limitsContainer = document.querySelector('.limitations .limitations_container');
    const limitElems = limitsContainer.querySelectorAll('.list_item');
    const limitList = limitsContainer.querySelector('.limitations__list');

    let isAllValid: boolean = true;
    limitElems.forEach(lineItem => {
      const expInput = lineItem.querySelector('.limitations__expression') as HTMLInputElement;
      const resInput = lineItem.querySelector('.limitations__result') as HTMLInputElement;
      
      if (!expInput.value && !resInput.value) {
        limitList.removeChild(lineItem);
      } else if (!expInput.value && resInput.value || expInput.value && !resInput.value) {
        isAllValid = false;
      }

      try {
        test(expInput.value);
      } catch (error) {
        isAllValid = false;
        expInput.classList.add('error');
        expInput.setAttribute('title', error);
        return;
      }
      expInput.classList.remove('error');
      expInput.removeAttribute('title');
    })

    if (isAllValid) step.set(Steps.Vars);
  });
  
  buttons.checkVars.addEventListener('click', () => {
    const table = document.querySelector('.variables_list .table');
    const inputList = [...table.querySelectorAll('.table_line input')] as HTMLInputElement[];

    let isValid = true;
    inputList.forEach(input => {
      if (!input.value) {
        isValid = false;
        input.classList.add('error');
        input.setAttribute('title', 'Введите число');
      } else {
        input.classList.remove('error');
        input.removeAttribute('title');
      }
    })

    const inputsX = inputList.filter(i => i.id.includes('input_x'));
    const inputsMin = inputList.filter(i => i.id.includes('input_min'));
    const inputsMax = inputList.filter(i => i.id.includes('input_max'));
    for (let i = 0; i < inputsX.length; i++) {
      const x0: number = +inputsX[i].value;
      const xMin: number = +inputsMin[i].value;
      const xMax: number = +inputsMax[i].value;
      
      if (xMin > xMax) {
        isValid = false;
        inputsMin[i].classList.add('error');
        inputsMin[i].setAttribute('title', 'Xmin должен быть меньше Xmax');
      } else if (x0 < xMin || x0 > xMax) {
        isValid = false;
        inputsX[i].classList.add('error');
        inputsX[i].setAttribute('title', 'X0 должен быть в отрезке [Xmin, Xmax]');
      }
    }

    if (isValid) step.set(Steps.Calc);
  });

}

export function settingsValidate(inputs: {[x: string]: HTMLInputElement}): boolean {
  let result: boolean = true;
  for (let i in inputs) {
    const validate = settingsValidation[i];
    if (validate && !validate(+inputs[i].value)) {
      inputs[i].classList.add('error');
      inputs[i].setAttribute('title', settingsErrors[i]);
      result = false;
    } else {
      inputs[i].classList.remove('error');
      inputs[i].removeAttribute('title');
    }
  }
  return result;
}