import React, { Component, PropTypes } from 'react';
import s from './DateInputPart.module.less';
import { resolveFormat } from '../DateInput/dateFormatResolver';

export default
class DateInputPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getInitialState(props, {})
    };
  }

  componentDidMount() {
    this.props.onMount(this);
  }

  componentWillUnmount() {
    if(typeof this.selectTimeout !== 'undefined') {
      clearTimeout(this.selectTimeout);
    }
    this.props.onUnmount(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dateValue !== nextProps.dateValue) {
      let initialState = this.getInitialState(nextProps, this.state);
      this.setState(initialState);
    }
  }

  getInputSize(props) {
    return props.formatResolver.getInputSize(props.dateValue, props.locale, props.resolverOptions);
  }

  getKeys(props) {
    return props.formatResolver.getKeys(props.dateValue, props.resolverOptions);
  }

  getKey(props) {
    return props.formatResolver.getKey(props.dateValue);
  }

  getInitialState(props, oldState) {
    return ({
      ...oldState,
      key: this.getKey(props),
      keys: this.getKeys(props),
      inputSize: this.getInputSize(props),
      inputValue: ''
    });
  }

  handleKeyDown(event) {
    switch(event.which) {
      case 37: this.handlePressLeft(); break; // Arrow Left
      case 38: this.handleNext(); this.selectText(); break; // Arrow Up
      case 39: this.handlePressRight(); break; // Arrow Right
      case 40: this.handlePrev(); this.selectText(); break; // Arrow Down
      case 46: this.handleDelete(event); this.selectText(); break; // Delete
      case 8: this.handleDelete(event); this.selectText(); break; // Backspace
    }
  }

  selectText() {
    return this.selectTimeout = setTimeout(() => { // Timeout is a fix for EDGE and IE
      this.inputRef.select();
    }, 0);
  }

  updateKey(newKey) {
    let newDate = new Date(this.props.dateValue.toISOString());
    this.props.formatResolver.setKey(newDate, newKey);
    this.handleChange(newDate);
    return newKey;
  }

  focus() {
    this.inputRef.focus();
    this.handleFocus();
  }

  handlePressRight() {
    this.props.onPressRight(this);
  }

  handlePressLeft() {
    this.props.onPressLeft(this);
  }

  handleFocus() {
    this.props.onFocus && this.props.onFocus();
    this.selectText();
  }

  handleBlur() {
    this.props.onBlur && this.props.onBlur();
    if (typeof this.selectTimeout !== 'undefined') {
      clearTimeout(this.selectTimeout);
    }
  }

  handleInputChange(event) {
    let inputSize = this.state.inputSize;
    let oldValue = this.state.inputValue;
    let { formatResolver, dateValue } = this.props;
    let inputPlaceholder = formatResolver.type;
    let newValue = event.target.value;

    if (newValue.length === inputSize) {
      let newDate = new Date(dateValue.toISOString());
      formatResolver.setValue(newDate, newValue, this.state.keys);
      this.handleChange(newDate);
      return this.props.onPressRight(this);
    }

    return this.setState({ inputValue: newValue });
  }

  handleChange(newDate) {
    this.props.onChange(newDate);
  }

  handleNext() {
    let indexOfKey = this.state.keys.indexOf(this.state.key);
    let keys = this.state.keys;
    let newKey = indexOfKey === keys.length - 1 ? keys[0] : keys[indexOfKey + 1];
    return this.updateKey(newKey);
  }

  handlePrev() {
    let indexOfKey = this.state.keys.indexOf(this.state.key);
    let keys = this.state.keys;
    let newKey = indexOfKey === 0 ? keys[keys.length - 1] : keys[indexOfKey - 1];
    return this.updateKey(newKey);
  }

  handleDelete(event) {
    event.preventDefault();
    this.setState({ inputValue: this.props.formatResolver.type });
  }

  render() {
    let {
      className,
      dateValue,
      formatResolver,
      locale,
      onBlur,
      onChange,
      onFocus,
      onMount,
      onUnmount,
      onPressLeft,
      onPressRight,
      resolverOptions,
      ...restProps
    } = this.props;

    let inputValue = this.state.inputValue || resolveFormat(formatResolver, dateValue, locale, resolverOptions);

    let inputWidth = `${formatResolver.getInputSize() + 0.5}ch`;

    return (
      <div className={`${s.container || ''} ${className}`}>
        <input
          ref={inputRef => (this.inputRef = inputRef)}
          type="text"
          className={`${s.input || ''}`}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          style={{ width: inputWidth }}
          value={inputValue}
          { ...restProps }
        />
      </div>
    );
  }
}

DateInputPart.propTypes = {
  className: PropTypes.string,
  dateValue: PropTypes.object,
  formatResolver: PropTypes.object,
  locale: PropTypes.string,
  onMount: PropTypes.func,
  onChange: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  onUnmount: PropTypes.func,
  resolverOptions: PropTypes.object
};
DateInputPart.defaultProps = {
  className: '',
  dateValue: new Date(),
  formatResolver: {},
  locale: 'en-GB',
  onChange: () => {},
  onMount: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onUnmount: () => {},
  resolverOptions: {}
};
