/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';
import I18nContext from 'opuscapita-react-i18n';

@showroomScopeDecorator
export default
class DateRangeScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: [new Date(), new Date()]
    };
  }

  handleChange(dateRange) {
    this.setState({ dateRange });
  }

  render() {
    let { dateRange } = this.state;
    let from = String(dateRange[0]);
    let to = String(dateRange[1]);
    return (
      <div>
        {this._renderChildren()}
        <div>
          <hr />
          <strong>From: </strong>
          <span>{from}</span>
          <br />
          <strong>To: </strong>
          <span>{to}</span>
        </div>
      </div>
    );
  }
}

DateRangeScope.contextTypes = {
  i18n: PropTypes.object
};
DateRangeScope.childContextTypes = {
  i18n: PropTypes.object
};
