import React, { Component, PropTypes } from 'react';
import './DateRange.less';
import DateInput from '../DateInput';

export default
class DateRange extends Component {
  handleFromInputChange(date) {
    console.log('handleFromInputChange:', date);
    let dateRange = [date, this.props.dateRange[1]];
    this.props.onChange(dateRange);
  }

  handleToInputChange(date) {
    console.log('handleToInputChange:', date);
    let dateRange = [this.props.dateRange[0], date];
    this.props.onChange(dateRange);
  }

  reset() {
    let dateRange = [null, null];
    this.props.onChange(dateRange);
  }

  render() {
    let {
      className,
      dateFormat,
      dateRange,
      disabled,
      locale,
      positionRight,
      positionTop,
      ...restProps
    } = this.props;

    let fromDate = dateRange[0];
    let toDate = dateRange[1];
    console.log('fromDate: ', fromDate);
    console.log('toDate: ', toDate);

    return (
      <div
        className={`opuscapita_date-range ${className}`}
        disabled={disabled}
        { ...restProps }
      >
        <DateInput
          date={fromDate}
          dateFormat={dateFormat}
          onChange={(date) => console.log('f', date) || this.handleFromInputChange.call(this, date)}
          disabled={disabled}
        />
        <div
          className={`input-group-addon opuscapita_date-range__divider`}
        >
          <i className="fa fa-arrow-right" />
        </div>
        <DateInput
          date={toDate}
          dateFormat={dateFormat}
          onChange={(date) => console.log('t', date) || this.handleToInputChange.call(this, date)}
          disabled={disabled}
        />
        <button
          className={`
            btn btn-default input-group-addon opuscapita_date-range__divider opuscapita_date-range__divider--last
          `}
          tabIndex="-1"
          onClick={this.reset.bind(this)}
        >
          <i className="fa fa-times" />
        </button>
      </div>
    );
  }
}

DateRange.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  dateRange: PropTypes.array,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  positionRight: PropTypes.bool,
  positionTop: PropTypes.bool
};
DateRange.defaultProps = {
  className: '',
  dateFormat: 'dd.MM.yyyy',
  dateRange: [null, null],
  disabled: false,
  locale: 'en-GB',
  onChange: () => {},
  positionRight: false,
  positionTop: false
};
