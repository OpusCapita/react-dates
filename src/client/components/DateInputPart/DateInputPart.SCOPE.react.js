import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';

export default
@showroomScopeDecorator
class DateInputPartScope extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'jan' };
  }

  handleChange(value) {
    console.log(value);
    this.setState({ value });
  }

  render() {
    console.log('hello');
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
