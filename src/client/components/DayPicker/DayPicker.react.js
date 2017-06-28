import React, { Component, PropTypes } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from '../utils/MomentLocaleUtils';
import getMessage from '../translations';
import assign from 'lodash/assign';
import './DayPicker.less';

function splitProps(props, specificPropNames = []) {
  return Object.keys(props).reduce((result, propName) => {
    let isPropSpecific = specificPropNames.indexOf(propName) >= 0;
    if (isPropSpecific) {
      let commonProps = assign({}, result[0]);
      let specificProps = assign({}, result[1], { [propName]: props[propName] });
      return [commonProps, specificProps];
    }

    let commonProps = assign({}, result[0], { [propName]: props[propName] });
    let specificProps = assign({}, result[1]);
    return [commonProps, specificProps];
  }, [{}, {}]);
}

function Caption(props) {
  let {
    date,  // eslint-disable-line react/prop-types
    locale,  // eslint-disable-line react/prop-types
    localeUtils, // eslint-disable-line react/prop-types
    isRange, // eslint-disable-line react/prop-types
    onChange, // eslint-disable-line react/prop-types
    currentMonth // eslint-disable-line react/prop-types
  } = props;

  let months = localeUtils.getMonths(locale);
  let dateNow = new Date();
  let years = [];
  for (let i = dateNow.getFullYear() - 100; i <= dateNow.getFullYear() + 100; i += 1) {
    years.push(i);
  }

  let handleChange = (year, month) => {
    let newDate = new Date(year, month);
    if (isRange) {
      let isCaptionFrom = date.getMonth() === currentMonth.getMonth();
      let captionIndex = isCaptionFrom ? 0 : 1;
      onChange(newDate, captionIndex);
    } else {
      onChange(newDate);
    }
  };

  let handleYearChange = (event) => {
    handleChange(event.target.value, date.getMonth());
  };

  let handleMonthChange = (event) => {
    handleChange(date.getFullYear(), event.target.value);
  };

  return (
    <div className="DayPicker-Caption">
      <div className={`form-group opuscapita_day-picker__caption`}>
        <select
          className="opuscapita_day-picker__caption-select"
          onChange={handleMonthChange}
          name="month"
          value={date.getMonth()}
          tabIndex={-1}
        >
          {months.map((month, index) =>
            <option key={index} value={index}>{month}</option>)
          }
        </select>
        <select
          className="opuscapita_day-picker__caption-select"
          onChange={handleYearChange}
          name="year"
          value={date.getFullYear()}
          tabIndex={-1}
        >
          {years.map((year, index) =>
            <option key={index} value={year}>
              {year}
            </option>)
          }
        </select>
      </div>
    </div>
  );
}

let propTypes = {
  ...ReactDayPicker.propTypes,
  className: PropTypes.string,
  dayPickerRef: PropTypes.func,
  hideTodayButton: PropTypes.bool,
  getTodayButtonLabel: PropTypes.func,
  isRange: PropTypes.bool,
  onChange: PropTypes.func,
  pickerClassName: PropTypes.string
};

let defaultProps = {
  className: '',
  dayPickerRef: () => {},
  hideTodayButton: false,
  isRange: false,
  labels: ReactDayPicker.defaultProps.labels,
  getTodayButtonLabel: (locale) => getMessage(locale, 'today'),
  onChange: () => {},
  pickerClassName: ''
};

export default
class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      currentMonth: null
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleTodayClick = this.handleTodayClick.bind(this);
  }

  handleDateChange(date, captionIndex) {
    if (this.props.isRange) {
      let range = this.props.selectedDays[1];
      let fromChanged = captionIndex === 0;
      let toChanged = captionIndex === 1;
      if (fromChanged) {
        this.props.onChange([date, range.to]);
      }
      if (toChanged) {
        this.props.onChange([range.from, date]);
      }
    } else {
      this.props.onChange(date);
    }
  }

  handleMonthChange(month) {
    this.setState({ currentMonth: month });
  }

  handleTodayClick() {
    this.props.onChange(new Date());
  }

  render() {
    let {
      className,
      dayPickerRef,
      isRange,
      hideTodayButton,
      onChange, // eslint-disable-line no-unused-vars
      getTodayButtonLabel,
      locale,
      pickerClassName,
      ...restProps
    } = this.props;

    let { currentMonth } = this.state;

    let splittedProps = splitProps(restProps, Object.keys(ReactDayPicker.propTypes));
    let commonProps = splittedProps[0];
    let pickerSpecificProps = splittedProps[1];

    let todayButton = hideTodayButton ? null : (
      <button
        type="button"
        className={`btn btn-sm btn-default opuscapita_day-picker__today-button`}
        onClick={this.handleTodayClick}
        tabIndex={-1}
      >
        {getTodayButtonLabel(locale)}
      </button>
    );

    let caption = (
      <Caption
        locale={locale}
        onChange={this.handleDateChange}
        isRange={isRange}
        currentMonth={currentMonth}
      />
    );

    return (
      <div className={`opuscapita_day-picker ${className}`} { ...commonProps }>
        <div className={`opuscapita_day-picker__header`}></div>
        <div className={`opuscapita_day-picker__picker`}>
          <ReactDayPicker
            ref={el => dayPickerRef(el)}
            className={pickerClassName}
            localeUtils={MomentLocaleUtils}
            locale={locale}
            onDayClick={this.handleDateChange}
            onDayKeyDown={this.handleDateChange}
            onDayTouchEnd={this.handleDateChange}
            onMonthChange={this.handleMonthChange}
            captionElement={caption}
            tabIndex={-1}
            { ...pickerSpecificProps }
          />
        </div>
        <div className={`opuscapita_day-picker__footer`}>
          {todayButton}
        </div>
      </div>
    );
  }
}

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;
