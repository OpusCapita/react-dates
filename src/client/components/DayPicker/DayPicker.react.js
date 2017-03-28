import React, { Component, PropTypes } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import MomentLocaleUtils from 'react-day-picker/moment';
import './DayPicker.less';

export default
class DayPicker extends Component {
  render() {
    let {
      className,
      ...restProps
    } = this.props;

    return (
      <ReactDayPicker
        className={`opuscapita_day-picker ${className}`}
        localeUtils={ MomentLocaleUtils }
        { ...restProps }
      />
    );
  }
}

DayPicker.propTypes = {
  className: PropTypes.string
};
DayPicker.defaultProps = {
  className: ''
};
