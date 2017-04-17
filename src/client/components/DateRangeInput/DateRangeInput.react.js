import React, { Component, PropTypes } from 'react';
import './DateRangeInput.less';
import DayPicker from '../DayPicker';
import InputAddonButton from '../InputAddonButton';
import DateRangeVariants from '../DateRangeVariants';
import { DateUtils } from 'react-day-picker';
import assign from 'lodash/assign';
import moment from 'moment';
import { spring, presets, Motion } from 'react-motion';
let springPreset = presets.gentle;
let easeOutCubic = (t) => (--t) * t * t + 1; // eslint-disable-line no-param-reassign

function splitProps(props, specificPropNames = []) {
  let result = Object.keys(props).reduce((result, propName) => {
    let isPropSpecific = specificPropNames.indexOf(propName) >= 0;
    if (isPropSpecific) {
      let commonProps = assign({}, result[0]);
      let specificProps = assign({}, result[1], { [propName]: props[propName] });
      return [commonProps, specificProps];
    }

    let commonProps = assign({}, result[0], { [propName]: props[propName] });
    let specificProps = assign({}, result[1]);
    return [commonProps, specificProps];
  }, [{}, {}]);

  return result;
}

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
  isValid: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  positionRight: PropTypes.bool,
  positionTop: PropTypes.bool,
  showToLeft: PropTypes.bool,
  showToTop: PropTypes.bool,
  tabIndex: PropTypes.number,
  variants: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    range: PropTypes.array
  }))
};

let defaultProps = {
  className: '',
  dateFormat: 'dd/MM/yyyy',
  dateRange: [null, null],
  disabled: false,
  isValid: true,
  locale: 'en-GB',
  onChange: () => {},
  placeholder: 'Select date range',
  showToLeft: false,
  showToTop: false,
  tabIndex: 0,
  variants: undefined
};

export default
class DateRangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleReset = this.handleReset.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
    this.handleVariantsButtonClick = this.handleVariantsButtonClick.bind(this);
    this.handleVariantSelect = this.handleVariantSelect.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dateRange[0] !== nextProps.dateRange[0]) {
      let month = nextProps.dateRange[0] || new Date();
      this.reactDayPicker.showMonth(month);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let rangeChanged = (this.state.from !== nextState.from) || (this.state.to !== nextState.to);
    let rangeFilled = nextState.from !== null && nextState.to !== null;
    if (rangeChanged && rangeFilled) {
      this.props.onChange([nextState.from, nextState.to]);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
    document.body.removeEventListener('keydown', this.handleBodyKeyDown);
  }

  handleDayClick(day) {
    let from = this.props.dateRange[0];
    let to = this.props.dateRange[1];

    if (DateUtils.isSameDay(day, from)) {
      this.handleReset();
      return;
    }

    if (isSelectingFirstDay(from, to, day)) {
      this.props.onChange([day, null]);
      this.setState({
        enteredTo: null
      });
    } else {
      this.props.onChange([from, day]);
      this.setState({
        enteredTo: day
      });
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

  handleDateChange(date) {
    this.props.onChange(date);
  }

  showPicker() {
    let month = this.props.dateRange[0] || new Date();
    this.reactDayPicker.showMonth(month);
    this.setState({ showPicker: true, showVariants: false });
  }

  hidePicker() {
    if (this.props.dateRange[0] && !this.props.dateRange[1]) {
      this.props.onChange([null, null]);
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

  handleReset() {
    this.setState(initialState);
    this.props.onChange([null, null]);
  }

  render() {
    let {
      className,
      dateFormat,
      dateRange, // eslint-disable-line no-unused-vars
      disabled,
      locale,
      isValid,
      placeholder,
      tabIndex,
      showToTop,
      showToLeft,
      variants,
      ...restProps
    } = this.props;

    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let commonProps = splittedProps[0];
    let dayPickerSpecificProps = splittedProps[1];

    let from = this.props.dateRange[0];
    let to = this.props.dateRange[1];
    let { enteredTo } = this.state;
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
        { ...dayPickerSpecificProps }
      />
    );

    let showVariants = typeof variants === 'undefined' || (variants && variants.length);
    let variantsElement = (showVariants) ? (
      <DateRangeVariants
        onChange={this.handleVariantSelect}
        locale={locale}
        variants={variants}
      />
    ) : null;

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

    let variantsMotionElement = variantsElement ? (
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
    ) : null;

    let inputValue = (from && to) ?
      `${moment(from).format(momentCompatibleDateFormat)}  —  ${moment(to).format(momentCompatibleDateFormat)}` :
      '';

    let resetButton = (
      <InputAddonButton className="opuscapita_date-range-input__reset-btn" tabIndex="-1" onClick={this.handleReset}>
        ✕
      </InputAddonButton>
    );

    let variantsButton = variantsElement ? (
      <button
        type="button"
        className="btn btn-default opuscapita_date-range-input__variants-btn"
        disabled={disabled}
        tabIndex="-1"
        onClick={this.handleVariantsButtonClick}
      >
        <span className="caret"></span>
      </button>
    ) : null;

    let hasErrorClassName = isValid ? '' : 'has-error';

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita_date-range-input ${className}`}
        { ...commonProps }
      >
        <div className={`opuscapita_date-range-input__input-field-container ${hasErrorClassName}`}>
          <input
            type="text"
            className="opuscapita_date-range-input__input-field form-control"
            disabled={disabled}
            onFocus={this.handleInputFocus}
            onClick={this.handleInputClick}
            placeholder={placeholder}
            tabIndex={tabIndex}
            value={inputValue}
            onChange={() => {}}
            style={{ paddingRight: `${3}ch` }}
          />
          {resetButton}
        </div>
        {pickerMotionElement}
        {variantsMotionElement}
        {variantsButton}
      </div>
    );
  }
}

DateRangeInput.propTypes = propTypes;
DateRangeInput.defaultProps = defaultProps;
