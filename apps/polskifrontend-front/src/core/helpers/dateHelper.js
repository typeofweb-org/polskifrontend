const oneDay = 60 * 60 * 24 * 1000; // ms
const oneWeek = oneDay * 7;

export function isToday(date) {
  return (Date.now() - date) < oneDay;
}

export function isThisWeek(date) {
  return (Date.now() - date) < oneWeek;
}
