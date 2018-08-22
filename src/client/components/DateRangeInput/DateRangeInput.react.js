import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './DateRangeInput.less';
import DayPicker from '../DayPicker';
import InputAddonButton from '../InputAddonButton';
import DateVariants from '../DateVariants';
import DateInputField from '../DateInputField';
import isEqual from 'lodash/isEqual';
import dayjs from '../../dayjs';
import { spring, presets, Motion } from 'react-motion';
import getMessage from '../translations';
import { Portal } from 'react-portal';
import { getCoords, splitProps, zeroTime } from '../utils';

let springPreset = presets.gentle;
let easeOutCubic = (t) => (--t) * t * t + 1; // eslint-disable-line no-param-reassign

let initialState = {
  enteredTo: null,
  showPicker: false,
  showVariants: false,
  error: false,
  focused: false
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
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  locale: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  showToLeft: PropTypes.bool,
  showToTop: PropTypes.bool,
  tabIndex: PropTypes.number,
  value: PropTypes.array,
  variants: PropTypes.arrayOf(PropTypes.shape({
    getLabel: PropTypes.func,
    getValue: PropTypes.func
  }))
};

let defaultProps = {
  className: '',
  dateFormat: 'dd/MM/yyyy',
  disabled: false,
  isValid: true,
  locale: 'en',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  showToLeft: false,
  showToTop: false,
  tabIndex: 0,
  value: [null, null],
  variants: [
    {
      getLabel: (locale) => getMessage(locale, 'previousWeek'),
      // TODO remove ternary operator below. Monitor this issue: https://github.com/iamkun/dayjs/issues/215
      getValue: (locale) => locale === 'en' ? [
        dayjs().locale(locale).subtract(7, 'days').startOf('week').toDate(),
        dayjs().locale(locale).subtract(7, 'days').endOf('week').toDate()
      ] : [
        dayjs().locale(locale).subtract(7, 'days').startOf('week').add(1, 'day').toDate(),
        dayjs().locale(locale).subtract(7, 'days').endOf('week').add(1, 'day').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'thisWeek'),
      // TODO remove ternary operator below. Monitor this issue: https://github.com/iamkun/dayjs/issues/215
      getValue: (locale) => locale === 'en' ? [
        dayjs().locale(locale).startOf('week').toDate(),
        dayjs().locale(locale).endOf('week').toDate()
      ] : [
        dayjs().locale(locale).startOf('week').add(1, 'day').toDate(),
        dayjs().locale(locale).endOf('week').add(1, 'day').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'nextWeek'),
      // TODO remove ternary operator below. Monitor this issue: https://github.com/iamkun/dayjs/issues/215
      getValue: (locale) => locale === 'en' ? [
        dayjs().locale(locale).add(7, 'days').startOf('week').toDate(),
        dayjs().locale(locale).add(7, 'days').endOf('week').toDate()
      ] : [
        dayjs().locale(locale).add(7, 'days').startOf('week').add(1, 'day').toDate(),
        dayjs().locale(locale).add(7, 'days').endOf('week').add(1, 'day').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'previousMonth'),
      getValue: (locale) => [
        dayjs().locale(locale).subtract(1, 'month').startOf('month').toDate(),
        dayjs().locale(locale).subtract(1, 'month').endOf('month').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'last30Days'),
      getValue: (locale) => [
        dayjs().locale(locale).subtract(30, 'days').toDate(),
        dayjs().locale(locale).toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'thisMonth'),
      getValue: (locale) => [
        dayjs().locale(locale).startOf('month').toDate(),
        dayjs().locale(locale).endOf('month').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'nextMonth'),
      getValue: (locale) => [
        dayjs().locale(locale).add(1, 'month').startOf('month').toDate(),
        dayjs().locale(locale).add(1, 'month').endOf('month').toDate()
      ]
    }
  ]
};

export default
class DateRangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value[0] !== nextProps.value[0]) {
      let month = nextProps.value[0] || new Date();
      if (this.reactDayPicker) {
        this.reactDayPicker.showMonth(month);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.state.enteredTo, nextState.enteredTo) ||
      this.state.showPicker !== nextState.showPicker ||
      this.state.showVariants !== nextState.showVariants ||
      this.state.error !== nextState.error ||
      this.state.focused !== nextState.focused ||

