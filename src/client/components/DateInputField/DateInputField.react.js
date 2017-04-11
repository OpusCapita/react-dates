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

  componentWillReceiveProps(nextProps) {
    if (nextProps.date && this.props.date !== nextProps.date || this.props.dateFormat !== nextProps.dateFormat) {
      let inputValue = moment(nextProps.date.toISOString()).format(nextProps.dateFormat);
      this.setState({ inputValue });
    }
  }

  setInputValue(props) {
    let inputValue = '';
    this.setState({ inputValue });
  }

  validate(dateString, dateFormat) {
    let momentDate = moment(dateString, dateFormat, true);
    let error = momentDate.isValid() ? null : momentDate.invalidAt();

    if (error !== null) {
      this.props.onError(error);
    } else {
      let date = momentDate.toDate();
      this.props.onChange(date);
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

    console.log('date:::', date);

    let {
      inputValue
    } = this.state;

    return (
      <input
        className={`opuscapita_date-input-field form-control`}
        disabled={disabled}
        onChange={this.handleInputChange.bind(this)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={dateFormat}
        ref={onRef}
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
