import { inputs } from "./config";
import { settingsValidate } from "./validation";
import { step } from "./functions";
import { Steps } from "./models";

export function apply() {
  const templateTableLine = document.getElementById('template__table_line') as HTMLTemplateElement;
  const variablesListElem = document.querySelector('.variables_list') as HTMLElement;
  const table = variablesListElem.querySelector('.table') as HTMLElement;

  if (settingsValidate(inputs)) {
    table.innerHTML = '';
    for (let i = 0; i < +inputs.n.value; i++) {
      const clone: Node = templateTableLine.content.cloneNode(true);
      const tableLine: HTMLLabelElement = (clone as Element).querySelector('.table_line');
      const inputs: HTMLInputElement[] = [...tableLine.querySelectorAll('input')];
      for (let input of inputs) {
        input.setAttribute('id', `${input.id}${i + 1}`);
      }
      table.appendChild(tableLine);
    }
    step.set(Steps.Target);
  }
}