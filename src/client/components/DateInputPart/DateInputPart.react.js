import React, { Component, PropTypes } from 'react';
import s from './DateInputPart.module.less';

export default
class DateInputPart extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.maskPlaceholder };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillUnmount() {
    if(this.selectTimeout) {
      clearTimeout(this.selectTimeout);
    }
    this.removeKeysListeners();
  }

  addKeysListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  removeKeysListeners() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    switch(event.which) {
      case 40: this.handlePrev(); this.selectText(); break; // Arrow Down
      case 38: this.handleNext(); this.selectText(); break; // Arrow Up
      case 39: this.props.onPressLeft(); break; // Arrow Left
      case 37: this.props.onPressRight(); break; // Arrow Right
      case 8: this.handleDelete(); // Backspace
      case 46: this.handleDelete(); // Delete
    }
  }

  selectText() {
    if(!this.props.autoSelectText) {
      return false;
    }
    this.selectTimeout = setTimeout(() => { // Timeout is a fix for EDGE and IE
      this.inputRef.select();
    }, 0);
  }

  updateValue(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
    return newValue;
  }

  handleFocus() {
    this.addKeysListeners();
    this.props.onFocus && this.props.onFocus();
    this.selectText();
  }

  handleBlur() {
    this.removeKeysListeners();
    this.props.onBlur && this.props.onBlur();
  }

  handleChange() {
    this.props.onChange(this.state.value);
  }

  handleNext() {
    let { value } = this.state;
    let { maskPlaceholder, min, max } = this.props;

    if(value === maskPlaceholder) {
      let newValue = max;
      return this.updateValue(newValue);
    }

    let newValue = value === max ? min : value + 1;
    return this.updateValue(newValue);
  }

  handlePrev() {
    let { value } = this.state;
    let { maskPlaceholder, min, max } = this.props;

    if(value === maskPlaceholder) {
      let newValue = max;
      return this.updateValue(newValue);
    }

    let newValue = value === min ? max : value - 1;
    return this.updateValue(newValue);
  }

  handleDelete() {
    let newValue = this.props.maskPlaceholder;
    this.selectText();
    return this.updateValue(newValue);
  }

  render() {
    let {
      autoSelectText,
      maskPlaceholder,
      className,
      minSize,
      onPressLeft,
      onPressDown,
      onPressUp,
      onPressRight,
      ...restProps
    } = this.props;

    let { value } = this.state;

    let inputSize = value.toString().length > minSize ? value.toString().length : minSize;

    return (
      <input
        ref={inputRef => (this.inputRef = inputRef)}
        type="text"
        className={`${s.dateInputPart || ''} ${className}`}
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onChange={this.handleChange.bind(this)}
        size={inputSize}
        value={value}
        { ...restProps }
      />
    );
  }
}

DateInputPart.propTypes = {
  autoSelectText: PropTypes.bool,
  className: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  minSize: PropTypes.number,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func
};
DateInputPart.defaultProps = {
  autoSelectText: true,
  className: '',
  maskPlaceholder: '',
  minSize: 2,
  min: 0,
  max: 0,
  onPressLeft: () => {},
  onPressRight: () => {}
};
