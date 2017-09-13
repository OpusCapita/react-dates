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
  }
};

export default function getMessage(locale, key) {
  let translationExists = (translations[locale] && translations[locale][key]);

  if (!translationExists) {
    return translations['en'][key];
  }

  return translations[locale][key];
}
