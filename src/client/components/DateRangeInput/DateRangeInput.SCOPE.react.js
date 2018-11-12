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
class DateRangeInputScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: [null, null],
      value2: [new Date(), new Date()],
      value3: [null, null],
      value4: [null, null],
      openModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
  }

  handleHideModal = () => {
    this.setState({ openModal: false });
  }

  handleChange1(value) {
    this.setState({ value1: value });
  }

  handleChange2(value) {
    this.setState({ value2: value });
  }

  handleChange3(value) {
    this.setState({ value3: value });
  }

  handleChange4(value) {
    this.setState({ value4: value });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ value1: [null, null] })}>Reset</button>
        {this._renderChildren()}
      </div>
    );
  }
}
