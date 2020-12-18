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
