// https://github.com/moment/moment/blob/develop/locale/nb.js
export default {
  name: 'no',
  weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
  months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
  ordinal: n => `${n}.`,
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  },
  weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_')
}
