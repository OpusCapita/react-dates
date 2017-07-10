// returns moment that supports 'no' locale
import moment from 'moment';

// localeData call is required becuase og the following bug:
// https://github.com/moment/moment/issues/3883
moment.localeData('nb');
// define 'nb' locale as fallback/parent for 'no' locale
moment.defineLocale('no', { parentLocale: 'nb' });

export default moment;
