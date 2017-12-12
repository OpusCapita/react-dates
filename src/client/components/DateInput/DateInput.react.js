import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './DateInput.less';
import DateInputField from '../DateInputField';
import DayPicker from '../DayPicker';
import DateVariants from '../DateVariants';
import InputAddonButton from '../InputAddonButton';
import { spring, presets, Motion } from 'react-motion';
import assign from 'lodash/assign';
import moment from '../moment';
import getMessage from '../translations';
import isEqual from 'lodash/isEqual';
import { Portal } from 'react-portal';
import { getCoords } from '../utils/get-coords';

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
  showVariants: PropTypes.bool,
  tabIndex: PropTypes.number,
  value: PropTypes.object,
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
  onFocus: () => {},
  onChange: () => {},
  showToLeft: false,
  showToTop: false,
  tabIndex: 0,
  value: null,
  variants: [
    {
      getLabel: (locale) => getMessage(locale, 'yesterday'),
      getValue: (locale) => moment().locale(locale).subtract(1, 'days').toDate()
    },
    {
      getLabel: (locale) => getMessage(locale, 'today'),
      getValue: (locale) => moment().locale(locale).toDate()
    },
    {
      getLabel: (locale) => getMessage(locale, 'tomorrow'),
      getValue: (locale) => moment().locale(locale).add(1, 'days').toDate()
    }
  ]
};

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showPicker: false,
      showVariants: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
    document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      let month = nextProps.value || new Date();
      if (this.reactDayPicker) {
        this.reactDayPicker.showMonth(month);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.error !== nextState.error ||
      this.state.showPicker !== nextState.showPicker ||
      this.state.showVariants !== nextState.showVariants ||

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

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
    document.body.removeEventListener('keydown', this.handleBodyKeyDown);
  }

  handleDayClick = day => {
    this.setState({ showPicker: false });
    this.handleDateChange(day);
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
    if (event.which === 9) {
      this.hideVariants();
      this.hidePicker();
    }
    if (event.which === 27) { // ESC key
      this.hideVariants();
      this.hidePicker();
    }
  };

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

  handleVariantSelect = value => {
    this.hideVariants();
    this.handleDateChange(value);
  };

  handleError = error => {
    this.setState({ error });
  };

  handleDateChange = value => {
    this.props.onChange(value);
    this.setState({ error: null });
  };

  showPicker() {
    let month = this.props.value || new Date();
    this.reactDayPicker.showMonth(month);
    this.hideVariants();
    this.setState({ showPicker: true });
  }

  hidePicker() {
    this.setState({ showPicker: false });
  }

  handleInputFocus = event => {
    this.props.onFocus(event);
    this.showPicker();
  };

  handleInputClick = () => {
    if (!this.props.disabled) {
      this.showPicker();
    }
  };

  handleReset = () => {
    this.setState({ error: null });
    this.dateInputField.clear();
    this.hidePicker();
    this.props.onChange(null);
  };

  handleBlur = e => {
    if (this.state.error) {
      this.handleReset();
    }
    this.props.onBlur(e);
  };

  render() {
    let {
      className,
      dateFormat,
      disabled,
      isValid,
      locale,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      showToLeft,
      showToTop,
      tabIndex,
      value,
      variants,
      ...restProps
    } = this.props;

    let { error, showPicker, showVariants } = this.state;

    let momentCompatibleDateFormat = dateFormat.replace(/d/g, 'D').replace(/y/g, 'Y');

    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let dayPickerSpecificProps = splittedProps[1];

    let pickerElement = (
        <DayPicker
          dayPickerRef={el => (this.reactDayPicker = el)}
          locale={locale}
          month={value}
          selectedDays={value}
          tabIndex={-1}
          fixedWeeks={true}
          onChange={this.handleDateChange}
          onDayClick={this.handleDayClick}
          { ...dayPickerSpecificProps }
        />
    );

    let hasErrorClassName = (error === null && isValid) ? '' : 'has-error';
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
              className={`opuscapita_date-input__picker-container`}
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

    let resetButton = (
      <InputAddonButton
        className="opuscapita_date-input__reset-btn"
        tabIndex="-1"
        onClick={this.handleReset}
        disabled={disabled}
      >
        ✕
      </InputAddonButton>
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

    let variantsMotionElement = variantsElement ? (
      <Motion
        defaultStyle={{ x: showVariants ? 1 : 0 }}
        style={{ x: showVariants ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <Portal isOpened={true}>
            <div
              ref={ref => (this.variantsContainer = ref)}
              className={`opuscapita_date-input__variants-container`}
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

    let variantsButton = (typeof variants !== 'undefined' && variants.length) ? (
      <button
        type="button"
        className="btn btn-default opuscapita_date-input__variants-btn"
        disabled={disabled}
        tabIndex="-1"
        onClick={this.handleVariantsButtonClick}
      >
        <span className="caret"></span>
      </button>
    ) : null;

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita_date-input form-control ${hasErrorClassName} ${className}`}
      >
        <div className={`opuscapita_date-input__input-container`}>
          <DateInputField
            dateFormat={momentCompatibleDateFormat}
            disabled={disabled}
            onBlur={this.handleBlur}
            onChange={this.handleDateChange}
            onClick={this.handleInputClick}
            onError={this.handleError}
            onFocus={this.handleInputFocus}
            onRef={dateInputField => (this.dateInputField = dateInputField)}
            tabIndex={tabIndex}
            value={value}
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

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;
