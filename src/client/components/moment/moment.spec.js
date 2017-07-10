import moment from './moment';
import { expect } from 'chai';

describe('moment', () => {
  it('modified moment supports moment.locale("no") that is inherited from "nb" locale', () => {
    expect(moment.localeData('no')._parentLocale).to.equal('nb');
  });
});
