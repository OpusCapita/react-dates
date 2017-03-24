import React, { Component } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';

export default
@showroomScopeDecorator
class DateInputScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined
    };
  }

  handleChange(date) {
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
