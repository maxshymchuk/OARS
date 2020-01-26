import { buttons, inputs } from "./config";
import { validate, check } from "./validation";

export function apply() {
  const templateTableLine = document.getElementById('template__table_line') as HTMLTemplateElement;
  const settingsValuesElem = document.querySelector('.settings__values') as HTMLElement;
  const table = settingsValuesElem.querySelector('.table') as HTMLElement;
  const placeholder = settingsValuesElem.querySelector('.placeholder') as HTMLElement;
  const values = settingsValuesElem.querySelector('.values') as HTMLElement;
  const buttonApply = document.getElementById('settings__button_apply') as HTMLButtonElement;

  if (validate(inputs)) {
    buttonApply.innerText = 'Обновить';
    placeholder.style.display = 'none';
    values.style.display = 'flex';
    // title.style.display = 'flex';
    // table.style.display = 'block';

    table.innerHTML = '';
    for (let i = 0; i < +inputs.n.value; i++) {
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
    buttons.calculate.status[0] = true;
  } else {
    table.innerHTML = '';
    placeholder.style.display = 'block';
    values.style.display = 'none';
    // title.style.display = 'none';
    // table.style.display = 'none';
    buttons.calculate.status[0] = false;
  }
  buttons.calculate.checkStatus();
}