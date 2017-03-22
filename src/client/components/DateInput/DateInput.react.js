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
      currentPartRef: undefined
    };
    this.partsRefs = [];
  }

  componentWillMount() {
    this.setFormatResolvers(this.props.dateFormat);
  }

  componentDidMount() {
    this.props.onMount(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dateFormat !== nextProps.dateFormat) {
      this.setFormatResolvers(nextProps.dateFormat);
    }
  }

  componentWillUnmount() {
    this.props.onUnmount(this);
    this.focusTimeout && clearTimeout(this.focusTimeout);
  }

  setFormatResolvers(dateFormat) {
    let formatResolvers = getFormatResolvers(dateFormat, resolverDefinitions);
    this.setState({ formatResolvers });
  }

  focusFirstPart() {
    this.focusTimeout && clearTimeout(this.focusTimeout);
    this.focusTimeout = setTimeout(() => this.partsRefs[0].focus(), 0);
  }

  focusLastPart() {
    this.focusTimeout && clearTimeout(this.focusTimeout);
    this.focusTimeout = setTimeout(() => this.partsRefs[this.partsRefs.length - 1].focus(), 0);
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

  handleKeyDown(event) {
    let { currentPartRef } = this.state;
    console.log(currentPartRef);
    let indexOfCurrentPartRef = this.partsRefs.indexOf(currentPartRef);
    switch(event.which) {
      case 37: this.props.onPressLeft(this.partsRefs.length, indexOfCurrentPartRef); break; // Arrow Left
      case 39: this.props.onPressRight(this.partsRefs.length, indexOfCurrentPartRef); break; // Arrow Right
    }
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

  handlePartFocus(partRef) {
    this.setState({ currentPartRef: partRef });
  }

  handleChange(date) {
    this.props.onChange(date);
  }

  render() {
    let {
      dateFormat,
      disabled,
      date,
      locale,
      minYear,
      maxYear,
      onChange,
      onClear,
      onLast,
      onMount,
      onUnmount,
      onPressLeft,
      onPressRight,
      className,
      ...restProps
    } = this.props;

    let { formatResolvers } = this.state;
    let options = ({ minYear, maxYear });
    let { partsRefs } = this;

    let dateInputParts = formatResolvers.map(
      (formatResolver, index) => {
        if (formatResolver.type === SEPARATOR) {
          let separator = formatResolver.getValue();
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
            onChange={(date, input) => {
              (input === partsRefs[partsRefs.length - 1]) && onLast();
              this.handleChange(date);
            }}
            onFocus={this.handlePartFocus.bind(this)}
            onPressRight={partRef => this.focusNextPart(partRef)}
            onPressLeft={partRef => this.focusPrevPart(partRef)}
            formatResolver={formatResolver}
            options={options}
            locale={locale}
            date={date}
            disabled={disabled}
          />
        );
      }
    );

    return (
      <div
        className={`${s.dateInput || ''} ${className}`}
        disabled={disabled}
        onKeyDown={this.handleKeyDown.bind(this)}
        { ...restProps }
      >
        {dateInputParts}
      </div>
    );
  }
}

DateInput.propTypes = {
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  date: PropTypes.object,
  locale: PropTypes.string,
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
  onChange: PropTypes.func,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  onLast: PropTypes.func
};
DateInput.defaultProps = {
  dateFormat: 'dd.MM.yyyy',
  disabled: false,
  className: '',
  date: new Date(),
  locale: 'en-GB',
  minYear: 1920,
  maxYear: 2200,
  onChange: () => {},
  onMount: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onUnmount: () => {},
  onLast: () => {}
};
