import React, { Component, PropTypes } from 'react';
import s from './DateInputPart.module.less';

export default
class DateInputPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: typeof props.value === 'undefined' ? props.maskPlaceholder : props.value
    };
  }

  componentDidMount() {
    this.props.onMount(this);
  }

  componentWillUnmount() {
    if(this.selectTimeout) {
      clearTimeout(this.selectTimeout);
    }
    this.props.onUnmount(this);
  }

  handleKeyDown(event) {
    switch(event.which) {
      case 40: this.handlePrev(); this.selectText(); break; // Arrow Down
      case 38: this.handleNext(); this.selectText(); break; // Arrow Up
      case 37: this.props.onPressLeft(this); break; // Arrow Left
      case 39: this.props.onPressRight(this); break; // Arrow Right
      case 8: this.handleDelete(); // Backspace
      case 46: this.handleDelete(); // Delete
    }
  }

  getValuesForInput() {

  }

  selectText() {
    if(!this.props.autoSelectText) {
      return false;
    }
    return this.selectTimeout = setTimeout(() => { // Timeout is a fix for EDGE and IE
      this.inputRef.select();
    }, 0);
  }

  updateValue(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
    return newValue;
  }

  focus() {
    this.inputRef.focus();
    this.handleFocus();
  }

  handleFocus() {
    this.props.onFocus && this.props.onFocus();
    this.selectText();
  }

  handleBlur() {
    this.props.onBlur && this.props.onBlur();
  }

  handleChange() {
    this.props.onChange(this.state.value);
  }

  handleNext() {
    return 'next';
    let { value } = this.state;
    let { maskPlaceholder } = this.props;

    if (value === maskPlaceholder) {
      let newValue = max;
      return this.updateValue(newValue);
    }

    let newValue = value === max ? min : value + 1;
    return this.updateValue(newValue);
  }

  handlePrev() {
    return 'prev';
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
      width,
      onFocus,
      onBlur,
      onPressLeft,
      onPressDown,
      onPressUp,
      onPressRight,
      values,
      ...restProps
    } = this.props;

    let { value } = this.state;

    return (
      <div className={`${s.container || ''} ${className}`}>
        <input
          ref={inputRef => (this.inputRef = inputRef)}
          type="text"
          className={`${s.input || ''}`}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          style={{ width: width }}
          values={values}
          valueKey={value}
          { ...restProps }
        />
      </div>
    );
  }
}

DateInputPart.propTypes = {
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  autoSelectText: PropTypes.bool,
  className: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  width: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  valueKey: PropTypes.string,
  values: PropTypes.object
};
DateInputPart.defaultProps = {
  onMount: () => {},
  onUnmount: () => {},
  autoSelectText: true,
  className: '',
  maskPlaceholder: '',
  width: 4,
  onPressLeft: () => {},
  onPressRight: () => {},
  values: {},
  valueKey: ''
};
