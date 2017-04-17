/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class DateInputFieldScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  handleChange(date) {
    console.log('SCOPE handleChange:', date);
    this.setState({ date });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
