import dayjs from 'dayjs';
import en from './locales/en';
import de from './locales/de';
import fi from './locales/fi';
import no from './locales/no';
import ru from './locales/ru';
import sv from './locales/sv';

const locales = {
  en,
  de,
  fi,
  no,
  ru,
  sv
};

Object.keys(locales).forEach(name => dayjs.locale(locales[name], null, true));

export { locales }

export default dayjs;
