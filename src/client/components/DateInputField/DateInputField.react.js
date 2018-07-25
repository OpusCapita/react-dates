import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DateConverter from '@opuscapita/i18n/lib/converters/DateConverter';
import dayjs from '../../dayjs';
import './DateInputField.less';

let propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  error: PropTypes.bool,
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
  error: false,
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
      inputValue: props.value ? dayjs(props.value.toISOString()).format(props.dateFormat) : ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.error || this.props.value !== nextProps.value || this.props.dateFormat !== nextProps.dateFormat) {
      let inputValue = nextProps.value ? dayjs(nextProps.value.toISOString()).format(nextProps.dateFormat) : '';
      this.setState({ inputValue });
    }
  }

  clear = () => {
    this.setState({ inputValue: '' });
  };

  validate(dateString, dateFormat) {
    const i18nCompatibleFormat = dateFormat.replace(/D/g, 'd').replace(/Y/g, 'y');
    const dc = new DateConverter(i18nCompatibleFormat);

    try {
      const date = dc.stringToValue(dateString);
      const value = !dateString.length ? null : date;
      this.props.onChange(value);
    } catch (err) {
      this.props.onError(err.message);
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
      error, // eslint-disable-line no-unused-vars
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
          className={`opuscapita_date-input-field__input`}
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
