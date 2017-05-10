/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class DateInputScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    let value = this.state.value ? this.state.value.toString() : 'not selected yet';

    return (
      <div>
        {this._renderChildren()}
        <div>
          <hr />
          <strong>Date: </strong>
          <span>{value}</span>
        </div>
      </div>
    );
  }
}
