import React, { Component, PropTypes } from 'react';
import s from './DateInput.module.less';
import getDatePartsOrder from './getDatePartsOrder';
import DateInputPart from '../DateInputPart';

export default
class DateInput extends Component {
  componentWillMount() {
    this.setDatePartsOrder(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.locale !== nextProps.locale) {
      this.setDatePartsOrder(nextProps.locale);
    }
  }

  setDatePartsOrder(locale) {
    let datePartsOrder = getDatePartsOrder(locale);
    this.setState({ datePartsOrder: datePartsOrder });
  }

  getDatePartValue(locale, part, date) {
    let partValue;
    switch(part.type) {
      case 'y': (partValue = date.toLocaleDateString(locale, { year: part.representation })); break;
      case 'M': (partValue = date.toLocaleDateString(locale, { month: part.representation })); break;
      case 'd': (partValue = date.toLocaleDateString(locale, { day: part.representation })); break;
    }
    return partValue;
  };

  render() {
    let { ISODate, locale } = this.props;
    let { datePartsOrder } = this.state;
    let date = new Date(Date.parse(ISODate));

    return (
      <div className={s.dateInput}>
        <DateInputPart
          onChange={() => {}}
          maskPlaceholder={this.getDatePartValue(locale, datePartsOrder[0], date)}
          minSize={2}
        />
        <span>{datePartsOrder[1].value}</span>

        <DateInputPart
          onChange={() => {}}
          maskPlaceholder={this.getDatePartValue(locale, datePartsOrder[2], date)}
          minSize={2}
        />
        <span>{datePartsOrder[3].value}</span>

        <DateInputPart
          onChange={() => {}}
          maskPlaceholder={this.getDatePartValue(locale, datePartsOrder[4], date)}
          minSize={4}
        />
        <span>{datePartsOrder[5].value}</span>
      </div>
    );
  }
}

DateInput.propTypes = {
  ISODate: PropTypes.string,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  maxYear: PropTypes.number,
  minYear: PropTypes.number
};
DateInput.defaultProps = {
  ISODate: new Date().toISOString(),
  locale: 'en-US',
  onChange: () => {}
};
