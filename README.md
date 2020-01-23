# Оптимизация методом случайного поиска

Реализация алгоритма оптимизации методом случайного поиска, описанного в книге Боровикова С. М. "Теоретические основы конструирования, технологии и надежности" - 1998. ISBN 985-6182-51-4

### Краткое изложение алгоритма

Наиболее простой алгоритм случайного поиска для случая
минимизации целевой функции F задается итеративным выражением:

<center><a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}=x_i^{(k)}&plus;\left\{\begin{matrix}&space;hS_ir_i&space;\leftarrow&space;F[x_i^{(k)}&plus;hS_ir_i]\leq&space;F[x_i^{(k)}]&space;\\&space;0&space;\leftarrow&space;F[x_i^{(k)}&plus;hS_ir_i]&space;>&space;F[x_i^{(k)}]&space;\end{matrix}\right." target="_blank"><img src="https://latex.codecogs.com/svg.latex?x_i^{(k&plus;1)}=x_i^{(k)}&plus;\left\{\begin{matrix}&space;hS_ir_i&space;\leftarrow&space;F[x_i^{(k)}&plus;hS_ir_i]\leq&space;F[x_i^{(k)}]&space;\\&space;0&space;\leftarrow&space;F[x_i^{(k)}&plus;hS_ir_i]&space;>&space;F[x_i^{(k)}]&space;\end{matrix}\right." title="x_i^{(k+1)}=x_i^{(k)}+\left\{\begin{matrix} hS_ir_i \leftarrow F[x_i^{(k)}+hS_ir_i]\leq F[x_i^{(k)}] \\ 0 \leftarrow F[x_i^{(k)}+hS_ir_i] > F[x_i^{(k)}] \end{matrix}\right." /></a></center>

- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?k" title="x_i^{(k+1)}" /></a> – номер итерации (приближения к оптимуму)
- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?x_i^{(k)}" title="x_i^{(k)}" /></a> – значение i-го оптимизируемого параметра в k-й итерации
- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?x_i^{(k&plus;1)}" title="x_i^{(k+1)}" /></a> – значение i-го оптимизируемого параметра в (k + 1) итерации
- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?h" title="h" /></a> – шаг поиска оптимума
- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?r_i" title="r_i" /></a> – случайное число с равномерным законом распределения в диапазоне (-1...+1), используемое для определения значения и направления смещения (рабочего шага) i-го оптимизируемого параметра;
- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?S_i" title="S_i" /></a> – приращение, установленное для i-го оптимизируемого параметра, называемое также шкальным коэффициентом.

Шкальные коэффициенты <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?S_i" title="S_i" /></a> определяют по:

<center><a href="https://www.codecogs.com/eqnedit.php?latex=S_i=\frac{x_{imax}-x_{imin}}{C_i}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?S_i=\frac{x_{imax}-x_{imin}}{C_i}" title="S_i=\frac{x_{imax}-x_{imin}}{C_i}" /></a></center>

- <a href="https://www.codecogs.com/eqnedit.php?latex=x_i^{(k&plus;1)}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?C_i" title="C_i" /></a> – константы в диапазоне (5...30)

### Установка и настройка проекта

1. Склонируйте репозиторий командой

`git clone https://github.com/maxshymchuk/RSOA.git`

2. В корневой директории проекта установите все зависимости `npm i` (возможно вам нужно будет установить NodeJS, перейдите на [сайт](https://nodejs.org/) для загрузки), установите `npm i npx -g` и выполните команду `npm run prepare`

3. После завершения сборки запустите приложение `npm run electron`