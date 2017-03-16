const YEAR_MIN = 1920;
const YEAR_MAX = 2120;
export const SEPARATOR = 'separator';

export
const resolverDefinitions = {
  'yyyy': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { year: 'numeric' }),
    getKeys: (min = YEAR_MIN, max = YEAR_MAX) => getYearsKeys(min, max)
  },
  'yy': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { year: '2-digit' }),
    getKeys: (min = YEAR_MIN, max = YEAR_MAX) => getYearsKeys(min, max)
  },
  'M': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { month: '2-digit' }),
    getKeys: () => getMonthsKeys()
  },
  'MM': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { month: '2-digit' }),
    getKeys: (date, locale) => getMonthsKeys()
  },
  'MMM': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { month: 'short' }),
    getKeys: (date, locale) => getMonthsKeys()
  },
  'MMMM': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { month: 'long' }),
    getKeys: (date, locale) => getMonthsKeys()
  },
  'd': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { day: '2-digit' }),
    getKeys: (date, locale) => getDatesKeys(date)
  },
  'dd': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { day: '2-digit' }),
    getKeys: (date, locale) => getDatesKeys(date)
  },
  'E': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { weekday: 'narrow' }),
    getKeys: (date, locale) => getDaysKeys()
  },
  'EE': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { weekday: 'short' }),
    getKeys: (date, locale) => getDaysKeys()
  },
  'EEE': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { weekday: 'long' }),
    getKeys: (date, locale) => getDaysKeys()
  },
  'H': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { hour: '2-digit' }),
    getKeys: (date, locale) => getHoursKeys()
  },
  'HH': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { hour: '2-digit' }),
    getKeys: (date, locale) => getHoursKeys()
  },
  'm': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { minute: '2-digit' }),
    getKeys: (date, locale) => getMinutes('en-US', '2-digit')
  },
  'mm': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { minute: '2-digit' }),
    getKeys: (date, locale) => getMinutes('en-US', '2-digit')
  },
  's': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { second: '2-digit' }),
    getKeys: (date, locale) => getSeconds('en-US', '2-digit')
  },
  'ss': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { second: '2-digit' }),
    getKeys: (date, locale) => getSeconds('en-US', '2-digit')
  },
  'S': {
    resolve: (date, locale) => date.getMilliseconds(),
    getKeys: (date, locale) => getMilliseconds()
  },
  'SS': {
    resolve: (date, locale) => date.getMilliseconds(),
    getKeys: (date, locale) => getMilliseconds()
  }
};

let getSeparatorResolver = (separator) => ({
  resolve: () => separator
});

export
function getFormatResolvers(format = 'dd.MM.yyyy', resolverDefinitions) {
  let formatParts = format.split(/\b/);
  let supportedFormats = Object.keys(resolverDefinitions);

  console.log('fp:', formatParts);
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
