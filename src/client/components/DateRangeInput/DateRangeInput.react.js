import React, { Component, PropTypes } from 'react';
import './DateRangeInput.less';
import DayPicker from '../DayPicker';
import InputAddonButton from '../InputAddonButton';
import DateRangeVariants from '../DateRangeVariants';
import { DateUtils } from 'react-day-picker';
import moment from 'moment';
import { spring, presets, Motion} from 'react-motion';
let springPreset = presets.gentle;
let easeOutCubic = (t) => (--t)*t*t+1;

let initialState = {
  enteredTo: null,
  showPicker: false,
  showVariants: false
};

function isSelectingFirstDay(from, to, day) {
  let firstDayIsNotSelected = !from;
  let selectedDayIsBeforeFirstDay = day < from;
  let rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}

let propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  dateRange: PropTypes.array,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  positionRight: PropTypes.bool,
  positionTop: PropTypes.bool,
  placeholder: PropTypes.string,
  hideVariantsButton: PropTypes.bool,
  showToTop: PropTypes.bool,
  showToLeft: PropTypes.bool
};

let defaultProps = {
  className: '',
  dateFormat: 'dd/MM/yyyy',
  dateRange: [null, null],
  disabled: false,
  hideVariantsButton: false,
  locale: 'en-GB',
  placeholder: 'Select date range',
  onChange: () => {},
  showToTop: false,
  showToLeft: false
};

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
    this.handleVariantsButtonClick = this.handleVariantsButtonClick.bind(this);
    this.handleVariantSelect = this.handleVariantSelect.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  handleDayClick(day) {
    let from = this.props.dateRange[0];
    let to = this.props.dateRange[1];

    if (DateUtils.isSameDay(day, from)) {
      this.reset();
      return;
    }

    if (isSelectingFirstDay(from, to, day)) {
      this.props.onChange([ day, null ]);
      this.setState({
        enteredTo: null
      });
    } else {
      this.props.onChange([ from, day ]);
      this.setState({
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

  componentWillReceiveProps(nextProps) {
    if(this.props.dateRange[0] !== nextProps.dateRange[0]) {
      let month = nextProps.dateRange[0] || new Date();
      this.reactDayPicker.showMonth(month);
    }
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
      this.hideVariants();
      this.hidePicker();
    }
  }

  handleBodyKeyDown(event) {
    if (event.which === 9) { // TAB key
      this.hideVariants();
      this.hidePicker();
    }
    if (event.which === 27) { // ESC key
      this.hidePicker();
      this.hideVariants();
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
    let month = this.props.dateRange[0] || new Date();
    this.reactDayPicker.showMonth(month);
    this.setState({ showPicker: true, showVariants: false });
  }

  hidePicker() {
    if(this.props.dateRange[0] && !this.props.dateRange[1]) {
      this.props.onChange([ null, null ]);
    }
    this.setState({ showPicker: false });
  }

  showVariants() {
    this.setState({ showVariants: true, showPicker: false });
  }

  hideVariants() {
    this.setState({ showVariants: false });
  }

  handleVariantsButtonClick() {
    if (this.state.showVariants) {
      return this.hideVariants();
    }
    return this.showVariants();
  }

  handleVariantSelect(range) {
    this.hideVariants();
    this.setState({ enteredTo: range[1] });
    this.props.onChange(range);
  }

  handleInputFocus() {
    this.showPicker();
  }

  handleInputClick() {
    this.showPicker();
  }

  handleDayMouseEnter(day) {
    let from = this.props.dateRange[0];
    let to = this.props.dateRange[1];

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
      hideVariantsButton,
      showToTop,
      showToLeft,
      ...restProps
    } = this.props;

    let from = this.props.dateRange[0];
    let to = this.props.dateRange[1];
    let { enteredTo, error } = this.state;
    let momentCompatibleDateFormat = dateFormat.replace(/d/g, 'D').replace(/y/g, 'Y');

    let showToTopClassName = showToTop ? 'opuscapita_date-range-input__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-range-input__picker-container--to-left' : '';

    let pickerElement = (
      <DayPicker
        dayPickerRef={el => (this.reactDayPicker = el)}
        className="Range"
        numberOfMonths={ 2 }
        fromMonth={ from }
        selectedDays={ [from, { from, to: enteredTo }] }
        disabledDays={ { before: from } }
        modifiers={ { start: from, end: enteredTo } }
        onDayClick={ this.handleDayClick }
        onDayMouseEnter={ this.handleDayMouseEnter }
        hideTodayButton={true}
        locale={locale}
      />
    );

    let variantsElement = hideVariantsButton ? null : (
      <DateRangeVariants onChange={this.handleVariantSelect} locale={locale} />
    );

    let pickerMotionElement = (
      <Motion
        defaultStyle={{ x: this.state.showPicker ? 1 : 0 }}
        style={{ x: this.state.showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >{interpolatedStyle => (
          <div
            className={`opuscapita_date-range-input__picker-container ${showToTopClassName} ${showToLeftClassName}`}
            style={{
              maxHeight: `${interpolatedStyle.x * 640}px`,
              opacity: easeOutCubic(interpolatedStyle.x)
            }}
          >
            {pickerElement}
          </div>
      )}</Motion>
    );

    let variantsMotionElement = hideVariantsButton ? null : (
      <Motion
        defaultStyle={{ x: this.state.showVariants ? 1 : 0 }}
        style={{ x: this.state.showVariants ? spring(1, springPreset) : spring(0, springPreset) }}
      >{interpolatedStyle => (
          <div
            className={`
              opuscapita_date-range-input__variants-container
              ${showToTop ? 'opuscapita_date-range-input__variants-container--to-top' : ''}
            `}
            style={{
              maxHeight: `${interpolatedStyle.x * 640}px`,
              opacity: easeOutCubic(interpolatedStyle.x)
            }}
          >
            {variantsElement}
          </div>
      )}</Motion>
    );

    let inputValue = (from && to) ?
      `${moment(from).format(momentCompatibleDateFormat)}  —  ${moment(to).format(momentCompatibleDateFormat)}` :
      '';

    let resetButton = (
      <InputAddonButton className="opuscapita_date-range-input__reset-btn" tabIndex="-1" onClick={this.reset}>
        ✕
      </InputAddonButton>
    );

    let variantsButton = hideVariantsButton ? null : (
      <button
        type="button"
        className="btn btn-default opuscapita_date-range-input__variants-btn"
        tabIndex="-1"
        onClick={this.handleVariantsButtonClick}
      >
        <span className="caret"></span>
      </button>
    );

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita_date-range-input ${className}`}
        disabled={disabled}
        { ...restProps }
      >
        <div className="opuscapita_date-range-input__input-field-container">
          <input
            type="text"
            className="opuscapita_date-range-input__input-field form-control"
            onFocus={this.handleInputFocus}
            onClick={this.handleInputClick}
            placeholder={placeholder}
            value={inputValue}
            onChange={() => {}}
            style={{
              paddingRight: `${3}ch`,
              width: `${dateFormat.length * 2 + 7}ch`
            }}
          />
          {resetButton}
          {pickerMotionElement}
        </div>
        {variantsMotionElement}
        {variantsButton}
      </div>
    );
  }
}

DateRangeInput.propTypes = propTypes;
DateRangeInput.defaultProps = defaultProps;
