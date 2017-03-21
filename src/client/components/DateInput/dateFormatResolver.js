const MIN_YEAR = 1920;
const MAX_YEAR = 2120;
const FIXED_LOCALE = 'en-GB';
export const SEPARATOR = 'separator';
import padStart from 'lodash/padStart';

let validate = (date, keys, key) => keys.indexOf(Number(key)) >= 0;
let getNewDate = (date, setterFn = (date) => date) => {
  let newDate = new Date(date.toISOString());
  setterFn(newDate);
  return newDate;
}

export
const resolverDefinitions = {
  'yyyy': {
    getAllowedKeys: (date, options) => getYearsKeys(options.minYear, options.maxYear),
    getKey: (date) => date.getFullYear(),
    getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { year: 'numeric' }),
    setKey: (date, key) => getNewDate(date, date => date.setFullYear(key)),
    setValue: (date, value, keys) => {
      let key = padStart(value, 4, 0);
      return getNewDate(date, date => date.setFullYear(key));
    },
    validate: (date, keys, value) => validate(date, keys, padStart(value, 4, 0)),
    size: 4
  },
  'yy': {
    getAllowedKeys: (date, options) => getYearsKeys(options.minYear, options.maxYear),
    getKey: (date) => date.getFullYear(),
    getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { year: '2-digit' }),
    setKey: (date, key) => getNewDate(date, date => date.setFullYear(key)),
    setValue: (date, value, keys) => {
      let key = '20' + padStart(value, 4, 0);
      return getNewDate(date, date => date.setFullYear(key));
    },
    validate: (date, keys, value) => validate(date, keys, padStart(value, 4, 0)),
    size: 2
  },
  'M': {
    getAllowedKeys: () => getMonthsKeys(),
    getKey: (date) => date.getMonth(),
    getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { month: 'numeric' }),
    setKey: (date, key) => getNewDate(date, date => date.setMonth(key)),
    setValue: (date, value, keys) => {
      let supposedKey = value[0] === '0' ? value[1] - 1 : value - 1;
      let testDate = new Date(date.getFullYear(), supposedKey);
      let allowedKeys = getDatesKeys(testDate);
      let key = allowedKeys.indexOf(supposedKey) >= 0 ? supposedKey : allowedKeys[allowedKeys.length - 1];
      return getNewDate(date, date => date.setMonth(key));
    },
    validate: (date, keys, value) => validate(date, keys, padStart(value - 1, 2, 0)),
    size: 2
  },
  'MM': {
    getAllowedKeys: (date) => getMonthsKeys(),
    getKey: (date) => date.getMonth(),
    getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { month: '2-digit' }),
    setKey: (date, key) => getNewDate(date, date => date.setMonth(key)),
    setValue: (date, value, keys) => {
      let supposedKey = value[0] === '0' ? value[1] - 1 : value - 1;
      let testDate = new Date(date.getFullYear(), supposedKey);
      let allowedKeys = getDatesKeys(testDate);
      let key = allowedKeys.indexOf(supposedKey) >= 0 ? supposedKey : allowedKeys[allowedKeys.length - 1];
      return getNewDate(date, date => date.setMonth(key));
    },
    validate: (date, keys, value) => validate(date, keys, padStart(value - 1, 2, 0)),
    size: 2
  },
  'd': {
    getAllowedKeys: (date) => getDatesKeys(date),
    getKey: (date) => date.getDate(),
    getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { day: 'numeric' }),
    setKey: (date, key) => getNewDate(date, date => date.setDate(key)),
    setValue: (date, value) => {
      let key = value[0] === '0' ? value[1] : value;
      return getNewDate(date, date => date.setDate(key));
    },
    validate: (date, keys, value) => validate(date, keys, padStart(value, 2, 0)),
    size: 2
  },
  'dd': {
    getAllowedKeys: (date) => getDatesKeys(date),
    getKey: (date) => date.getDate(),
    getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { day: '2-digit' }),
    setKey: (date, key) => getNewDate(date, date => date.setDate(key)),
    setValue: (date, value) => {
      let key = value[0] === '0' ? value[1] : value;
      return getNewDate(date, date => date.setDate(key));
    },
    validate: (date, keys, value) => validate(date, keys, padStart(value, 2, 0)),
    size: 2
  },
  // 'H': {
  //   getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { hour: 'numeric', hour12: false }),
  //   getAllowedKeys: (date) => getHoursKeys(),
  //   setKey: (date, key) => date.setHours(key),
  //   setValue: (date, value) => date.setHours(value),
  //   getKey: (date) => date.getHours(),
  //   getInputSize: () => 2
  // },
  // 'HH': {
  //   getValue: (date, locale) => (date.getHours() < 10 ? '0' : '') + date.getHours(),
  //   getAllowedKeys: (date) => getHoursKeys(),
  //   setKey: (date, key) => date.setHours(key),
  //   setValue: (date, value) => date.setHours(value),
  //   getKey: (date) => date.getHours(),
  //   getInputSize: () => 2
  // },
  // 'm': {
  //   getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { minute: 'numeric' }),
  //   getAllowedKeys: (date) => getMinutesKeys(),
  //   setKey: (date, key) => date.setMinutes(key),
  //   setValue: (date, value) => date.setMinutes(value),
  //   getKey: (date) => date.getMinutes(),
  //   getInputSize: () => 2
  // },
  // 'mm': {
  //   getValue: (date, locale) => (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
  //   getAllowedKeys: (date) => getMinutesKeys(),
  //   setKey: (date, key) => date.setMinutes(key),
  //   setValue: (date, value) => date.setMinutes(value),
  //   getKey: (date) => date.getMinutes(),
  //   getInputSize: () => 2
  // },
  // 's': {
  //   getValue: (date, locale) => date.toLocaleString(FIXED_LOCALE, { second: 'numeric' }),
  //   getAllowedKeys: (date) => getSecondsKeys(),
  //   setKey: (date, key) => date.setSeconds(key),
  //   setValue: (date, value) => date.setSeconds(value),
  //   getKey: (date) => date.getSeconds(),
  //   getInputSize: () => 2
  // },
  // 'ss': {
  //   getValue: (date, locale) => (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(),
  //   getAllowedKeys: (date) => getSecondsKeys(),
  //   setKey: (date, key) => date.setSeconds(key),
  //   setValue: (date, value) => date.setSeconds(value),
  //   getKey: (date) => date.getSeconds(),
  //   getInputSize: () => 2
  // },
  // 'S': {
  //   getValue: (date, locale) => date.getMilliseconds(),
  //   getAllowedKeys: (date) => getMillisecondsKeys(),
  //   setKey: (date, key) => date.setMilliseconds(key),
  //   setValue: (date, value) => date.setMilliseconds(value),
  //   getKey: (date) => date.getMilliseconds(),
  //   getInputSize: () => 3
  // },
  // 'SS': {
  //   getValue: (date, locale) => date.getMilliseconds(),
  //   getAllowedKeys: (date) => getMillisecondsKeys(),
  //   setKey: (date, key) => date.setMilliseconds(key),
  //   setValue: (date, value) => date.setMilliseconds(value),
  //   getKey: (date) => date.getMilliseconds(),
  //   getInputSize: () => 3
  // }
};

let getSeparatorResolver = (separator) => ({
  getValue: () => separator
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
console.log(new Date());
