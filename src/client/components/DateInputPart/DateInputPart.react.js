import React, { Component, PropTypes } from 'react';
import s from './DateInputPart.module.less';

export default
class DateInputPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      error: ``
    };
  }

  addKeysListeners() {

  }

  removeKeysListeners() {

  }

  selectNextValue() {

  }

  selectPrevValue() {

  }

  valueExists(value, values) {
    return Object.keys(this.props.values).some(key => values[key] === value);
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleChange(event) {
    let value = event.target.value;
    let isValueExists = this.valueExists(value, this.props.values);
    if(!isValueExists) {
      this.handleError(value);
    }
    this.props.onChange(value);
  }

  handleError(error) {
    this.setState({ error });
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  render() {
    let { values, valueKey } = this.props;
    let value = values[valueKey] || '';
    console.log(value);

    return (
      <input
        type="text"
        className={s.dateInputPart}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        value={value}
      />
    );
  }
}

DateInputPart.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  valueKey: PropTypes.string,
  values: PropTypes.objectOf(PropTypes.string)
};
DateInputPart.defaultProps = {
  onChange: () => {},
  onError: () => {},
  valueKey: '',
  values: {}
};
