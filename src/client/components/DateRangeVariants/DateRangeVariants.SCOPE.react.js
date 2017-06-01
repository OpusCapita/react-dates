/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';


@showroomScopeDecorator
export default
class DateRangeVariantsScope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

DateRangeVariantsScope.contextTypes = {
  i18n: PropTypes.object
};
DateRangeVariantsScope.childContextTypes = {
  i18n: PropTypes.object
};
