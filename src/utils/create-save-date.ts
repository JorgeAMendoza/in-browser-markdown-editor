const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const createSaveDate = (date: Date) => {
  const day =
    date.getDate().toString().length === 0
      ? `0${date.getDate()}`
      : date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default createSaveDate;
