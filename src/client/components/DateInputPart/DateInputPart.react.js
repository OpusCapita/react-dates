import React, { Component, PropTypes } from 'react';
import './DateInputPart.less';

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
    if(this.props.date !== nextProps.date) {
      let initialState = this.getInitialState(nextProps, this.state);
      this.setState(initialState);
    }

    if (prevProps.isFocused === this.props.isFocused) {
      return;
    };

    if (isFocused) {
      this.inputRef.focus();

    } else {
      this.inputRef.blur();
    }
  }

  getInitialState(props, oldState) {
    let { date } = props;
    return ({
      ...oldState,
      key: date && props.formatResolver.getKey(props.date),
      keys: date && props.formatResolver.getAllowedKeys(props.date, props.options),
      inputSize: props.formatResolver.size,
      inputValue: ''
    });
  }

  focus() {
    this.inputRef.focus();
    this.handleFocus();
  }

  selectText() {
    return this.selectTimeout = setTimeout(() => { // Timeout is a fix for EDGE and IE
      this.inputRef.select();
    }, 0);
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

  updateKey(newKey) {
    let { formatResolver, date } = this.props;
    let newDate = formatResolver.setKey(date, newKey);
    this.handleChange(newDate);
    return newKey;
  }

  handleClick(event) {
    this.selectText();
  }

  handlePressRight() {
    this.props.onPressRight(this);
  }

  handlePressLeft() {
    this.props.onPressLeft(this);
  }

  handleFocus() {
    this.props.onFocus && this.props.onFocus(this);
    this.selectText();
  }

  handleBlur() {
    this.props.onBlur && this.props.onBlur(this);
    if (typeof this.selectTimeout !== 'undefined') {
      clearTimeout(this.selectTimeout);
    }
  }

  handleInputChange(event) {
    let { formatResolver, date, onError } = this.props;
    let { inputSize, inputValue, keys } = this.state;
    let newInputValue = event.target.value;
    let inputPlaceholder = formatResolver.type;

    if (newInputValue.length === inputSize) {
      let isValid = formatResolver.validate(date, keys, newInputValue);
      if(!isValid) {
        onError();
        this.setState({ inputValue: '' });
        this.selectText();
        return this.handleChange(date);
      }
      let newDate = formatResolver.setValue(date, newInputValue, keys);
      this.handleChange(newDate);
      return this.props.onPressRight(this);
    }

    return this.setState({ inputValue: newInputValue });
  }

  handleChange(newDate) {
    this.props.onChange(newDate, this);
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
      date,
      disabled,
      formatResolver,
      locale,
      onBlur,
      onChange,
      onFocus,
      onMount,
      onUnmount,
      onPressLeft,
      onPressRight,
      options,
      ...restProps
    } = this.props;

    let inputValue = this.state.inputValue || (date && formatResolver.getValue(date, locale, options));
    let inputWidth = `${formatResolver.size + 0.5}ch`;

    return (
      <div className={`date-input-part ${className}`} title={formatResolver.type}>
        <input
          ref={inputRef => (this.inputRef = inputRef)}
          type="text"
          className="date-input-part__input"
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onClick={this.handleClick.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          style={{ width: inputWidth }}
          value={inputValue}
          disabled={disabled}
          { ...restProps }
        />
      </div>
    );
  }
}

DateInputPart.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  disabled: PropTypes.bool,
  formatResolver: PropTypes.object,
  isFocused: PropTypes.bool,
  locale: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onFocus: PropTypes.func,
  onMount: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  onUnmount: PropTypes.func,
  options: PropTypes.object
};
DateInputPart.defaultProps = {
  className: '',
  date: null,
  disabled: false,
  formatResolver: {},
  locale: 'en-GB',
  isFocused: false,
  onBlur: () => {},
  onChange: () => {},
  onError: () => {},
  onFocus: () => {},
  onMount: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onUnmount: () => {},
  options: {}
};