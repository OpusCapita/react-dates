import React, { Component, PropTypes } from 'react';
import translations from './i18n';

export default
class I18nLinker extends Component {
  componentWillMount() {
    this.context.i18n.register('Dates', translations);
  }

  render() {
    let i18n = this.context.i18n;
    let locale = i18n.locale || 'en-GB';
    let dateFormat = i18n._formatInfo.datePattern || 'dd/MM/yyyy';
    let child = React.Children.only(this.props.children);
    let props = {
      locale,
      dateFormat,
      todayButtonLabel: i18n.getMessage('Dates.today')
    };

    if (child.type.name === 'DateRangeInput') {
      props = Object.assign({}, { placeholder: i18n.getMessage('Dates.selectDateRange') });
    }

    if (child.type.name === 'DatePicker') {
      props = delete props.dateFormat;
    }

    return React.cloneElement(child, props);
  }
}

I18nLinker.contextTypes = {
  i18n: PropTypes.object.isRequired
};
