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

let LEFT_TO_RIGHT = '‎'; // IE and EDGE add this special character when format locale string.

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

  render() {
    let {
      dateFormat,
      value,
      locale,
      minYear,
      maxYear,
      onChange,
      className,
      ...restProps
    } = this.props;

    let { formatResolvers } = this.state;
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

        let options = ({ minYear, maxYear });
        let inputValue = resolveFormat(formatResolver, value, locale, options);

        /* + XXch -fix FIREFOX and IE 'ch' calculation
           replace() - FIX - IE adds hidden chars */
        let inputWidth = `${inputValue.toString().replace(LEFT_TO_RIGHT, '').length + 0.5}ch`;

        return (
          <DateInputPart
            key={index}
            onMount={partRef => this.handlePartMount(partRef)}
            onUnmount={partRef => this.handlePartUnmount(partRef)}
            onChange={() => {}}
            onPressRight={partRef => this.focusNextPart.call(this, partRef)}
            onPressLeft={partRef => this.focusPrevPart.call(this, partRef)}
            maskPlaceholder={formatResolver.type}
            values={formatResolver.type}
            value={inputValue}
            width={inputWidth}
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
  minYear: YEAR_MIN,
  maxYear: YEAR_MAX,
  onChange: newValue => console.log(newValue)
};
