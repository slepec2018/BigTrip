import dayjs from "dayjs";

const sortPointsFurure = (data) => {
  const deepData = JSON.parse(JSON.stringify(data));

  const strucData = deepData.filter((element) => {
    return dayjs().isBefore(dayjs(element.eventStartTimeFull));
  });

  return strucData;
};
const sortPointsPast = (data) => {
  const deepData = JSON.parse(JSON.stringify(data));

  const strucData = deepData.filter((element) => {
    return dayjs().isAfter(dayjs(element.eventStartTimeFull));
  });

  return strucData;
};

export {sortPointsFurure, sortPointsPast};
