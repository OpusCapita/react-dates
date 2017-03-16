import React, { Component, PropTypes } from 'react';
import s from './DateInput.module.less';
import DateInputPart from '../DateInputPart';
import {
  getFormatResolvers,
  resolveFormat,
  resolverDefinitions,
  SEPARATOR,
  YEAR_MIN,
  YEAR_MAX
} from './dateFormatResolver';

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = { formatResolvers: [] };
  }

  componentWillMount() {
    this.setFormatResolvers(this.props.dateFormat);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dateFormat !== nextProps.dateFormat) {
      this.setFormatResolvers(nextProps.dateFormat);
    }
  }

  setFormatResolvers(dateFormat) {
    let formatResolvers = getFormatResolvers(dateFormat, resolverDefinitions);
    this.setState({ formatResolvers });
  }

  getInputValue() {

  }

  render() {
    let { value, locale, minYear, maxYear } = this.props;
    let { formatResolvers } = this.state;

    let dateInputParts = formatResolvers.map(
      (formatResolver, index) => {
        if (formatResolver.type === SEPARATOR) {
          let separator = formatResolver.resolve();
          return (<span key={index}>{separator}</span>);
        }

        let options = ({ minYear, maxYear });
        let inputValue = resolveFormat(formatResolver, value, locale, options);
        return (
          <DateInputPart
            key={index}
            onChange={() => {}}
            maskPlaceholder={formatResolver.type}
            values={formatResolver.type}
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
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
  onChange: PropTypes.func
};
DateInput.defaultProps = {
  dateFormat: 'dd.MM.yyyy',
  value: new Date(),
  minYear: YEAR_MIN,
  maxYear: YEAR_MAX,
  onChange: newValue => console.log(newValue)
};
