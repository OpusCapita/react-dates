import React, { Component, PropTypes } from 'react';
import './DateRangeInput.less';
import DayPicker from '../DayPicker';
import InputAddonButton from '../InputAddonButton';
import DateRangeVariants from '../DateRangeVariants';
import { DateUtils } from 'react-day-picker';
import moment from 'moment';
import { spring, presets, Motion} from 'react-motion';
let springPreset = presets.gentle;

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
  dateFormat: 'DD/MM/YYYY',
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
    if (event.which === 9) {
      this.hideVariants();
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
    this.setState({ showPicker: true, showVariants: false });
  }

  hidePicker() {
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

    let duration = (to && from) && to.getTime() - from.getTime();
    console.log('d', duration);

    let showToTopClassName = showToTop ? 'opuscapita_date-range-input__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-range-input__picker-container--to-left' : '';

    let pickerElement = (
      <DayPicker
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
      <DateRangeVariants onChange={this.handleVariantSelect} />
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
              opacity: interpolatedStyle.x
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
              opacity: interpolatedStyle.x
            }}
          >
            {variantsElement}
          </div>
      )}</Motion>
    );

    let inputValue = (from && to) ?
      `${moment(from).format(dateFormat)}  —  ${moment(to).format(dateFormat)}` :
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
            onFocus={this.handleInputFocus.bind(this)}
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
