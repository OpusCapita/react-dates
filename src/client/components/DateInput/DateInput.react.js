import React, { Component, PropTypes } from 'react';
import s from './DateInput.module.less';
import DateInputPart from '../DateInputPart';
import {
  getFormatResolvers,
  resolveFormat,
  resolverDefinitions,
  SEPARATOR
} from './dateFormatResolver';

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formatResolvers: [],
      selectedInputIndex: undefined
    };
    this.partsRefs = [];
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

  focusNextPart(partRef) {
    let indexOfPartRef = this.partsRefs.indexOf(partRef);
    if (indexOfPartRef === this.partsRefs.length - 1) {
      this.partsRefs[indexOfPartRef].focus();
      return false;
    }
    return this.partsRefs[indexOfPartRef + 1].focus();
  }

  focusPrevPart(partRef) {
    let indexOfPartRef = this.partsRefs.indexOf(partRef);
    if (indexOfPartRef === 0) {
      this.partsRefs[indexOfPartRef].focus();
      return false;
    }
    return this.partsRefs[indexOfPartRef - 1].focus();
  }

  handlePartMount(partRef) {
    this.partsRefs = this.partsRefs.concat([ partRef ]);
  }

  handlePartUnmount(partRef) {
    let partsRefs = this.partsRefs;
    let indexOfPartRef = partsRefs.indexOf(partRef);
    let leftPart = partsRefs.slice(0, indexOfPartRef);
    let rightPart = partsRefs.slice(indexOfPartRef, partsRefs.length - 1);
    this.partsRefs = leftPart.concat(rightPart);
  }

  handleChange(date) {
    this.props.onChange(date);
  }

  render() {
    let {
      dateFormat,
      value,
      locale,
      minYear,
      maxYear,
      onChange,
      onClear,
      className,
      ...restProps
    } = this.props;

    let { formatResolvers } = this.state;
    let resolverOptions = ({ minYear, maxYear });

    let dateInputParts = formatResolvers.map(
      (formatResolver, index) => {
        if (formatResolver.type === SEPARATOR) {
          let separator = formatResolver.resolve();
          return (
            <span key={index}>
              {separator}
            </span>
          );
        }

        return (
          <DateInputPart
            key={index}
            onMount={partRef => this.handlePartMount(partRef)}
            onUnmount={partRef => this.handlePartUnmount(partRef)}
            onChange={date => this.handleChange(date)}
            onPressRight={partRef => this.focusNextPart(partRef)}
            onPressLeft={partRef => this.focusPrevPart(partRef)}
            formatResolver={formatResolver}
            resolverOptions={resolverOptions}
            locale={locale}
            dateValue={value}
          />
        );
      }
    );

    return (
      <div className={`${s.dateInput || ''} ${className}`} { ...restProps }>
        {dateInputParts}
      </div>
    );
  }
}

DateInput.propTypes = {
  dateFormat: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.object,
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
  onChange: PropTypes.func
};
DateInput.defaultProps = {
  dateFormat: 'dd.MM.yyyy',
  className: '',
  value: new Date(),
  minYear: 1920,
  maxYear: 2200,
  onChange: () => {}
};
