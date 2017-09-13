import React, { PropTypes, Component } from 'react';
import './DatePicker.less';
import DayPicker from '../DayPicker';
import { spring, presets, Motion } from 'react-motion';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';
import Portal from 'react-portal';
import getCoords from '../utils/get-coords';

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
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  showToLeft: PropTypes.bool,
  showToTop: PropTypes.bool,
  tabIndex: PropTypes.number,
  value: PropTypes.object
};

let defaultProps = {
  className: '',
  disabled: false,
  locale: 'en-GB',
  onChange: () => {},
  showToLeft: false,
  showToTop: false,
  tabIndex: 0,
  value: null
};

export default
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    };
    this.handlePortalClose = this.handlePortalClose.bind(this);
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleBodyKeyDown);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.showPicker !== nextState.showPicker ||
      this.props.className !== nextProps.className ||
      this.props.disabled !== nextProps.disabled ||
      this.props.locale !== nextProps.locale ||
      this.props.showToLeft !== nextProps.showToLeft ||
      this.props.showToTop !== nextProps.showToTop ||
      this.props.tabIndex !== nextProps.tabIndex ||
      !isEqual(this.props.value, nextProps.value)
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handlePortalClose);
  }

  handlePortalClose(event) {
    this.hidePicker();
  }

  handleDayClick(day) {
    this.handleDateChange(day);
    this.setState({ showPicker: false });
  }

  handleToggleClick() {
    if (this.state.showPicker) {
      this.hidePicker();
    } else {
      this.showPicker();
    }
  }

  handleDateChange(value) {
    this.props.onChange(value);
  }

  handleBodyKeyDown(event) {
    if (event.which === 9) {
      this.hidePicker();
    }
    if (event.which === 27) { // ESC key
      this.hidePicker();
    }
  }

  showPicker() {
    this.setState({ showPicker: true });
  }

  hidePicker() {
    this.setState({ showPicker: false });
  }

  render() {
    let {
      className,
      disabled,
      locale,
      onChange, // eslint-disable-line no-unused-vars
      showToLeft,
      showToTop,
      tabIndex,
      value,
      ...restProps
    } = this.props;

    let { showPicker } = this.state;

    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let commonProps = splittedProps[0];
    let dayPickerSpecificProps = splittedProps[1];

    let pickerElement = (
      <DayPicker
        dayPickerRef={el => (this.reactDayPicker = el)}
        locale={locale}
        month={value}
        selectedDays={value}
        tabIndex={-1}
        fixedWeeks={true}
        onDayClick={this.handleDayClick}
        onChange={this.handleDateChange}
        { ...dayPickerSpecificProps }
      />
    );

    let { top, left } = getCoords(this.container, showToTop, showToLeft);

    let pickerMotionElement = (
      <Motion
        defaultStyle={{ x: showPicker ? 1 : 0 }}
        style={{ x: showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <Portal
            isOpened={true}
            closeOnOutsideClick={true}
            onClose={this.handlePortalClose}
          >
            <div
              ref={ref => { this.datePickerRef = ref }}
              className={`opuscapita_date-picker__picker-container`}
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

    return (
      <div
        className={`opuscapita_date-picker ${className}`}
        ref={el => (this.container = el)}
        { ...commonProps }
      >
        <button
          className="opuscapita_date-picker__toggle-picker btn btn-default"
          disabled={disabled}
          onClick={this.handleToggleClick}
          tabIndex={tabIndex}
          type="button"
        >
          <i className="fa fa-calendar" />
        </button>
        {pickerMotionElement}
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;
