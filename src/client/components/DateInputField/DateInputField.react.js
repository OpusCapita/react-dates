import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import './DateInputField.less';

let propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func
};

let defaultProps = {
  className: '',
  date: null,
  dateFormat: 'dd/MM/yyyy',
  disabled: false,
  locale: 'en-GB',
  onChange: () => {},
  onError: () => {}
};

export default
class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date || this.props.dateFormat !== nextProps.dateFormat) {
      let inputValue = nextProps.date ? moment(nextProps.date.toISOString()).format(nextProps.dateFormat) : '';
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

    if (error !== null && dateString.length) {
      this.props.onError(error);
    } else {
      let date = !dateString.length ? null : momentDate.toDate();
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
      date, // eslint-disable-line no-unused-vars
      locale, // eslint-disable-line no-unused-vars
      onError, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    let {
      inputValue
    } = this.state;

    return (
      <input
        className={`opuscapita_date-input-field form-control ${className}`}
        disabled={disabled}
        onChange={this.handleInputChange}
        placeholder={dateFormat}
        type="text"
        value={inputValue}
        {...restProps}
      />
    );
  }
}

DateInputField.propTypes = propTypes;
DateInputField.defaultProps = defaultProps;
