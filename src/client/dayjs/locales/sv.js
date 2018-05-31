// https://github.com/moment/moment/blob/develop/locale/sv.js
export default {
  name: 'sv',
  weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
  months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
  ordinal: (number) => {
    const b = number % 10,
      output = (~~(number % 100 / 10) === 1) ? 'e' :
        (b === 1) ? 'a' :
          (b === 2) ? 'a' :
            (b === 3) ? 'e' : 'e';
    return number + output;
  },
  weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
}
