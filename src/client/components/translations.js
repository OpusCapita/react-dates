const translations = {
  en: {
    selectDateRange: 'Select date range',
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    previousWeek: 'Previous week',
    nextWeek: 'Next week',
    thisWeek: 'This week',
    previousMonth: 'Previous month',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    nextMonth: 'Next month'
  },
  de: {
    selectDateRange: 'Datumsbereich auswählen',
    today: 'Heute',
    yesterday: 'Gestern',
    tomorrow: 'Morgen',
    previousWeek: 'Vorherige Woche',
    nextWeek: 'Nächste Woche',
    thisWeek: 'Diese Woche',
    previousMonth: 'Vorheriger Monat',
    last30Days: 'Letzte 30 Tagen',
    thisMonth: 'Dieser Monat',
    nextMonth: 'Nächster Monat'
  },
  ru: {
    selectDateRange: 'Выберите диапазон дат',
    today: 'Сегодня',
    yesterday: 'Вчера',
    tomorrow: 'Завтра',
    previousWeek: 'Предыдущая неделя',
    nextWeek: 'Следующая неделя',
    thisWeek: 'Эта неделя',
    previousMonth: 'Предыдущий месяц',
    last30Days: 'Последние 30 дней',
    thisMonth: 'Этот месяц',
    nextMonth: 'Следующий месяц'
  },
  fi: {
    selectDateRange: 'Valitse päivämääräväli',
    today: 'Tänään',
    yesterday: 'Eilen',
    tomorrow: 'Huomenna',
    previousWeek: 'Edellinen viikko',
    nextWeek: 'Seuraava viikko',
    thisWeek: 'Tämä viikko',
    previousMonth: 'Edellinen kuukausi',
    last30Days: 'Edelliset 30 päivää',
    thisMonth: 'Tämä kuukausi',
    nextMonth: 'Seuraava kuukausi'
  },
  no: {
    selectDateRange: 'Velg datoområde',
    today: 'I dag',
    yesterday: 'I går',
    tomorrow: 'I morgen',
    previousWeek: 'Forrige uke',
    nextWeek: 'Neste uke',
    thisWeek: 'Denne uken',
    previousMonth: 'Foregående måned',
    last30Days: 'Siste 30 dager',
    thisMonth: 'Denne måneden',
    nextMonth: 'Neste måned'
  },
   sv: {
    selectDateRange: 'Välj datumintervall',
    today: 'Idag',
    yesterday: 'Igår',
    tomorrow: 'Imorgon',
    previousWeek: 'Föregående vecka',
    nextWeek: 'Nästa vecka',
    thisWeek: 'Denna vecka',
    previousMonth: 'Föregående månad',
    last30Days: 'SSenaste 30 dagarna',
    thisMonth: 'Denna månad',
    nextMonth: 'Nästa månad'
  }
};

export default function getMessage(locale, key) {
  let translationExists = (translations[locale] && translations[locale][key]);

  if (!translationExists) {
    return translations['en'][key];
  }

  return translations[locale][key];
}
