import React, { PropTypes, Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

export default
class DatePicker extends Component {
  render() {
    return (
      <DayPicker { ...this.props } />
    );
  }
}
