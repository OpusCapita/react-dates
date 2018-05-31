import dayjs, { locales } from './';

export function formatDay(day, locale = 'en') {
  return dayjs(day).locale(locale).format('ddd ll');
}

export function formatMonthTitle(date, locale = 'en') {
  return dayjs(date).locale(locale).format('MMMM YYYY');
}

export function formatWeekdayShort(day, locale = 'en') {
  // return dayjs().locale(locale)._locale.weekdaysMin()[day];
  return locales[locale].weekdaysMin[day];
}

export function formatWeekdayLong(day, locale = 'en') {
  // return dayjs().locale(locale)._locale.weekdays()[day];
  return locales[locale].weekdays[day];
}

export function getFirstDayOfWeek(locale = 'en') {
  return locales[locale].week.dow;
}

export function getMonths(locale = 'en') {
  return locales[locale].months;
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
  getMonths
};
