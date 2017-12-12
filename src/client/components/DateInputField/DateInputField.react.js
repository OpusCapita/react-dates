import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from '../moment';
import './DateInputField.less';

let propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onRef: PropTypes.func,
  value: PropTypes.object
};

let defaultProps = {
  className: '',
  dateFormat: 'dd/MM/yyyy',
  disabled: false,
  locale: 'en',
  onChange: () => {},
  onError: () => {},
  onRef: () => {},
  value: null
};

export default
class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.value ? moment(props.value.toISOString()).format(props.dateFormat) : ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value || this.props.dateFormat !== nextProps.dateFormat) {
      let inputValue = nextProps.value ? moment(nextProps.value.toISOString()).format(nextProps.dateFormat) : '';
      this.setState({ inputValue });
    }
  }

  clear = () => {
    this.setState({ inputValue: '' });
  };

  validate(dateString, dateFormat) {
    let momentDate = moment(dateString, dateFormat, true);
    let error = momentDate.isValid() ? null : momentDate.invalidAt();

    if (error !== null && dateString.length) {
      this.props.onError(error);
    } else {
      let value = !dateString.length ? null : momentDate.toDate();
      this.props.onChange(value);
    }
  }

  handleInputChange = event => {
    let inputValue = event.target.value;
    this.validate(inputValue, this.props.dateFormat);
    this.setState({ inputValue });
  };

  handleRef = () => {
    this.props.onRef(this);
  };

  render() {
    let {
      className,
      dateFormat,
      disabled,
      locale, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onError, // eslint-disable-line no-unused-vars
      onRef, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    let {
      inputValue
    } = this.state;

    return (
      <div
        ref={this.handleRef}
        className={`opuscapita_date-input-field form-control ${className}`}
        disabled={disabled}
      >
        <input
          ref={ref => { this.dateInputFieldRef = ref }}
          type="text"
          value={inputValue}
          placeholder={dateFormat}
          disabled={disabled}
          onChange={this.handleInputChange}
          {...restProps}
        />
      </div>
    );
  }
}

DateInputField.propTypes = propTypes;
DateInputField.defaultProps = defaultProps;
