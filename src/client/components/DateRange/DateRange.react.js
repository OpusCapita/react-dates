import React, { Component, PropTypes } from 'react';
import s from './DateRange.module.less';
import DateInput from '../DateInput';
import DayPicker from 'react-day-picker/lib/src/DayPicker';
import DateUtils from 'react-day-picker/lib/src/DateUtils';
import spring from 'react-motion/lib/spring';
import Motion from 'react-motion/lib/Motion';
import presets from 'react-motion/lib/presets';
import 'react-day-picker/lib/style.css';

let springPreset = presets.gentle;

export default
class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(),
      toDate: new Date(),
      isShowDatePicker: false
    };
  }

  toggleShowDatePicker() {
    this.setState({ isShowDatePicker: !this.state.isShowDatePicker });
  }

  handleFromInputMount(element) {
    this.fromInput = element;
  }

  handleFromInputUnmount(element) {
    this.fromInput = undefined;
  }

  handleToInputMount(element) {
    this.toInput = element;
  }

  handleToInputUnmount(element) {
    this.toInput = undefined;
  }

  handleFromInputChange(date) {
    this.setState({ fromDate: date });
    this.props.onChange(date, this.state.toDate);
  }

  handleToInputChange(date) {
    this.setState({ toDate: date });
    this.props.onChange(this.state.fromDate, date);
  }

  handleFromInputLast() {
    this.toInput.focusFirstPart();
  }

  handleFromInputPressRight(partsCount, partIndex) {
    if(partsCount - 1 === partIndex) {
      this.toInput.focusFirstPart();
    }
  }

  handleToInputPressLeft(partsCount, partIndex) {
    if(partIndex === 0) {
      this.fromInput.focusLastPart();
    }
  }

  render() {
    let { fromDate, toDate, isShowDatePicker } = this.state;
    let {
      className,
      dateFormat,
      disabled,
      positionRight,
      positionTop,
      ...restProps
    } = this.props;

    let datePicker = (
      <Motion
        defaultStyle={{ x: this.state.showSidebar ? 1 : 0 }}
        style={{ x: this.state.isShowDatePicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >{interpolatedStyle =>
          <div
              className={s.datePickerContainer}
              style={{
                maxHeight: `${interpolatedStyle.x * 640}px`,
                opacity: interpolatedStyle.x
              }}
          >
            <DayPicker numberOfMonths={ 2 } locale='de-DE' />
          </div>
        }
      </Motion>
    );

    return (
      <div
        className={`form-control ${s.dateRange} ${className}`}
        disabled={disabled}
        style={{ padding: 0, display: 'inline-flex', width: 'auto' }}
        { ...restProps }
      >
        <DateInput
          date={fromDate}
          dateFormat={dateFormat}
          onChange={this.handleFromInputChange.bind(this)}
          onLast={this.handleFromInputLast.bind(this)}
          onMount={this.handleFromInputMount.bind(this)}
          onUnmount={this.handleFromInputMount.bind(this)}
          onPressRight={this.handleFromInputPressRight.bind(this)}
          disabled={disabled}
        />
        <button
          type="button"
          tabIndex="-1"
          className={`btn btn-default ${s.calendarButton || ''}`}
          disabled={disabled}
          onClick={this.toggleShowDatePicker.bind(this)}
          title="Show calendar"
        >
          <i className="fa fa-calendar" />
        </button>
        <DateInput
          date={toDate}
          dateFormat={dateFormat}
          onChange={this.handleToInputChange.bind(this)}
          onMount={this.handleToInputMount.bind(this)}
          onUnmount={this.handleToInputMount.bind(this)}
          onPressLeft={this.handleToInputPressLeft.bind(this)}
          disabled={disabled}
        />
        {datePicker}
      </div>
    );
  }
}

DateRange.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  positionRight: PropTypes.bool,
  positionTop: PropTypes.bool
};
DateRange.defaultProps = {
  className: '',
  dateFormat: 'dd.MM.yyyy',
  disabled: false,
  locale: 'en-GB',
  onChange: () => {},
  positionRight: false,
  positionTop: false
};
