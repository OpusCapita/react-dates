const translations = {
  en: {
    'common.DateInput.today': 'Today',
    'common.DateInput.yesterday': 'Yesterday',
    'common.DateInput.tomorrow': 'Tomorrow',
    'common.DateRangeInput.previousWeek': 'Previous week',
    'common.DateRangeInput.nextWeek': 'Next week',
    'common.DateRangeInput.thisWeek': 'This week',
    'common.DateRangeInput.previousMonth': 'Previous month',
    'common.DateRangeInput.last30Days': 'Last 30 days',
    'common.DateRangeInput.thisMonth': 'This month',
    'common.DateRangeInput.nextMonth': 'Next month',
    'common.DateInput.clearValue': 'Clear value'
  },
  de: {
    'common.DateInput.today': 'Heute',
    'common.DateInput.yesterday': 'Gestern',
    'common.DateInput.tomorrow': 'Morgen',
    'common.DateRangeInput.previousWeek': 'Vorherige Woche',
    'common.DateRangeInput.nextWeek': 'Nächste Woche',
    'common.DateRangeInput.thisWeek': 'Diese Woche',
    'common.DateRangeInput.previousMonth': 'Vorheriger Monat',
    'common.DateRangeInput.last30Days': 'Letzte 30 Tagen',
    'common.DateRangeInput.thisMonth': 'Dieser Monat',
    'common.DateRangeInput.nextMonth': 'Nächster Monat',
    'common.DateInput.clearValue': 'Inhalt löschen'
  },
  ru: {
    'common.DateInput.today': 'Сегодня',
    'common.DateInput.yesterday': 'Вчера',
    'common.DateInput.tomorrow': 'Завтра',
    'common.DateRangeInput.previousWeek': 'Предыдущая неделя',
    'common.DateRangeInput.nextWeek': 'Следующая неделя',
    'common.DateRangeInput.thisWeek': 'Эта неделя',
    'common.DateRangeInput.previousMonth': 'Предыдущий месяц',
    'common.DateRangeInput.last30Days': 'Последние 30 дней',
    'common.DateRangeInput.thisMonth': 'Этот месяц',
    'common.DateRangeInput.nextMonth': 'Следующий месяц',
    'common.DateInput.clearValue': ''
  },
  fi: {
    'common.DateInput.today': 'Tänään',
    'common.DateInput.yesterday': 'Eilen',
    'common.DateInput.tomorrow': 'Huomenna',
    'common.DateRangeInput.previousWeek': 'Edellinen viikko',
    'common.DateRangeInput.nextWeek': 'Seuraava viikko',
    'common.DateRangeInput.thisWeek': 'Tämä viikko',
    'common.DateRangeInput.previousMonth': 'Edellinen kuukausi',
    'common.DateRangeInput.last30Days': 'Edelliset 30 päivää',
    'common.DateRangeInput.thisMonth': 'Tämä kuukausi',
    'common.DateRangeInput.nextMonth': 'Seuraava kuukausi',
    'common.DateInput.clearValue': ''
  },
  no: {
    'common.DateInput.today': 'I dag',
    'common.DateInput.yesterday': 'I går',
    'common.DateInput.tomorrow': 'I morgen',
    'common.DateRangeInput.previousWeek': 'Forrige uke',
    'common.DateRangeInput.nextWeek': 'Neste uke',
    'common.DateRangeInput.thisWeek': 'Denne uken',
    'common.DateRangeInput.previousMonth': 'Foregående måned',
    'common.DateRangeInput.last30Days': 'Siste 30 dager',
    'common.DateRangeInput.thisMonth': 'Denne måneden',
    'common.DateRangeInput.nextMonth': 'Neste måned',
    'common.DateInput.clearValue': ''
  },
  sv: {
    'common.DateInput.today': 'Idag',
    'common.DateInput.yesterday': 'Igår',
    'common.DateInput.tomorrow': 'Imorgon',
    'common.DateRangeInput.previousWeek': 'Föregående vecka',
    'common.DateRangeInput.nextWeek': 'Nästa vecka',
    'common.DateRangeInput.thisWeek': 'Denna vecka',
    'common.DateRangeInput.previousMonth': 'Föregående månad',
    'common.DateRangeInput.last30Days': 'SSenaste 30 dagarna',
    'common.DateRangeInput.thisMonth': 'Denna månad',
    'common.DateRangeInput.nextMonth': 'Nästa månad',
    'common.DateInput.clearValue': ''
  }
};

export default function getMessage(locale, key) {
  let translationExists = (translations[locale] && translations[locale][key]);

  if (!translationExists) {
    return translations['en'][key];
  }

  return translations[locale][key];
}
