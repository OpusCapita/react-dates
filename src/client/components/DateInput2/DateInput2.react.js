import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import assign from 'lodash/assign';
import DateInputPart from '../DateInputPart';
import FORMATS from './formats';
import './DateInput2.less';

function splitFormats(dateFormat, supportedDateFormats) {
  let dateFormatParts = dateFormat.split(/\b/);
  return dateFormatParts.map((formatPart, index) => {
    let isSeparator = supportedDateFormats.indexOf(formatPart) === -1;
    return isSeparator ?
      ({ view: formatPart, type: null }) :
      ({ view: formatPart, type: formatPart });
  });
}

export default
class DateInput2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeInputKey: '',
      activeInputValue: '',
      isLastInputSelected: false,
      isFirstInputSelected: false,
      dateFormatParts: [],
      lastActiveElement: null
    };
    this.inputs = {};
    this.handleBodyClick = this.handleBodyClick.bind(this);
  }

  componentDidMount() {
    this.setDateFormat(this.props);
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.dateFormat !== nextProps.dateFormat) {
      this.setDateFormat(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearSelectTextTimeout();
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  formatInputValue(format) {
    let { date } = this.props;
    if(date) {
      return moment(date).format(format.type);
    }
    return '';
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

  focusNextInput() {
    if(this.state.isLastInputSelected) {
      return this.props.onCantMoveRight();
    }

    let { activeInputKey } = this.state;
    let currentInputIndex = Object.keys(this.inputs).indexOf(activeInputKey);
    let key = Object.keys(this.inputs)[currentInputIndex + 1];
    if(typeof this.inputs[key] !== 'undefined') {
      return this.inputs[key].focus();
    }
  }

  focusPrevInput() {
    if(this.state.isFirstInputSelected) {
      return this.props.onCantMoveLeft();
    }
    let { activeInputKey } = this.state;
    let currentInputIndex = Object.keys(this.inputs).indexOf(activeInputKey);
    let key = Object.keys(this.inputs)[currentInputIndex - 1];
    if(typeof this.inputs[key] !== 'undefined') {
      return this.inputs[key].focus();
    }
  }

  setDateFormat(props) {
    let dateFormatParts = splitFormats(props.dateFormat, Object.keys(FORMATS));
    this.setState({ dateFormatParts });
  }

  handleInputMount(key, element) {
    this.inputs[key] = element;
  }

  handleInputUnmount(key) {
    delete this.inputs[key];
  }


  isLastActiveElementInside() {
    return Object.keys(this.inputs).some(inputKey => this.inputs[inputKey] === this.state.lastActiveElement);
  }

  handleBodyClick(event) {
    let isActiveElementInside = Object.keys(this.inputs).some(inputKey => this.inputs[inputKey] === document.activeElement);
    if(this.isLastActiveElementInside() && !isActiveElementInside) {
      this.props.onBlur();
    }
    this.setState({ lastActiveElement: event.target });
  }

  handleInputKeyDown(event) {
    let inputKeys = Object.keys(this.inputs);
    let lastInputKey = inputKeys[inputKeys.length - 1];
    let firstInputKey = inputKeys[0];
    let isFirstInput = this.inputs[firstInputKey] === event.target;
    let isLastInput = this.inputs[lastInputKey] === event.target;
    let isTabKey = event.which === 9;
    if(isTabKey && isLastInput && !event.shiftKey) {
      this.props.onBlur();
      this.setState({ lastActiveElement: null });
    }
    if(isTabKey && isFirstInput && event.shiftKey) {
      this.props.onBlur();
      this.setState({ lastActiveElement: null });
    }
  }

  handleActiveInputChange(event, format) {
    let value = event.target.value;
    this.setState({ activeInputValue: event.target.value });
    if(value.length === format.view.length) {
      this.focusNextInput();
    }
  }

  handleInputFocus(event, key) {
    event.preventDefault();
    let currentInputIndex = Object.keys(this.inputs).indexOf(this.state.activeInputKey);
    let isFirstInput = currentInputIndex === 0;
    let isLastInput = currentInputIndex === Object.keys(this.inputs).length - 1;

    if(!this.isLastActiveElementInside()) {
      this.props.onFocus();
    }

    this.selectText(this.inputs[key]);
    this.setState({
      activeInputKey: key,
      activeInputValue: event.target.value,
      isLastInputSelected: isLastInput,
      isFirstInputSelected: isFirstInput,
      lastActiveElement: event.target
    });
  }

  handleDelete() {
    let firstInputKey = Object.keys(this.inputs)[0];
    this.inputs[firstInputKey].focus();
    this.props.onChange(null);
  }

  handleArrowLeft() {
    this.focusPrevInput();
  }

  handleArrowRight() {
    this.focusNextInput();
  }

  handleArrowUp() {

  }

  handleArrowDown() {

  }

  handleKeyDown(event) {
    switch(event.which) {
      case 37: this.handleArrowLeft(); break; // Arrow Left
      case 39: this.handleArrowRight(); break; // Arrow Right
      case 38: this.handleArrowUp(); break; // Arrow Up
      case 40: this.handleArrowDown(); break; // Arrow Down
      case 46: this.handleDelete(event); break; // Delete
      case 8: this.handleDelete(event); break; // Backspace
    }
  }

  render() {
    let {
      dateFormat,
      disabled,
      className,
      date,
      locale,
      onChange,
      onPartFocus,
      onFocus,
      onBlur,
      onCantMoveLeft,
      onCantMoveRight,
      ...restProps
    } = this.props;

    let {
      dateFormatParts,
      activeInputKey,
      activeInputValue
    } = this.state;

    let formatPartElements = dateFormatParts.map((format, index) => {
      let key = index.toString();
      if (!format.type) {
        return (
          <span key={key}>
            {format.view}
          </span>
        );
      }

      let value = key === activeInputKey ? activeInputValue : this.formatInputValue(format);

      let refHandler = (element) => element === null ?
          this.handleInputUnmount(key):
          this.handleInputMount(key, element);

      return (
        <div className={`opuscapita_date-input__format-part ${className}`} title={format.type} key={index}>
          <input
            type="text"
            className={`opuscapita_date-input__format-part-input`}
            style={{ width:`${(format.view.length || 1) + 0.5}ch` }}
            value={value}
            placeholder={format.view}
            ref={refHandler}
            onFocus={event => this.handleInputFocus(event, key)}
            onChange={(event) => key === activeInputKey && this.handleActiveInputChange(event, format)}
            onKeyDown={this.handleInputKeyDown.bind(this)}
            disabled={disabled}
          />
        </div>
      );
    });

    return (
      <div
        className={`opuscapita_date-input ${className}`}
        onKeyDown={this.handleKeyDown.bind(this)}
        { ...restProps }
      >
        {formatPartElements}
      </div>
    );
  }
}

DateInput2.propTypes = {
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  date: PropTypes.object,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onCantMoveLeft: PropTypes.func,
  onCantMoveRight: PropTypes.func
};
DateInput2.defaultProps = {
  dateFormat: 'DD.MM.YYYY',
  disabled: false,
  className: '',
  date: null,
  locale: 'en-GB',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onCantMoveLeft: () => {},
  onCantMoveRight: () => {}
};
