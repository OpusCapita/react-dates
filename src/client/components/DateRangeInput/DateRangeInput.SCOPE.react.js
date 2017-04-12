/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class DateRangeInputScope extends Component {
    constructor(props) {
    super(props);
    this.state = {
      dateRange: [null, null]
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

DateRangeInputScope.contextTypes = {
  i18n: PropTypes.object
};
DateRangeInputScope.childContextTypes = {
  i18n: PropTypes.object
};
