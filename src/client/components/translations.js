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
    today: 'Gestern',
    yesterday: 'Gisteren',
    tomorrow: 'Morgen',
    previousWeek: 'Vorige week',
    nextWeek: 'Volgende week',
    thisWeek: 'Deze week',
    previousMonth: 'Vorige maand',
    last30Days: 'Laatste 30 dagen',
    thisMonth: 'Deze maand',
    nextMonth: 'Volgende maand'
  }
};

export default function getMessage(locale, key) {
  let translationExists = (translations[locale] && translations[locale][key]);

  if (!translationExists) {
    return translations['en'][key];
  }

  return translations[locale][key];
}
