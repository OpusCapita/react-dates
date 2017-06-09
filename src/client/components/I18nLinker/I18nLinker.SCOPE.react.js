/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nContext } from '@opuscapita/react-i18n';
import DateInput from '../DateInput';
import DateRangeInput from '../DateRangeInput';
import DatePicker from '../DatePicker';

window.I18nContext = I18nContext;
window.DateInput = DateInput;
window.DateRangeInput = DateRangeInput;
window.DatePicker = DatePicker;

@showroomScopeDecorator
export default
class I18nLinker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      range: [null, null]
    };
  }

  handleChange(date) {
    this.setState({ date });
  }

  handleRangeChange(range) {
    this.setState({ range });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

I18nLinker.contextTypes = {
  i18n: PropTypes.object
};
I18nLinker.childContextTypes = {
  i18n: PropTypes.object
};
