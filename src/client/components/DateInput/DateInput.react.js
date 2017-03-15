import React, { Component, PropTypes } from 'react';
import s from './DateInput.module.less';
import getDatePartsOrder from './getDatePartsOrder';
import DateInputPart from '../DateInputPart';

export default
class DateInput extends Component {
  componentWillMount() {
    this.setDatePartsOrder(this.props.dateFormat);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dateFormat !== nextProps.dateFormat) {
      this.setDatePartsOrder(nextProps.dateFormat);
    }
  }

  setDatePartsOrder(dateFormat) {
    let datePartsOrder = getDatePartsOrder(dateFormat);
    this.setState({ datePartsOrder: datePartsOrder });
  }

  getDatePartValue(part, date) {
    let partValue;
    switch(part.type) {
      case 'y': (partValue = date.getFullYear()); break;
      case 'M': (partValue = date.getMonth()); break;
      case 'd': (partValue = date.getDate()); break;
    }
    return partValue;
  };

  render() {
    let { ISODate, dateFormat } = this.props;
    let { datePartsOrder } = this.state;
    let date = new Date(Date.parse(ISODate));

    return (
      <div className={s.dateInput}>
        <DateInputPart
          onChange={() => {}}
          maskPlaceholder={this.getDatePartValue(datePartsOrder[0], date)}
          minSize={2}
        />
        <span>{datePartsOrder[1].value}</span>

        <DateInputPart
          onChange={() => {}}
          maskPlaceholder={this.getDatePartValue(datePartsOrder[2], date)}
          minSize={2}
        />
        <span>{datePartsOrder[3].value}</span>

        <DateInputPart
          onChange={() => {}}
          maskPlaceholder={this.getDatePartValue(datePartsOrder[4], date)}
          minSize={4}
        />
        <span>{datePartsOrder[5].value}</span>
      </div>
    );
  }
}

DateInput.propTypes = {
  dateFormat: PropTypes.string,
  ISODate: PropTypes.string,
  onChange: PropTypes.func,
  maxYear: PropTypes.number,
  minYear: PropTypes.number
};
DateInput.defaultProps = {
  dateFormat: 'dd.MM.yyyy',
  ISODate: new Date().toISOString(),
  onChange: () => {},
  minYear: 1970,
  maxYear: 2200
};
