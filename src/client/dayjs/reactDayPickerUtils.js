import dayjs, { locales } from './';

function safeName(locale) {
  // if locale is not defined - use 'en'
  return locales[locale] ? locale : 'en';
}

function formatDay(day, locale = 'en') {
  return dayjs(day).locale(safeName(locale)).format('ddd ll');
}

function formatMonthTitle(date, locale = 'en') {
  return dayjs(date).locale(safeName(locale)).format('MMMM YYYY');
}

function formatWeekdayShort(day, locale = 'en') {
  return locales[safeName(locale)].weekdaysMin[day];
}

function formatWeekdayLong(day, locale = 'en') {
  return locales[safeName(locale)].weekdays[day];
}

function getFirstDayOfWeek(locale = 'en') {
  return locales[safeName(locale)].week.dow;
}

function getMonths(locale = 'en') {
  return locales[safeName(locale)].months;
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
  getMonths
};
