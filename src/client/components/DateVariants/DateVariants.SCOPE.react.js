/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';


@showroomScopeDecorator
export default
class DateVariantsScope extends Component {
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

DateVariantsScope.contextTypes = {
  i18n: PropTypes.object
};
DateVariantsScope.childContextTypes = {
  i18n: PropTypes.object
};
