let formatResolverDefinitions = {
  'yyyy': (date, locale) => date.toLocaleDateString('en-US', { year: 'numeric' }),
  'yy': (date, locale) => date.toLocaleDateString('en-US', { year: '2-digit' }),
  'M': (date, locale) => date.toLocaleDateString('en-US', { month: 'numeric' }),
  'MM': (date, locale) => date.toLocaleDateString('en-US', { month: '2-digit' }),
  'MMM': (date, locale) => date.toLocaleDateString(locale, { month: 'short' }),
  'MMMM': (date, locale) => date.toLocaleDateString(locale, { month: 'long' }),
  'd': (date, locale) => date.toLocaleDateString('en-US', { day: 'numeric' }),
  'dd': (date, locale) => date.toLocaleDateString('en-US', { day: '2-digit' })
};

function makeExcludeRegExp(strings = []) {
  let start = `/^((?!(`;
  let end = `)).)*$/`;
  
  let middle = strings.reduce((result, string, index) => {
    let endIndex = strings.length - 1;
    let addition = index === endIndex ? string : string + '|';
    return result.concat(addition);
  }, '');
  
  return start + middle + end;
}

function findEntities(string, entities) {
  let excludeRegExp = makeExcludeRegExp(entities);
  console.log(excludeRegExp);
}

function resolveFormat(format, formatResolverDefinitions) {
  let entities = Object.keys(formatResolverDefinitions);
  let parsedDates = entities.reduce(
    (result, token) => result.concat(findEntities(format, entities)),
  []);
  
  return parsedDates;
}

// TODO remove comments =)
console.log(resolveFormat('yyyy-yy-M-MM-MMM', formatResolverDefinitions));
