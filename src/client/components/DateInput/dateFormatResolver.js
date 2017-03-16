export
const resolverDefinitions = {
  'yyyy': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { year: 'numeric' }),
    getKeys: (date, locale, minYear, maxYear) => getRange(minYear, maxYear)
  },
  'yy': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { year: '2-digit' }),
    getKeys: (date, locale, minYear, maxYear) => getRange(minYear, maxYear)
  },
  'M': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { month: '2-digit' }),
    getAll: (date, locale) => getRange(0, 11)
  },
  'MM': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { month: '2-digit' }),
    getAll: (date, locale) => getMonths(0, 11)
  },
  'MMM': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { month: 'short' }),
    getAll: (date, locale) => getMonths(locale, 'short')
  },
  'MMMM': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { month: 'long' }),
    getAll: (date, locale) => getMonths(locale, 'long')
  },
  'd': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { day: '2-digit' }),
    getAll: (date, locale) => getDaysInMonth(date)
  },
  'dd': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { day: '2-digit' }),
    getAll: (date, locale) => getDaysInMonth(date)
  },
  'E': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { weekday: 'narrow' }),
    getAll: (date, locale) => getWeekDays(locale, 'narrow')
  },
  'EE': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { weekday: 'short' }),
    getAll: (date, locale) => getWeekDays(locale, 'narrow')
  },
  'EEE': {
    resolve: (date, locale) => date.toLocaleDateString(locale, { weekday: 'long' }),
    getAll: (date, locale) => getWeekDays(locale, 'narrow')
  },
  'H': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { hour: '2-digit' }),
    getAll: (date, locale) => getRange(0, 23)
  },
  'HH': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { hour: '2-digit' }),
    getAll: (date, locale) => getHours(0, 23)
  },
  'm': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { minute: '2-digit' }),
    getAll: (date, locale) => getRange(0, 59)
  },
  'mm': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { minute: '2-digit' }),
    getAll: (date, locale) => getRange(0, 59)
  },
  's': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { second: '2-digit' }),
    getAll: (date, locale) => getRange(0, 59)
  },
  'ss': {
    resolve: (date, locale) => date.toLocaleDateString('en-US', { second: '2-digit' }),
    getAll: (date, locale) => getRange(0, 59)
  },
  'S': {
    resolve: (date, locale) => date.getMilliseconds(),
    getAll: (date, locale) => getRange(0, 999)
  },
  'SS': {
    resolve: (date, locale) => date.getMilliseconds(),
    getAll: (date, locale) => getRange(0, 999)
  }
};

export
function getDateFormatResolvers(dateFormat = 'dd.MM.yyyy', resolverDefinitions) {
  let dateFormatParts = dateFormat.split(/\b\s*/);
  let supportedFormats = Object.keys(resolverDefinitions);
  return dateFormatParts.map(format => {
    let indexOfFormat = supportedFormats.indexOf(format);
    if(indexOfFormat == -1) {
      return format;
    }
    return { exec: resolverDefinitions[format], type: format };
  });
}

export
function resolveDateFormat(resolver, date, locale) {
  if (typeof resolver === 'string') {
    return resolver;
  }
  return resolver.exec(date, locale);
}

// export
// function isLeapYear (year) {
//   return (( year % 4 === 0 ) && ( year % 100 !== 0 )) || ( year % 400 === 0 );
// };

// export
// function getDaysInMonth(date, formatter = (day) => day) {
//   let month = date.getMonth();
//   let febDaysCount = isLeapYear(date.getFullYear()) ? 29 : 28;
//   let daysCount = [ 31, febDaysCount, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][ month ];
//   let days = {};
//   for(let i = 1; i <= daysCount; i++) {
//     days[i] = formatter(i.toString());
//   }
//   return days;
// };

// export
// function getWeekdays(locale, representation) {
//   let weekdays = {};
//   for(let i = 0; i < 7; i++) {
//     let date = new Date(1970, i, 1);
//     let weekdayName = date.toLocaleString(locale, { weekday: representation });
//     weekdays[i] = weekdayName;
//   }
//   return weekdays;
// }

// export
// function getMonths() {
//   let months = [];
//   for(let i = 0; i < 12; i++) {
//     months[i] = monthName;
//   }
//   return months;
// }

export
function getRange(min, max) {
  let list = [];
  for (var i = min; i <= max; i++) {
    list.push(i);
  }
  return list;
}

console.log(getRange(0, 12));
