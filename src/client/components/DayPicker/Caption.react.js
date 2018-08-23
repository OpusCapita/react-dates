import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dayjs from 'dayjs';

export default
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

  let isCaptionFrom = (date && date.getMonth()) === (monthToDisplay && monthToDisplay.getMonth());
  let captionIndex = isCaptionFrom ? 0 : 1;

  let handleChange = (year, month) => {
    if (isRange) {
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
          value={
            isCaptionFrom ?
            monthToDisplay.getMonth() :
            dayjs(monthToDisplay).add(1, 'month').toDate().getMonth()
          }
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
          value={
            isCaptionFrom ?
            monthToDisplay.getFullYear() :
            dayjs(monthToDisplay).add(1, 'month').toDate().getFullYear()
          }
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
