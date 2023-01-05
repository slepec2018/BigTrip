// Функция рандомного числа из заданного диапазона включая границы
const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    return NaN;
  }

  const finMin = Math.ceil(Math.min(min, max));
  const finMax = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (finMax - finMin + 1)) + finMin;
};

// Функция рандомного елемента из заданного массива
const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция превращения первой буквы строки в заглавную
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Функция рандомного добавления одного или двух елементов массива
const getRandomItemsArray = (arr, count) => {
  const allElements = [];

  for (let i = 0; i < count; i++) {
    const element = arr[getRandomNumber(0, arr.length - 1)];
    allElements.push(element);
  }

  return allElements.join(` `);
};

// Функция форматиорования единичных цифр с добавкой 0 в начале
const getNumberWithLeadZero = (number) => number < 10 ? `0${number}` : number;

// Функция генерирования массива с заданной длинной, исключающая повторов
const getRandomTags = (arr, length) => {
  let set = new Set();

  const cycle = getRandomNumber(1, length);

  while (set.size !== cycle) {
    set.add(arr[getRandomNumber(0, arr.length - 1)]);
  }

  return Array.from(set);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Функция добавления кода html в исходный код
const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};

export {
  getRandomNumber,
  getRandomItemArr,
  capitalize,
  getRandomItemsArray,
  getNumberWithLeadZero,
  getRandomTags,
  createElement,
  render,
  RenderPosition,
  renderTemp
};
