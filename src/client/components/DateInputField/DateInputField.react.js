import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import FORMATS from './formats';
import './DateInputField.less';

export default
class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  componentDidMount() {

  }

  nextProps(componentWillReceiveProps) {

  }

  componentWillUnmount() {
    this.clearSelectTextTimeout();
  }

  setInputValue(props) {
    let inputValue = '';
    this.setState({ inputValue });
  }

  selectText(element) {
    this.selectTextTimeout = setTimeout(() => { // Timeout is a fix for EDGE and IE
      element.select();
    }, 0);
  }

  clearSelectTextTimeout() {
    if (typeof this.selectTextTimeout !== 'undefined') {
      clearTimeout(this.selectTextTimeout);
    }
  }

  validate(dateString, dateFormat) {
    let momentDate = moment(dateString, dateFormat);
    let error = momentDate.isValid() ? null : momentDate.invalidAt();

    if (typeof error === 'number') {
      this.props.onError(error);
    }
  }

  handleInputChange(event) {
    let inputValue = event.target.value;
    this.validate(inputValue, this.props.dateFormat);
    this.setState({ inputValue });
  }

  render() {
    let {
      dateFormat,
      disabled,
      className,
      date,
      locale,
      onChange,
      onFocus,
      onBlur,
      onRef,
      ...restProps
    } = this.props;

    let {
      inputValue
    } = this.state;

    return (
      <input
        className={`opuscapita_date-input-field`}
        disabled={disabled}
        onChange={this.handleInputChange.bind(this)}
        onFocus={onFocus}
        placeholder={dateFormat}
        ref={onRef}
        style={{ width:`${20 + 0.5}ch` }}
        type="text"
        value={inputValue}
      />
    );
  }
}

DateInputField.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onFocus: PropTypes.func,
  onInputFill: PropTypes.func,
  onRef: PropTypes.func
};
DateInputField.defaultProps = {
  className: '',
  date: null,
  dateFormat: 'DD.MM.YYYY',
  disabled: false,
  locale: 'en-GB',
  onBlur: () => {},
  onChange: () => {},
  onError: () => {},
  onFocus: () => {},
  onInputFill: () => {},
  onRef: () => {}
};
