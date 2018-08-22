import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import "react-day-picker/lib/style.css";
import localeUtils from '../../dayjs/reactDayPickerUtils';
import getMessage from '../translations';
import { splitProps, zeroTime } from '../utils';
import './DayPicker.less';

function Caption(props) {
  let {
    date, // eslint-disable-line react/prop-types
    locale, // eslint-disable-line react/prop-types
    localeUtils, // eslint-disable-line react/prop-types
    isRange, // eslint-disable-line react/prop-types
    onChange, // eslint-disable-line react/prop-types
    monthToDisplay // eslint-disable-line react/prop-types
  } = props;

  let months = localeUtils.getMonths(locale);

  // Fill years selectbox
  let dateNow = new Date();
  let years = [];
  for (let i = dateNow.getFullYear() - 100; i <= dateNow.getFullYear() + 100; i += 1) {
    years.push(i);
  }

  let handleChange = (year, month) => {
    if (isRange) {
      let isCaptionFrom = date.getMonth() === monthToDisplay.getMonth();
      let captionIndex = isCaptionFrom ? 0 : 1;
      onChange({ month, year, captionIndex });
    } else {
      onChange({ month, year, captionIndex: 0 });
    }
  };

  let handleYearChange = (event) => {
    handleChange(event.target.value, date.getMonth());
  };

  let handleMonthChange = (event) => {
    handleChange(date.getFullYear(), event.target.value);
  };

  if (!monthToDisplay) {
    return null;
  }

  return (
    <div className="DayPicker-Caption">
      <div className={`form-group opuscapita_day-picker__caption`}>
        <select
          className="opuscapita_day-picker__caption-select"
          onChange={handleMonthChange}
          name="month"
          value={monthToDisplay.getMonth()}
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
          value={monthToDisplay.getFullYear()}
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
      monthToDisplay: props.date
    };
  }

  handleCaptionChange = ({ month, year }) => {
    let monthToDisplay = new Date(year, month);
    this.setState({ monthToDisplay });
  }

  handleMonthChange = date => {
    this.setState({ monthToDisplay: date });
  };

  handleTodayClick = () => {
    this.props.onChange(zeroTime(new Date()));
  };

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

    let { monthToDisplay } = this.state;

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
        onChange={(date, captionIndex) => this.handleCaptionChange(date, captionIndex)}
        isRange={isRange}
        monthToDisplay={monthToDisplay}
      />
    );

    return (
      <div className={`opuscapita_day-picker ${className}`} { ...commonProps }>
        <div className={`opuscapita_day-picker__header`}></div>
        <div className={`opuscapita_day-picker__picker`}>
          <ReactDayPicker
            ref={el => dayPickerRef(el)}
            className={pickerClassName}
            localeUtils={localeUtils}
            locale={locale}
            firstDayOfWeek={locale === 'en' ? 0 : 1}
            onMonthChange={this.handleMonthChange}
            onWeekClick={() => {}}
            captionElement={caption}
            tabIndex={-1}
            showWeekNumbers={true}
            { ...pickerSpecificProps }
            month={monthToDisplay}
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
