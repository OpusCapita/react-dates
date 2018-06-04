// https://github.com/moment/moment/blob/develop/locale/fi.js
export default {
  name: 'fi',
  weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
  // eslint-disable-next-line max-len
  months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
  ordinal: n => `${n}.`,
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  },
  weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_')
}
