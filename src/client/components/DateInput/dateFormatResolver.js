const MIN_YEAR = 1920;
const MAX_YEAR = 2120;
const FIXED_LOCALE = 'en-GB';
export const SEPARATOR = 'separator';
import padStart from 'lodash/padStart';

export
const resolverDefinitions = {
  'yyyy': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { year: 'numeric' }),
    getKeys: (date, options = { minYear: MIN_YEAR, maxYear: MAX_YEAR }) => getYearsKeys(options.minYear, options.maxYear),
    setKey: (date, key) => date.setFullYear(key),
    setValue: (date, value) => date.setFullYear(padStart(value, 4, 0)),
    getKey: (date) => date.getFullYear(),
    getInputSize: () => 4
  },
  'yy': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { year: '2-digit' }),
    getKeys: (date, options = { minYear: MIN_YEAR, maxYear: MAX_YEAR }) => getYearsKeys(options.minYear, options.maxYear),
    setKey: (date, key) => date.setFullYear(key),
    setValue: (date, value) => date.setFullYear(value),
    getKey: (date) => date.getFullYear(),
    getInputSize: () => 2
  },
  'M': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { month: 'numeric' }),
    getKeys: () => getMonthsKeys(),
    setKey: (date, key) => date.setMonth(key),
    setValue: (date, value) => date.setMonth(value + 1),
    getKey: (date) => date.getMonth(),
    getInputSize: () => 2
  },
  'MM': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { month: '2-digit' }),
    getKeys: (date) => getMonthsKeys(),
    setKey: (date, key) => date.setMonth(key),
    setValue: (date, value) => date.setMonth(value + 1),
    getKey: (date) => date.getMonth(),
    getInputSize: () => 2
  },
  'MMM': {
    resolve: (date, locale) => date.toLocaleString(locale, { month: 'short' }),
    getKeys: (date) => getMonthsKeys(),
    setKey: (date, key) => date.setMonth(key),
    setValue: (date, value) => date.setMonth(value + 1),
    getKey: (date) => date.getMonth(),
    getInputSize: () => 2
  },
  'MMMM': {
    resolve: (date, locale) => date.toLocaleString(locale, { month: 'long' }),
    getKeys: (date) => getMonthsKeys(),
    setKey: (date, key) => date.setMonth(key),
    setValue: (date, value) => date.setMonth(value + 1),
    getKey: (date) => date.getMonth(),
    getInputSize: () => 2
  },
  'd': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { day: 'numeric' }),
    getKeys: (date) => getDatesKeys(date),
    setKey: (date, key) => date.setDate(key),
    setValue: (date, value) => date.setDate(value),
    getKey: (date) => date.getDate(),
    getInputSize: () => 2
  },
  'dd': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { day: '2-digit' }),
    getKeys: (date) => getDatesKeys(date),
    setKey: (date, key) => date.setDate(key),
    setValue: (date, value) => date.setDate(value),
    getKey: (date) => date.getDate(),
    getInputSize: () => 2
  },
  'H': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { hour: 'numeric', hour12: false }),
    getKeys: (date) => getHoursKeys(),
    setKey: (date, key) => date.setHours(key),
    setValue: (date, value) => date.setHours(value),
    getKey: (date) => date.getHours(),
    getInputSize: () => 2
  },
  'HH': {
    resolve: (date, locale) => (date.getHours() < 10 ? '0' : '') + date.getHours(),
    getKeys: (date) => getHoursKeys(),
    setKey: (date, key) => date.setHours(key),
    setValue: (date, value) => date.setHours(value),
    getKey: (date) => date.getHours(),
    getInputSize: () => 2
  },
  'm': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { minute: 'numeric' }),
    getKeys: (date) => getMinutesKeys(),
    setKey: (date, key) => date.setMinutes(key),
    setValue: (date, value) => date.setMinutes(value),
    getKey: (date) => date.getMinutes(),
    getInputSize: () => 2
  },
  'mm': {
    resolve: (date, locale) => (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
    getKeys: (date) => getMinutesKeys(),
    setKey: (date, key) => date.setMinutes(key),
    setValue: (date, value) => date.setMinutes(value),
    getKey: (date) => date.getMinutes(),
    getInputSize: () => 2
  },
  's': {
    resolve: (date, locale) => date.toLocaleString(FIXED_LOCALE, { second: 'numeric' }),
    getKeys: (date) => getSecondsKeys(),
    setKey: (date, key) => date.setSeconds(key),
    setValue: (date, value) => date.setSeconds(value),
    getKey: (date) => date.getSeconds(),
    getInputSize: () => 2
  },
  'ss': {
    resolve: (date, locale) => (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(),
    getKeys: (date) => getSecondsKeys(),
    setKey: (date, key) => date.setSeconds(key),
    setValue: (date, value) => date.setSeconds(value),
    getKey: (date) => date.getSeconds(),
    getInputSize: () => 2
  },
  'S': {
    resolve: (date, locale) => date.getMilliseconds(),
    getKeys: (date) => getMillisecondsKeys(),
    setKey: (date, key) => date.setMilliseconds(key),
    setValue: (date, value) => date.setMilliseconds(value),
    getKey: (date) => date.getMilliseconds(),
    getInputSize: () => 3
  },
  'SS': {
    resolve: (date, locale) => date.getMilliseconds(),
    getKeys: (date) => getMillisecondsKeys(),
    setKey: (date, key) => date.setMilliseconds(key),
    setValue: (date, value) => date.setMilliseconds(value),
    getKey: (date) => date.getMilliseconds(),
    getInputSize: () => 3
  }
};

let getSeparatorResolver = (separator) => ({
  resolve: () => separator
});

export
function getFormatResolvers(format = 'dd.MM.yyyy', resolverDefinitions) {
  let formatParts = format.split(/\b/);
  let supportedFormats = Object.keys(resolverDefinitions);

  return formatParts.map(format => {
    let indexOfFormat = supportedFormats.indexOf(format);
    let isSeparator = indexOfFormat === -1;

    return isSeparator ?
      ({ ...getSeparatorResolver(format), type: SEPARATOR }) :
      ({ ...resolverDefinitions[format], type: format });
  });
}

export
function resolveFormat(resolver, date, locale, options) {
  return resolver.resolve(date, locale, options);
}

export
function isLeapYear (year) {
  return (( year % 4 === 0 ) && ( year % 100 !== 0 )) || ( year % 400 === 0 );
};

export
function getRange(min, max) {
  let list = [];
  for (var i = min; i <= max; i++) {
    list.push(i);
  }
  return list;
}

export
function getYearsKeys(min, max) {
  return getRange(min, max);
}

export
function getMonthsKeys() {
  return getRange(0, 11);
}

export
function getDatesKeys(date) {
  let month = date.getMonth();
  let febDaysCount = isLeapYear(date.getFullYear()) ? 29 : 28;
  let daysCount = [ 31, febDaysCount, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][ month ];
  return getRange(1, daysCount);
};

export
function getDaysKeys() {
  return getRange(0, 6);
}

export
function getHoursKeys() {
  return getRange(0, 59);
}

export
function getMinutesKeys() {
  return getRange(0, 59);
}

export
function getSecondsKeys() {
  return getRange(0, 59);
}

export
function getMillisecondsKeys() {
  return getRange(0, 999);
}

// BENCHMARK
// let before = Date.now();
// let result = null;
// let date = new Date();
// for(let i = 0; i < 1000; i++) {
//   result = getYearsKeys(1920, 2120);

// }
// console.log(result);

// let after = Date.now();
// let time = after - before;
// console.log(time);
