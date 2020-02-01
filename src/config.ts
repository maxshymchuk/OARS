import { Setup } from "./models";

export const CONST = {
  INFINITY: 1E18,
}

export const configuration = {
  errorValue: 0.001,
  constRange: [5, 30]
}

export const inputs = {
  n: document.getElementById('settings__input_n') as HTMLInputElement,
  m: document.getElementById('settings__input_m') as HTMLInputElement,
  h: document.getElementById('settings__input_h') as HTMLInputElement,
  hmin: document.getElementById('settings__input_hmin') as HTMLInputElement,
  targetFunction: document.getElementById('target__input_function') as HTMLInputElement
}

export const buttons = {
  apply: document.getElementById('settings__button_apply') as HTMLButtonElement,
  calculate: document.getElementById('controls__button_calculate') as HTMLButtonElement,
  addLimit: document.getElementById('limitations__button_add') as HTMLButtonElement,
  checkTarget: document.getElementById('target__button_check') as HTMLButtonElement,
  checkLimits: document.getElementById('limitations__button_check') as HTMLButtonElement,
  checkVars: document.getElementById('variables_list__values__button_check') as HTMLButtonElement
}

export const settingsDefault: Setup = {
  n: 3,
  m: 20,
  h: 1,
  hmin: 0.001,
  targetFunction: '(1-x1)^2+(2-x2)^2+(3-x3)^2'
}

export const settingsValidation = {
  n: (x: number) => (x ^ 0) && (x > 0),
  m: (x: number) => (x ^ 0) && (x > 0),
  h: (x: number) => (x > 0),
  hmin: (x: number) => (x > 0) && (x < +inputs.h.value),
}

export const settingsErrors = {
  n: 'Введите натуральное число (1...inf)',
  m: 'Введите натуральное число (1...inf)',
  h: 'Введите число (целое или дробное) больше нуля',
  hmin: 'Введите число (целое или дробное) больше нуля. Должно быть меньше значения "h"'
}

export const instructions = {
  step1: {
    title: 'Шаг 1. Выставите начальные значения параметров.',
    content: `
      <p class="warning"><b>Внимание!</b><br/>
      При изменении данных на предыдущих шагах все последующие шаги заблокируются
      и потребуется повторная проверка введенных значений!</p>
      <p class="advice">При неверно введенном значении панель ввода подсвечивается красным,
      по наведению мыши можно узнать в чем заключается ошибка</p>
      <ul>
      <li><i>Число параметров n</i> - количество переменных "xN", где N - число от 1 до введенного натурального числа;</li>
      <li><i>Число попыток m</i> - максимальное количество неудачных приближений,
      чем больше, тем дольше выполняется программа, следовательно, точнее и результат;</li>
      <li><i>Начальный шаг h</i> - шаг поиска в начальный момент времени, постепенно уменьшается;</li>
      <li><i>Конечный шаг hmin</i> - шаг, при достижении которого выполнение программы прекращается.</li>
      </ul>
    `
  }, 
  step2: {
    title: 'Шаг 2. Ввод целевой функции.',
    content: `
      <p class="advice">Синтаксис ввода функций схож с синтаксисом LaTeX</p>
      <span>Соблюдайте следующие правила ввода функции:</span>
      <ul>
      <li>Переменные записывайте в виде "xN", где N - число, номер переменной;</li>
      <li>Показатель степени записывайте через "^". Пример: x^2, x^13, можно и со скобками - x^(11).</li>
      </ul>
      <p class="warning">Всегда указывайте ровно столько переменных, сколько указали на первом шаге!<br/>
      Если n = 3, то должны присутствовать x1, x2 и x3</p>
    `
  },
  step3: {
    title: 'Шаг 3. Ввод функций-ограничений.',
    content: `
      <p class="warning">Необходимо заполнять оба поля ввода для каждого ограничения, иначе будет вызвано исключение!<br/>
      Пустые ограничения будут удаляться и игнорироваться</p>
      <span>Сравнение (= и <>) представляет собой проверку значения на вхождение в отрезок
      [<введенное_число> - <погрешность>, <введенное_число> + <погрешность>],
      где <погрешность> - константа, равная ${configuration.errorValue}.</span><br/>
      <p class="advice">Ввод аналогичен вводу функции на предыдущем шаге.</p>
    `
  },
  step4: {
    title: 'Шаг 4. Ввод начальных значений и их пределов.',
    content: `
      <p class="warning">Начальные значения должны быть таковыми, чтобы <b>ВСЕ</b> ограничения выполнялись!</p>
      <p class="advice">Для более быстрой и корректной работы алгоритма указывайте пределы переменных как можно точнее!
      При отсутствии значения будет использоваться "бесконечность", равная ${CONST.INFINITY.toExponential()}</p>
    `
  },
  step5: {
    title: 'Шаг 5. Поиск оптимального значения.',
    content:  `
      <span>Для начала поиска нажмите кнопку "РАССЧИТАТЬ".</span>
      <p class="advice">Для более точного расчета можете увеличить количество попыток m, но программа будет выполняться дольше</p>
      <p class="advice">Если поиск выполняется более 2 минут - уменьшите количество попыток или начальный шаг, или увеличьте конечный шаг</p>
    `
  },
  step6: {
    title: 'Вывод результатов',
    content: `
      <span>При перезапуске программы вы можете получить иной ответ, т. к. в процессе поиска имеется элемент случайности - 
      направление поиска выбирается из случайной равномерно распределенной величины.</span>
      <p class="warning">Найденные значения не претендуют на самый оптимальный вариант!</p>
    `
  }
}