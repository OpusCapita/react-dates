export default {
  name: 'de',
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
  months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  ordinal: n => `${n}.`,
  // https://github.com/moment/moment/blob/develop/locale/de.js
  weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
}
