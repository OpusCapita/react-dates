import React, { Component, PropTypes } from 'react';
import './DateInput.less';
import DateInputField from '../DateInputField';
import LocaleUtils from 'react-day-picker/moment';
import DayPicker from '../DayPicker';
import { spring, presets, Motion} from 'react-motion';
import assign from 'lodash/assign';
let springPreset = presets.gentle;

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

export default
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFocused: false,
      showPicker: false
    };
    this.handleBodyClick = this.handleBodyClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  handleBodyClick(event) {
    let clickedOutside = !this.container.contains(event.target);
    if (clickedOutside) {
      return this.hidePicker();
    }
    return undefined;
  }

  handleError(errorCode) {
    this.setState({ error: errorCode });
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
    this.setState({ isFocused: true });
    this.showPicker();
  }

  handleInputBlur() {
    this.setState({ isFocused: false });
    this.hidePicker();
  }

  render() {
    let {
      className,
      date,
      dateFormat,
      disabled,
      locale,
      showToTop,
      showToLeft,
      onChange,
      onClick,
      onHide,
      tabIndex,
      ...restProps
    } = this.props;

    let {
      error,
      isFocused
    } = this.state;

    let splittedProps = splitProps(restProps, Object.keys(DayPicker.propTypes));
    let commonProps = splittedProps[0];
    let dayPickerSpecificProps = splittedProps[1];

    let pickerElement = (
      <DayPicker
        dayPickerRef={el => (this.reactDayPicker = el)}
        locale={locale}
        month={date}
        tabIndex={-1}
        fixedWeeks={true}
        onChange={this.handleDateChange.bind(this)}
        { ...dayPickerSpecificProps }
      />
    );

    let showToTopClassName = showToTop ? 'opuscapita_date-input__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-input__picker-container--to-left' : '';
    let hasErrorClassName = error ? 'opuscapita-date-input--error' : '';
    let focusedClassName = isFocused ? 'opuscapita-date-input--focus' : '';

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
              opacity: interpolatedStyle.x
            }}
          >
            {pickerElement}
          </div>
        )}
      </Motion>
    );

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita-date-input form-control ${hasErrorClassName} ${focusedClassName}`}
      >
        <DateInputField
          date={date}
          dateFormat={dateFormat}
          onChange={this.handleDateChange.bind(this)}
          onError={this.handleError.bind(this)}
          onFocus={this.handleInputFocus.bind(this)}
          onBlur={this.handleInputBlur.bind(this)}
        />
        {pickerMotionElement}
      </div>
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  showToTop: PropTypes.bool,
  showToLeft: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onHide: PropTypes.func,
  tabIndex: PropTypes.number
};
DateInput.defaultProps = {
  className: '',
  date: new Date(),
  dateFormat: 'DD.MM.YYYY',
  disabled: false,
  locale: 'en-GB',
  showToTop: false,
  showToLeft: false,
  onChange: () => {},
  onClick: () => {},
  onHide: () => {},
  tabIndex: 0
};
