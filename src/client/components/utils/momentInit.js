import moment from 'moment';

// define 'nb' locale as fallback for 'no' locale
moment.localeData('nb');
moment.defineLocale('no', { parentLocale: 'nb' });

export default moment;
