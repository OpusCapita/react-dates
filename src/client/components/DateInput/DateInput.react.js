import React, { Component, PropTypes } from 'react';
import './DateInput.less';
import DateInputField from '../DateInputField';
import DayPicker from '../DayPicker';
import InputAddonButton from '../InputAddonButton';
import { spring, presets, Motion} from 'react-motion';
import assign from 'lodash/assign';
let springPreset = presets.gentle;
let easeOutCubic = (t) => (--t)*t*t+1;

function splitProps(props, specificPropNames = []) {
  let result = Object.keys(props).reduce((result, propName) => {
    let isPropSpecific = specificPropNames.indexOf(propName) >= 0;
    if(isPropSpecific) {
      let commonProps = assign({}, result[0]);
      let specificProps = assign({}, result[1], { [propName]: props[propName] });
      return [commonProps, specificProps];
    }

    let commonProps = assign({}, result[0], { [propName]: props[propName] });
    let specificProps = assign({}, result[1]);
    return [commonProps, specificProps];
  }, [{}, {}]);

  return result;
};

let propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  showToTop: PropTypes.bool,
  showToLeft: PropTypes.bool,
  onChange: PropTypes.func,
  onHide: PropTypes.func,
  tabIndex: PropTypes.number,
  isValid: PropTypes.bool
};

let defaultProps = {
  className: '',
  date: new Date(),
  dateFormat: 'dd/MM/yyyy',
  disabled: false,
  locale: 'en-GB',
  showToTop: false,
  showToLeft: false,
  onChange: () => {},
  onHide: () => {},
  tabIndex: 0,
  isValid: true
};

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showPicker: false
    };
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.reset = this.reset.bind(this);
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
    if(this.props.date !== nextProps.date) {
      let month = nextProps.date || new Date();
      this.reactDayPicker.showMonth(month);
    }
  }

  handleBodyClick(event) {
    let clickedOutside = !this.container.contains(event.target);
    if (clickedOutside) {
      return this.hidePicker();
    }
  }

  handleBodyKeyDown(event) {
    if(event.which === 9) {
      this.hidePicker();
    }
    if (event.which === 27) { // ESC key
      this.hidePicker();
    }
  }

  handleError(error) {
    this.setState({ error });
  }

  handleDateChange(date) {
    console.log('!!!!dddddd:', date);
    this.props.onChange(date);
    this.setState({ error: null });
  }

  showPicker() {
    let month = this.props.date || new Date();
    this.reactDayPicker.showMonth(month);
    this.setState({ showPicker: true });
  }

  hidePicker() {
    this.setState({ showPicker: false });
  }

  handleInputFocus() {
    this.showPicker();
  }

  handleInputClick() {
    this.showPicker();
  }

  reset() {
    this.hidePicker();
    this.props.onChange(null);
  }

  render() {
    let {
      className,
      date,
      dateFormat,
      disabled,
      isValid,
      locale,
      showToTop,
      showToLeft,
      onChange,
      onHide,
      tabIndex,
      ...restProps
    } = this.props;

    let { error } = this.state;

    let momentCompatibleDateFormat = dateFormat.replace(/d/g, 'D').replace(/y/g, 'Y');

    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let commonProps = splittedProps[0];
    let dayPickerSpecificProps = splittedProps[1];

    let pickerElement = (
      <DayPicker
        dayPickerRef={el => (this.reactDayPicker = el)}
        locale={locale}
        month={date}
        selectedDays={date}
        tabIndex={-1}
        fixedWeeks={true}
        onChange={this.handleDateChange}
        { ...dayPickerSpecificProps }
      />
    );

    let showToTopClassName = showToTop ? 'opuscapita_date-input__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-input__picker-container--to-left' : '';
    let hasErrorClassName = (error === null && isValid) ? '' : 'has-error';

    let pickerMotionElement = (
      <Motion
        defaultStyle={{ x: this.state.showPicker ? 1 : 0 }}
        style={{ x: this.state.showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <div
            className={`opuscapita_date-input__picker-container ${showToTopClassName} ${showToLeftClassName}`}
            style={{
              maxHeight: `${interpolatedStyle.x * 640}px`,
              opacity: easeOutCubic(interpolatedStyle.x)
            }}
          >
            {pickerElement}
          </div>
        )}
      </Motion>
    );

    let resetButton = (
      <InputAddonButton className="opuscapita_date-input__reset-btn" tabIndex="-1" onClick={this.reset}>
        ✕
      </InputAddonButton>
    );

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita-date-input form-group ${hasErrorClassName} ${className}`}
      >
        <DateInputField
          date={date}
          dateFormat={momentCompatibleDateFormat}
          onChange={this.handleDateChange}
          onError={this.handleError}
          onFocus={this.handleInputFocus}
          onClick={this.handleInputClick}
        />
        {resetButton}
        {pickerMotionElement}
      </div>
    );
  }
}

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;
