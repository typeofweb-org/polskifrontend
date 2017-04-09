const oneDay = 60 * 60 * 24 * 1000; // ms

export function isToday(date) {
  return (Date.now() - date) < oneDay;
}
