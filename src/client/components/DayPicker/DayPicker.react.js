import React, { Component, PropTypes } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from 'react-day-picker/moment';
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
    currentMonth, // eslint-disable-line react/prop-types
    onCaptionClick // eslint-disable-line react/prop-types
  } = props;

  let currentYear = date.getFullYear();
  let fromMonth = new Date(currentYear, 0, 1, 0, 0);
  let toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

  let months = localeUtils.getMonths(locale);
  let years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  let handleChange = (event) => {
    let { year, month } = event.target.form;
    let newDate = new Date(year.value, month.value);
    if (isRange) {
      let isCaptionFrom = date.getMonth() === currentMonth.getMonth();
      let captionIndex = isCaptionFrom ? 0 : 1;
      onChange(newDate, captionIndex);
    } else {
      onChange(newDate);
    }
  };

  let handleClick = () => {
    console.log('handleClick');
    onCaptionClick(date);
  };

  return (
    <form className="DayPicker-Caption" onClick={handleClick}>
      <div className={`form-group opuscapita_day-picker__caption`}>
        <select
          className="opuscapita_day-picker__caption-select"
          onChange={handleChange}
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
          onChange={handleChange}
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
    </form>
  );
}

let propTypes = {
  ...ReactDayPicker.propTypes,
  className: PropTypes.string,
  dayPickerRef: PropTypes.func,
  hideTodayButton: PropTypes.bool,
  isRange: PropTypes.bool,
  onChange: PropTypes.func,
  pickerClassName: PropTypes.string,
};

let defaultProps = {
  className: '',
  dayPickerRef: () => {},
  hideTodayButton: false,
  isRange: false,
  labels: ReactDayPicker.defaultProps.labels,
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
    this.handleCaptionClick = this.handleCaptionClick.bind(this);
  }

  handleCaptionClick(currentMonth) {
    console.log('currentMonth!!', currentMonth);
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
        Today
      </button>
    );

    let caption = (
      <Caption
        onChange={this.handleDateChange}
        isRange={isRange}
        currentMonth={currentMonth}
        onCaptionClick={this.handleCaptionClick}
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
