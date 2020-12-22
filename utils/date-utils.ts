import ms from 'ms';

export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function isToday(date: Date) {
  return Date.now() - date.getTime() < ms('1 day');
}

export function isThisWeek(date: Date) {
  return Date.now() - date.getTime() < ms('1 week');
}

const isoDateRegExp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
export function isIsoDate(str: string) {
  return isoDateRegExp.test(str);
}
