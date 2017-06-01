/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';


@showroomScopeDecorator
export default
class DateInputFieldScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date()
    };
  }

  handleChange(value) {
    console.log('SCOPE handleChange:', value);
    this.setState({ value });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
