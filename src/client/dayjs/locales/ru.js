export default {
  name: 'ru',
  weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
  ordinal: n => n,
  // https://github.com/moment/moment/blob/develop/locale/ru.js
  weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
}