      this.props.className !== nextProps.className ||
      this.props.dateFormat !== nextProps.dateFormat ||
      this.props.disabled !== nextProps.disabled ||
      this.props.isValid !== nextProps.isValid ||
      this.props.locale !== nextProps.locale ||
      this.props.showToLeft !== nextProps.showToLeft ||
      this.props.showToTop !== nextProps.showToTop ||
      this.props.tabIndex !== nextProps.tabIndex ||
      !isEqual(this.props.value, nextProps.value) ||
      !isEqual(this.props.variants, nextProps.variants)
    );
  }

  componentWillUpdate(nextProps, nextState) {
    let rangeChanged = (this.state.from !== nextState.from) || (this.state.to !== nextState.to);
    let rangeFilled = nextState.from !== null && nextState.to !== null;
    if (rangeChanged && rangeFilled) {
      this.handleRangeChange([nextState.from, nextState.to]);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
    document.body.removeEventListener('keydown', this.handleBodyKeyDown);
  }

  normalizeRange(range) {
    let from = range[0];
    let to = range[1];
    let fromGreaterThanTo = (from && to) && (from.getTime() > to.getTime());
    if (fromGreaterThanTo) {
      return [to, from];
    }
    return range;
  }

  handleRangeChange = range => {
    this.setState({ enteredTo: null, error: false });
    let normalizedRange = this.normalizeRange(range);
    this.props.onChange(normalizedRange);
  };

  handleDayClick = dayValue => {
    const day = zeroTime(dayValue);

    let from = this.props.value[0];
    let to = this.props.value[1];

    if (isSelectingFirstDay(from, to, day)) {
      this.handleRangeChange([day, null]);
      this.setState({
        enteredTo: null
      });
    } else {
      this.handleRangeChange([from, day]);
      this.setState({
        enteredTo: day,
        showPicker: false
      });
    }
  };

  handleBodyClick = event => {
    let clickedOutside = (
      !this.container.contains(event.target) &&
      !this.pickerContainer.contains(event.target)
    );

    if (this.variantsContainer) {
      clickedOutside = clickedOutside && !this.variantsContainer.contains(event.target);
    }

    if (clickedOutside) {
      this.hideVariants();
      this.hidePicker();
    }
  };

  handleBodyKeyDown = event => {
    if (event.which === 9) { // TAB key
      this.hideVariants();
      this.hidePicker();
    }
    if (event.which === 27) { // ESC key
      this.hidePicker();
      this.hideVariants();
    }
  };

  showPicker() {
    let month = this.props.value[0] || new Date();
    this.reactDayPicker.showMonth(month);
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

  handleVariantsButtonClick = () => {
    if (this.state.showVariants) {
      return this.hideVariants();
    }
    return this.showVariants();
  };

  handleVariantSelect = range => {
    this.hideVariants();
    this.setState({ enteredTo: range[1] });
    this.handleRangeChange(range);
  };

  handleFocus = (e, inputName) => {
    this.props.onFocus(e, inputName);
    this.showPicker();

    this.setState({ focused: true });
  };

  handleBlur = (e, inputName) => {
    this.props.onBlur(e, inputName);
    this.hideVariants();

    this.setState({ focused: false });
  };

  handleError = () => {
    this.setState({ error: true });
  };

  handleInputClick = () => {
    if (!this.props.disabled) {
      this.showPicker();
    }
  };

  handleDayMouseEnter = day => {
    let from = this.props.value[0];
    let to = this.props.value[1];

    if (!isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  };

  handleDayMouseLeave = day => {
    this.setState({ enteredTo: null });
  };

  handleReset = () => {
    this.setState(initialState);
    this.handleRangeChange([null, null]);
    this.dateInputFieldTo.clear();
    this.dateInputFieldFrom.clear();
  };

  render() {
    let {
      className,
      dateFormat,
      value, // eslint-disable-line no-unused-vars
      disabled,
      locale,
      isValid,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      tabIndex,
      showToTop,
      showToLeft,
      variants,
      ...restProps
    } = this.props;

    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let commonProps = splittedProps[0];
    let dayPickerSpecificProps = splittedProps[1];

    let from = this.props.value[0];
    let to = this.props.value[1];
    let { enteredTo, error, focused, showPicker, showVariants } = this.state;
    let dayjsCompatibleDateFormat = dateFormat.replace(/d/g, 'D').replace(/y/g, 'Y');

    let pickerElement = (
      <DayPicker
        className="Range"
        disabledDays={{ before: from }}
        fixedWeeks={true}
        month={from}
        hideTodayButton={true}
        locale={locale}
        modifiers={{ start: from, end: enteredTo || to }}
        numberOfMonths={2}
        isRange={true}
        onChange={this.handleRangeChange}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        selectedDays={[from, { from, to: enteredTo || to }]}
        dayPickerRef={el => (this.reactDayPicker = el)}
        {...dayPickerSpecificProps}
      />
    );

    let variantsElement = null;

    if (typeof variants !== 'undefined' && variants.length) {
      let translatedVariants = variants.map(variant => ({
        ...variant,
        label: variant.getLabel(locale)
      }));

      variantsElement = (
        <DateVariants
          onChange={this.handleVariantSelect}
          locale={locale}
          variants={translatedVariants}
        />
      );
    }

    let { top, left, alwaysLeft } = getCoords(this.container, showToTop, showToLeft);

    let pickerMotionElement = (
      <Motion
        defaultStyle={{ x: showPicker ? 1 : 0 }}
        style={{ x: showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <Portal isOpened={true}>
            <div
              ref={ref => (this.pickerContainer = ref)}
              className={`opuscapita_date-range-input__picker-container`}
              style={{
                maxHeight: `${interpolatedStyle.x * 640}px`,
                opacity: easeOutCubic(interpolatedStyle.x),
                top: `${top}px`,
                left: `${left}px`,
                transform: `translate(${showToLeft ? '-100%' : '0'}, ${showToTop ? '-100%' : '0'})`
              }}
            >
              {pickerElement}
            </div>
          </Portal>
        )}
      </Motion>
    );

    let variantsMotionElement = variantsElement ? (
      <Motion
        defaultStyle={{ x: showVariants ? 1 : 0 }}
        style={{ x: showVariants ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <Portal isOpened={true}>
            <div
              ref={ref => (this.variantsContainer = ref)}
              className={`opuscapita_date-range-input__variants-container`}
              style={{
                maxHeight: `${interpolatedStyle.x * 640}px`,
                opacity: easeOutCubic(interpolatedStyle.x),
                top: `${top}px`,
                left: `${alwaysLeft}px`,
                transform: `translate(-100%, ${showToTop ? '-100%' : '0'})`
              }}
            >
              {variantsElement}
            </div>
          </Portal>
        )}
      </Motion>
    ) : null;

    let resetButton = (
      <InputAddonButton
        className="opuscapita_date-range-input__reset-btn"
        tabIndex="-1"
        onClick={this.handleReset}
        disabled={disabled}
        title={getMessage(locale, 'clearValue')}
      >
        ✕
      </InputAddonButton>
    );

    let variantsButton = (typeof variants !== 'undefined' && variants.length) ? (
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

    let hasErrorClassName = (isValid && !error) ? '' : 'has-error';
    let focusedClassName = focused ? 'opuscapita_date-range-input__input-field-container--focused' : '';

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita_date-range-input form-control ${className}`}
        { ...commonProps }
      >
        <div
          className={`
            opuscapita_date-range-input__input-field-container
            form-control
            ${hasErrorClassName}
            ${focusedClassName}
          `}
        >
          <DateInputField
            className="opuscapita_date-range-input__input-field opuscapita_date-range-input__left-input-field"
            dateFormat={dayjsCompatibleDateFormat}
            disabled={disabled}
            error={error}
            onBlur={(e) => this.handleBlur(e, 'from')}
            onFocus={(e) => this.handleFocus(e, 'from')}
            onChange={(date) => this.handleRangeChange([date, value[1]])}
            onClick={this.handleInputClick}
            onError={this.handleError}
            onRef={dateInputField => (this.dateInputFieldFrom = dateInputField)}
            tabIndex={tabIndex}
            value={value[0]}
          />
          <div className="opuscapita_date-range-input__dash">―</div>
          <DateInputField
            className="opuscapita_date-range-input__input-field opuscapita_date-range-input__right-input-field"
            dateFormat={dayjsCompatibleDateFormat}
            disabled={disabled}
            error={error}
            onBlur={(e) => this.handleBlur(e, 'to')}
            onFocus={(e) => this.handleFocus(e, 'to')}
            onChange={(date) => this.handleRangeChange([value[0], date])}
            onClick={this.handleInputClick}
            onError={this.handleError}
            onRef={dateInputField => (this.dateInputFieldTo = dateInputField)}
            tabIndex={tabIndex}
            value={value[1]}
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

// handleDateChange = (date, modifiers, captionIndex) => {
//   if (modifiers.disabled) {
//     return null;
//   }

//   if (this.props.isRange) {
//     let range = this.props.selectedDays[1];
//     let fromChanged = captionIndex === 0;
//     let toChanged = captionIndex === 1;

//     if (fromChanged) {
//       this.props.onChange([date, range.to]);
//     }

//     if (toChanged) {
//       this.props.onChange([range.from, date]);
//     }
//   } else {
//     this.props.onChange(date);
//   }
// };
