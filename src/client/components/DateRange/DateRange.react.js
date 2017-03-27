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
      from: undefined,
      to: undefined,
      isShowPicker: false,
      isSelectingLastDay: false
    };
  }

  showDatePicker() {
    this.setState({ isShowPicker: true });
  }

  hideDatePicker() {
    this.setState({ isShowPicker: false });
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
    this.setState({ from: date });
    this.props.onChange(date, this.state.to);
  }

  handleToInputChange(date) {
    this.setState({ to: date });
    this.props.onChange(this.state.from, date);
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

   handleDayClick(day) {
    const { from, isSelectingLastDay } = this.state;
    if (!isSelectingLastDay) {
      this.setState({
        isSelectingLastDay: true,
        from: day,
        to: undefined
      });
    }
    if (isSelectingLastDay && from && day < from) {
      this.setState({
        from: day,
        to: undefined
      });
    }
    if (isSelectingLastDay && DateUtils.isSameDay(day, from)) {
      this.reset();
    }
    if (isSelectingLastDay) {
      this.setState({ isSelectingLastDay: false });
    }
  }

  handleDayMouseEnter(day) {
    const { isSelectingLastDay, from } = this.state;
    if (!isSelectingLastDay || (from && day < from) || DateUtils.isSameDay(day, from)) {
      return;
    }
    this.setState({ to: day });
  }

  reset() {
    this.setState({
      from: undefined,
      to: undefined,
      isSelectingLastDay: false
    });
  }

  render() {
    let { from, to, isShowPicker } = this.state;
    let {
      className,
      dateFormat,
      disabled,
      locale,
      positionRight,
      positionTop,
      ...restProps
    } = this.props;

    let datePicker = (
      <Motion
        defaultStyle={{ x: this.state.isShowPicker ? 1 : 0 }}
        style={{ x: this.state.isShowPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >{interpolatedStyle =>
        <div
          className={s.datePickerContainer}
          style={{
            maxHeight: `${interpolatedStyle.x * 640}px`,
            opacity: interpolatedStyle.x
          }}
        >
          <DayPicker
            numberOfMonths={ 2 }
            initialMonth={from ? from : (to ? to : new Date())}
            selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
            modifiers={{
              from: day => DateUtils.isSameDay(day, from),
              to: day => DateUtils.isSameDay(day, to)
            }}
            locale={locale}
            onDayClick={ this.handleDayClick.bind(this) }
            onDayMouseEnter={ this.handleDayMouseEnter.bind(this) }
          />
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
          date={from}
          dateFormat={dateFormat}
          onChange={this.handleFromInputChange.bind(this)}
          onLast={this.handleFromInputLast.bind(this)}
          onMount={this.handleFromInputMount.bind(this)}
          onUnmount={this.handleFromInputMount.bind(this)}
          onPressRight={this.handleFromInputPressRight.bind(this)}
          disabled={disabled}
        />
        <div
          className={`input-group-addon ${s.divider || ''}`}
        >
          <i className="fa fa-arrow-right" />
        </div>
        <DateInput
          date={to}
          dateFormat={dateFormat}
          onChange={this.handleToInputChange.bind(this)}
          onMount={this.handleToInputMount.bind(this)}
          onUnmount={this.handleToInputMount.bind(this)}
          onPressLeft={this.handleToInputPressLeft.bind(this)}
          disabled={disabled}
        />
        <button
          className={`btn btn-default input-group-addon ${s.divider || ''} ${s.dividerLast || ''}`}
          tabIndex="-1"
        >
          <i className="fa fa-times" />
        </button>
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
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
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
