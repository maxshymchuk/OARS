import { X } from './models';
import * as math from 'mathjs';
import { instructions, inputs } from './config';

export function parse(value: string) {
  return math.parse(value).toTex({parenthesis: 'auto', implicit: 'hide'});
}

export function test(func: string, varX?: number[]) {
  const varNumber: number = +inputs.n.value;
  const x: {[s: string]: number} = {};
  for (let i = 0; i < varNumber; i++) {
    x[`x${i + 1}`] = varX ? varX[i] : 1;
  }
  return math.evaluate(func, x);
}

export const step = {
  currentStep: 1,
  show() {
    const INITIAL_STEP = 2;
    const instruction = document.getElementById('instruction') as HTMLElement;
    const title = instruction.querySelector('.title');
    const content = instruction.querySelector('.content');
    const stepBlocks = {
      step2: document.getElementById('target__mask'),
      step3: document.getElementById('limitations__mask'),
      step4: document.getElementById('variables_list__mask'),
      step5: document.getElementById('controls__mask'),
      step6: document.getElementById('result__mask')
    }
    for (let i = INITIAL_STEP; i < Object.keys(stepBlocks).length + INITIAL_STEP; i++) {
      if (i > this.currentStep) {
        stepBlocks[`step${i}`].classList.add('mask');
      } else {
        stepBlocks[`step${i}`].classList.remove('mask');
      }
    }
    title.innerHTML = instructions[`step${step.currentStep}`].title;
    content.innerHTML = instructions[`step${step.currentStep}`].content;
    instruction.scrollTop = 0;
  },
  set(step?: number) {
    if (this.currentStep !== step) {
      step ? this.currentStep = step : this.currentStep++;
      this.show();
    }
  },
  reset(step?: number) {
    this.currentStep = step ?? 1;
    this.show();
  }  
}