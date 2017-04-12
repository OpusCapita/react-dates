import React, { Component, PropTypes } from 'react';
import './DateRangeInput.less';
import DayPicker from '../DayPicker';
import { DateUtils } from 'react-day-picker';
import moment from 'moment';
import { spring, presets, Motion} from 'react-motion';
let springPreset = presets.gentle;

let initialState = {
  from: null,
  to: null,
  enteredTo: null
};

function isSelectingFirstDay(from, to, day) {
  let firstDayIsNotSelected = !from;
  let selectedDayIsBeforeFirstDay = day < from;
  let rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}

export default
class DateRangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
  }

  handleDayClick(day) {
    let { from, to } = this.state;

    if (DateUtils.isSameDay(day, from)) {
      this.reset();
      return;
    }

    if (isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day
      });
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
    document.body.removeEventListener('keydown', this.handleBodyKeyDown);
  }

  componentWillUpdate(nextProps, nextState) {
    let rangeChanged = (this.state.from !== nextState.from) || (this.state.to !== nextState.to);
    let rangeFilled = nextState.from !== null && nextState.to !== null;
    if (rangeChanged && rangeFilled) {
      this.props.onChange([ nextState.from, nextState.to ]);
    }
  }

  handleBodyClick(event) {
    let clickedOutside = !this.container.contains(event.target);
    if (clickedOutside) {
      return this.hidePicker();
    }
  }

  handleBodyKeyDown(event) {
    if (event.which === 9) {
      this.hidePicker();
    }
  }

  handleError(error) {
    this.setState({ error });
  }

  handleDateChange(date) {
    this.props.onChange(date);
    this.setState({ error: null });
  }

  showPicker() {
    this.setState({ showPicker: true });
  }

  hidePicker() {
    this.setState({ showPicker: false });
  }

  handleInputFocus() {
    this.showPicker();
  }

  handleDayMouseEnter(day) {
    let { from, to } = this.state;

    if (!isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  }

  reset() {
    this.setState(initialState);
    this.props.onChange([ null, null ]);
  }

  render() {
    let {
      className,
      dateFormat,
      dateRange,
      disabled,
      locale,
      placeholder,
      hideResetButton,
      showToTop,
      showToLeft,
      ...restProps
    } = this.props;

    let { from, to, enteredTo, error } = this.state;

    let showToTopClassName = showToTop ? 'opuscapita_date-range-input__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-range-input__picker-container--to-left' : '';

    let pickerElement = (
      <DayPicker
        className="Range"
        numberOfMonths={ 2 }
        fromMonth={ from }
        selectedDays={ [from, { from, to: enteredTo }] }
        disabledDays={ { before: this.state.from } }
        modifiers={ { start: from, end: enteredTo } }
        onDayClick={ this.handleDayClick }
        onDayMouseEnter={ this.handleDayMouseEnter }
        hideTodayButton={true}
      />
    );

    let pickerMotionElement = (
      <Motion
        defaultStyle={{ x: this.state.showPicker ? 1 : 0 }}
        style={{ x: this.state.showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <div
            className={`opuscapita_date-range-input__picker-container ${showToTopClassName} ${showToLeftClassName}`}
            style={{
              maxHeight: `${interpolatedStyle.x * 640}px`,
              opacity: interpolatedStyle.x
            }}
          >
            {pickerElement}
          </div>
        )}
      </Motion>
    );

    let inputValue = (from && to) ?
      `${moment(from).format(dateFormat)}  —  ${moment(to).format(dateFormat)}` :
      '';

    let resetButton = hideResetButton ? null : (
      <button
        className={`
          btn btn-default opuscapita_date-range-input__reset-btn
        `}
        tabIndex="-1"
        onClick={this.reset}
      >
        <i className="fa fa-times" />
      </button>
    );

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita_date-range-input form-group ${className}`}
        disabled={disabled}
        { ...restProps }
      >
        <input
          type="text"
          className="opuscapita_date-range-input__input-field form-control"
          onFocus={this.handleInputFocus.bind(this)}
          placeholder={placeholder}
          style={{ width: `${dateFormat.length * 2 + 5}ch` }}
          value={inputValue}
          onChange={() => {}}
        />
        {resetButton}
        {pickerMotionElement}
      </div>
    );
  }
}

DateRangeInput.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  dateRange: PropTypes.array,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  positionRight: PropTypes.bool,
  positionTop: PropTypes.bool,
  placeholder: PropTypes.string,
  hideResetButton: PropTypes.bool,
  showToTop: PropTypes.bool,
  showToLeft: PropTypes.bool
};
DateRangeInput.defaultProps = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  dateRange: [null, null],
  disabled: false,
  hideResetButton: false,
  locale: 'en-GB',
  placeholder: 'Select date range',
  onChange: () => {},
  showToTop: false,
  showToLeft: false
};
