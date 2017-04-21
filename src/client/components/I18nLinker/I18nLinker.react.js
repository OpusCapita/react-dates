import React, { Component, PropTypes } from 'react';

export default
class I18nLinker extends Component {
  render() {
    let locale = this.context.i18n.locale || 'en-GB';
    let dateFormat = this.context.i18n._formatInfo.datePattern || 'dd/MM/yyyy';
    let child = React.Children.only(this.props.children);
    return React.cloneElement(child, { locale, dateFormat });
  }
}

I18nLinker.contextTypes = {
  i18n: PropTypes.object
};
