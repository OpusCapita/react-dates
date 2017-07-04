import React, { Component, PropTypes } from 'react';
import './DateRangeInput.less';
import DayPicker from '../DayPicker';
import InputAddonButton from '../InputAddonButton';
import DateVariants from '../DateVariants';
import DateInputField from '../DateInputField';
import { DateUtils } from 'react-day-picker';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';
import moment from '../utils/momentInit';
import { spring, presets, Motion } from 'react-motion';
import getMessage from '../translations';

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
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  locale: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
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
  locale: 'en-GB',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: null,
  showToLeft: false,
  showToTop: false,
  tabIndex: 0,
  value: [null, null],
  variants: [
    {
      getLabel: (locale) => getMessage(locale, 'previousWeek'),
      getValue: (locale) => [
        moment().locale(locale).subtract(7, 'days').startOf('week').toDate(),
        moment().locale(locale).subtract(7, 'days').endOf('week').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'thisWeek'),
      getValue: (locale) => [
        moment().locale(locale).startOf('week').toDate(),
        moment().locale(locale).endOf('week').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'nextWeek'),
      getValue: (locale) => [
        moment().locale(locale).add(7, 'days').startOf('week').toDate(),
        moment().locale(locale).add(7, 'days').endOf('week').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'previousMonth'),
      getValue: (locale) => [
        moment().locale(locale).subtract(1, 'month').startOf('month').toDate(),
        moment().locale(locale).subtract(1, 'month').endOf('month').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'last30Days'),
      getValue: (locale) => [
        moment().locale(locale).subtract(30, 'days').toDate(),
        moment().locale(locale).toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'thisMonth'),
      getValue: (locale) => [
        moment().locale(locale).startOf('month').toDate(),
        moment().locale(locale).endOf('month').toDate()
      ]
    },
    {
      getLabel: (locale) => getMessage(locale, 'nextMonth'),
      getValue: (locale) => [
        moment().locale(locale).add(1, 'month').startOf('month').toDate(),
        moment().locale(locale).add(1, 'month').endOf('month').toDate()
      ]
    }
  ]
};

export default
class DateRangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleReset = this.handleReset.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleDayMouseLeave = this.handleDayMouseLeave.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
    this.handleVariantsButtonClick = this.handleVariantsButtonClick.bind(this);
    this.handleVariantSelect = this.handleVariantSelect.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value[0] !== nextProps.value[0]) {
      let month = nextProps.value[0] || new Date();
      this.reactDayPicker.showMonth(month);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.state.enteredTo, nextState.enteredTo) ||
      this.state.showPicker !== nextState.showPicker ||
      this.state.showVariants !== nextState.showVariants ||

      this.props.className !== nextProps.className ||
      this.props.dateFormat !== nextProps.dateFormat ||
      this.props.disabled !== nextProps.disabled ||
      this.props.isValid !== nextProps.isValid ||
      this.props.locale !== nextProps.locale ||
      this.props.placeholder !== nextProps.placeholder ||
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

  handleRangeChange(range) {
    console.log('handleRangeChange:', range);
    this.setState({ enteredTo: null });
    let normalizedRange = this.normalizeRange(range);
    this.props.onChange(normalizedRange);
  }

  handleDayClick(day) {
    let from = this.props.value[0];
    let to = this.props.value[1];

    if (DateUtils.isSameDay(day, from)) {
      this.handleReset();
      return;
    }

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

  handleVariantsButtonClick() {
    if (this.state.showVariants) {
      return this.hideVariants();
    }
    return this.showVariants();
  }

  handleVariantSelect(range) {
    this.hideVariants();
    this.setState({ enteredTo: range[1] });
    this.handleRangeChange(range);
  }

  handleInputFocus(event) {
    this.props.onFocus(event);
    this.showPicker(event);
  }

  handleInputClick() {
    this.showPicker();
  }

  handleDayMouseEnter(day) {
    let from = this.props.value[0];
    let to = this.props.value[1];

    if (!isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  }

  handleDayMouseLeave(day) {
    this.setState({ enteredTo: null });
  }

  handleReset() {
    this.setState(initialState);
    this.handleRangeChange([null, null]);
  }

  render() {
    let {
      className,
      dateFormat,
      value, // eslint-disable-line no-unused-vars
      disabled,
      locale,
      isValid,
      onBlur,
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      placeholder,
      tabIndex,
      showToTop,
      showToLeft,
      variants,
      ...restProps
    } = this.props;
    console.log('value:::::', value);
    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let commonProps = splittedProps[0];
    let dayPickerSpecificProps = splittedProps[1];

    let from = this.props.value[0];
    let to = this.props.value[1];
    let { enteredTo } = this.state;
    let momentCompatibleDateFormat = dateFormat.replace(/d/g, 'D').replace(/y/g, 'Y');

    let showToTopClassName = showToTop ? 'opuscapita_date-range-input__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-range-input__picker-container--to-left' : '';

    let pickerElement = (
      <DayPicker
        className="Range"
        disabledDays={{ before: from }}
        fixedWeeks={true}
        month={from}
        hideTodayButton={true}
        locale={locale}
        modifiers={ { start: from, end: enteredTo || to }}
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

    let showVariants = typeof variants === 'undefined' || (variants && variants.length);
    let variantsElement = null;

    if (showVariants) {
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
      `${moment(from).format(momentCompatibleDateFormat)} — ${moment(to).format(momentCompatibleDateFormat)}` :
      '';

    let resetButton = (
      <InputAddonButton
        className="opuscapita_date-range-input__reset-btn"
        tabIndex="-1"
        onClick={this.handleReset}
        disabled={disabled}
      >
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
        className={`opuscapita_date-range-input form-control ${className}`}
        { ...commonProps }
      >
        <div className={`opuscapita_date-range-input__input-field-container form-control ${hasErrorClassName}`}>
          <DateInputField
            className="opuscapita_date-range-input__input-field"
            dateFormat={momentCompatibleDateFormat}
            disabled={disabled}
            onBlur={onBlur}
            onChange={(date) => this.handleRangeChange([date, value[1]])}
            onClick={this.handleInputClick}
            onError={this.handleError}
            onFocus={this.handleInputFocus}
            onRef={dateInputField => (this.dateInputFieldFrom = dateInputField)}
            tabIndex={tabIndex}
            value={value[0]}
          />
          <div className="opuscapita_date-range-input__dash">―</div>
          <DateInputField
            className="opuscapita_date-range-input__input-field"
            dateFormat={momentCompatibleDateFormat}
            disabled={disabled}
            onBlur={onBlur}
            onChange={(date) => this.handleRangeChange([value[0], date])}
            onClick={this.handleInputClick}
            onError={this.handleError}
            onFocus={this.handleInputFocus}
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
