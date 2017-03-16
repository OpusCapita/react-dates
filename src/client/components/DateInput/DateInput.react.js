import React, { Component, PropTypes } from 'react';
import s from './DateInput.module.less';
import DateInputPart from '../DateInputPart';
import {
  getDateFormatResolvers,
  resolveDateFormat,
  resolverDefinitions,
  isLeapYear,
  daysInMonth
} from './dateFormatResolver';

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = { dateFormatResolvers: [] };
  }

  componentWillMount() {
    this.setDateFormatResolvers(this.props.dateFormat);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dateFormat !== nextProps.dateFormat) {
      this.setDateFormatResolvers(nextProps.dateFormat);
    }
  }

  setDateFormatResolvers(dateFormat) {
    let dateFormatResolvers = getDateFormatResolvers(dateFormat, resolverDefinitions);
    this.setState({ dateFormatResolvers });
  }

  getYears(min, max) {
    let years = {};
    for(let i = min; i < max; i++) {
      years = Object.assign({}, years, { [i]: i });
    }
    return years;
  }

  getMonths(date) {
    return daysInMonth(date);
  }

  getInputValues(formatType) {
    console.log('ft', formatType);
    if(formatType.indexOf('y') >= 0) {
      return this.getYears(this.props.minYear, this.props.maxYear);
    }
    return { a: 'b' };
  }

  getInputValue() {

  }

  render() {
    let { value, locale } = this.props;
    let { dateFormatResolvers } = this.state;

    let dateInputParts = dateFormatResolvers.map(
      (dateFormatResolver, index) => {
        if (typeof dateFormatResolver === 'string') {
          return (<span key={index}>{dateFormatResolver}</span>);
        }
        let inputValue = resolveDateFormat(dateFormatResolver, value, locale);
        return (
          <DateInputPart
            key={index}
            onChange={() => {}}
            maskPlaceholder={dateFormatResolver.type}
            values={dateFormatResolver.type}
            value={inputValue}
            width={`${inputValue.length / 1.6}em`}
          />
        );
      }
    );

    return (
      <div className={s.dateInput}>
        {dateInputParts}
      </div>
    );
  }
}

DateInput.propTypes = {
  dateFormat: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  maxYear: PropTypes.number,
  minYear: PropTypes.number
};
DateInput.defaultProps = {
  dateFormat: 'dd.MM.yyyy',
  value: new Date(),
  onChange: newValue => console.log(newValue),
  minYear: 1970,
  maxYear: 2200
};
