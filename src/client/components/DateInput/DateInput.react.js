import React, { Component, PropTypes } from 'react';
import './DateInput.less';
import DateInputField from '../DateInputField';

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleChange() {

  }

  render() {
    return (
      <div className="opuscapita-date-input">
      </div>
    );
  }
}

DateInput.propTypes = {
};
DateInput.defaultProps = {
};
