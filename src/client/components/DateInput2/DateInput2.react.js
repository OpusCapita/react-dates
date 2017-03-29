import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DateInputPart from '../DateInputPart';
import './DateInput2.less';

const FORMATS = {
  "M": {},
  "MM": {},
  "MMM": {},
  "MMMM": {},
  "d": {},
  "dd": {},
  "ddd": {},
  "yy": {},
  "yyyy": {}
};

function splitFormats(dateFormat = 'dd.MM.yyyy', supportedDateFormats) {
  let dateFormatParts = dateFormat.split(/\b/);

  return dateFormatParts.map(formatPart => {
    let isSeparator = supportedDateFormats.indexOf(formatPart) === -1;
    return isSeparator ? ({ view: formatPart, type: null }) : ({ view: formatPart, type: formatPart });
  });
}

export default
class DateInput2 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let {
      dateFormat,
      disabled,
      className,
      date,
      locale,
      onChange,
      onFocus,
      onPartFocus,
      onBlur,
      ...restProps
    } = this.props;

    let formats = splitFormats(dateFormat, Object.keys(FORMATS));
    let parts = formats.map((format, index) => {
      if (!format.type) {
        return (
          <span key={index}>
            {format.view}
          </span>
          );
        }
      return (
        <DateInputPart
          key={index}
          onMount={() => {}}
          onUnmount={() => {}}
          onChange={() => {}}
          onFocus={() => {}}
          onPressRight={() => {}}
          onPressLeft={() => {}}
          date={date}
        />
      );
    });

    return (
      <div
        className={`date-input ${className}`}
        { ...restProps }
      >
        {parts}
      </div>
    );
  }
}

DateInput2.propTypes = {
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  date: PropTypes.object,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onPartFocus: PropTypes.func,
  onBlur: PropTypes.func
};
DateInput2.defaultProps = {
  dateFormat: 'dd.MM.yyyy',
  disabled: false,
  className: '',
  date: null,
  locale: 'en-GB',
  minYear: 1920,
  maxYear: 2200,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
};
