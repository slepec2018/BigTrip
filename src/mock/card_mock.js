import {
  getRandomNumber,
  getRandomItemArr,
  getRandomItemsArray,
  createArrPic
} from "../utils/common.js";
import dayjs from "dayjs";

// Основные данные для формирования мока точки
const cardPointTypes = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`
];
const cardCitys = [
  `Kiyv`,
  `Moscow`,
  `Lisabon`,
  `Porto`,
  `Sumy`,
  `Rome`,
  `Paris`,
  `Berlin`,
  `New-York`,
  `London`
];
const cardImagesUrl = `http://picsum.photos/300/150?r=${Math.random()}`;
const cardTextSentenses = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const offerTitles = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Order Uber`,
  `Rent a car`,
  `Add breakfast`,
  `Book tickets`,
  `Lunch in city`
];
const offerPrices = [
  2,
  9,
  10,
  20,
  30,
  40,
  50,
  80,
  100,
  150,
  200
];

const generateOffers = () => {
  const list = [];

  for (let i = 0; i < getRandomNumber(1, 2); i++) {
    const item = {
      type: getRandomItemArr(cardPointTypes),
      title: getRandomItemArr(offerTitles),
      price: getRandomItemArr(offerPrices),
      id: i,
      isOfferCheck: true
    };

    list.push(item);
  }

  return list;
};

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// Функция генерирования мока точки
const generateCardData = () => {
  const type = getRandomItemArr(cardPointTypes);
  const city = getRandomItemArr(cardCitys);
  const eventStartTime = dayjs().add(getRandomNumber(1, 4), `day`).add(getRandomNumber(1, 24), `hour`).add(getRandomNumber(1, 60), `minute`).toDate();
  const eventEndTime = dayjs(eventStartTime).add(getRandomNumber(1, 24), `hour`).add(getRandomNumber(1, 60), `minute`).toDate();

  return {
    id: generateId(),
    type,
    // type: `${capitalize(type)} to`,
    city,
    eventStartTime: dayjs(eventStartTime).format(`YYYY-MM-DDTHH:mm`),
    eventEndTime: dayjs(eventEndTime).format(`YYYY-MM-DDTHH:mm`),
    eventDuration: dayjs(eventEndTime).diff(dayjs(eventStartTime), `minute`),
    price: getRandomNumber(1, 50),
    addOffer: generateOffers(),
    eventStartTimeFull: eventStartTime,
    eventEndTimeFull: eventEndTime,
    description: getRandomItemsArray(cardTextSentenses, getRandomNumber(1, 3)),
    photos: createArrPic(cardImagesUrl, getRandomNumber(1, 10)),
    isFavorite: false
  };
};

export {generateCardData, cardCitys};
