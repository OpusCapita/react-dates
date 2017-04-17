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
      dateRange1: [null, null],
      dateRange2: [new Date(), new Date()],
      dateRange3: [null, null],
      dateRange4: [null, null]
    };
  }

  handleChange1(dateRange) {
    this.setState({ dateRange1: dateRange });
  }

  handleChange2(dateRange) {
    this.setState({ dateRange2: dateRange });
  }

  handleChange3(dateRange) {
    this.setState({ dateRange3: dateRange });
  }

  handleChange4(dateRange) {
    this.setState({ dateRange4: dateRange });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
