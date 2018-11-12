/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { Modal } from 'react-bootstrap';

window.Modal = Modal;


@showroomScopeDecorator
export default
class DatePickerScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      openModal: false
    };
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
  }

  handleHideModal = () => {
    this.setState({ openModal: false });
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
