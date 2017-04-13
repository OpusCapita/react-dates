import React, { Component, PropTypes } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from 'react-day-picker/moment';
import assign from 'lodash/assign';
import './DayPicker.less';

function splitProps(props, specificPropNames = []) {
  return Object.keys(props).reduce((result, propName) => {
    let isPropSpecific = specificPropNames.indexOf(propName) >= 0;
    if(isPropSpecific) {
      let commonProps = assign({}, result[0]);
      let specificProps = assign({}, result[1], { [propName]: props[propName] });
      return [commonProps, specificProps];
    }

    let commonProps = assign({}, result[0], { [propName]: props[propName] });
    let specificProps = assign({}, result[1]);
    return [commonProps, specificProps];
  }, [{}, {}]);
};

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

function Caption(props) {
  let { date, locale, localeUtils, onChange } = props;
  let months = localeUtils.getMonths(locale);
  let years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  let handleChange = (event) => {
    let { year, month } = event.target.form;
    let newDate = new Date(year.value, month.value);
    onChange(newDate);
  };

  return (
    <form className="DayPicker-Caption">
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

export default
class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.props.onChange(date);
  }

  handleTodayClick() {
    this.props.onChange(new Date());
  }

  render() {
    let {
      className,
      dayPickerRef,
      pickerClassName,
      hideTodayButton,
      ...restProps
    } = this.props;

    let splittedProps = splitProps(restProps, Object.keys(ReactDayPicker.propTypes));
    let commonProps = splittedProps[0];
    let pickerSpecificProps = splittedProps[1];

    let todayButton = hideTodayButton ? null : (
      <button
        type="button"
        className={`btn btn-sm btn-default opuscapita_day-picker__today-button`}
        onClick={this.handleTodayClick.bind(this)}
        tabIndex={-1}
      >
        Today
      </button>
    );

    return (
      <div className={`opuscapita_day-picker ${className}`} { ...commonProps }>
        <div className={`opuscapita_day-picker__header`}></div>
        <div className={`opuscapita_day-picker__picker`}>
          <ReactDayPicker
            ref={el => (dayPickerRef(el))}
            className={pickerClassName}
            localeUtils={MomentLocaleUtils}
            onDayClick={this.handleDateChange}
            onDayKeyDown={this.handleDateChange}
            onDayTouchEnd={this.handleDateChange}
            captionElement={<Caption onChange={this.handleDateChange} />}
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

DayPicker.propTypes = {
  ...ReactDayPicker.propTypes,
  className: PropTypes.string,
  pickerClassName: PropTypes.string,
  dayPickerRef: PropTypes.func,
  onChange: PropTypes.func,
  hideTodayButton: PropTypes.bool
};
DayPicker.defaultProps = {
  className: '',
  dayPickerRef: () => {},
  labels: ReactDayPicker.defaultProps.labels,
  pickerClassName: '',
  onChange: () => {},
  hideTodayButton: false
};
