// Функция рандомного числа из заданного диапазона включая границы
const getRandomNumber = (min, max) => {

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
    const element = arr[getRandomNumber(1, arr.length - 1)];
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
    set.add(arr[getRandomNumber(1, arr.length - 1)]);
  }

  return Array.from(set);
};

const createArrPic = (link, len) => {
  let arr = [];

  for (let i = 0; i < len; i++) {
    arr.push(link);
  }

  return arr;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {
  getRandomNumber,
  getRandomItemArr,
  capitalize,
  getRandomItemsArray,
  getNumberWithLeadZero,
  createArrPic,
  updateItem,
  getRandomTags
};
