import React, { PropTypes, Component } from 'react';
import './DatePicker.less';
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

let propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  showToTop: PropTypes.bool,
  showToLeft: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onHide: PropTypes.func,
  tabIndex: PropTypes.number
};

let defaultProps = {
  className: '',
  date: new Date(),
  disabled: false,
  locale: 'en-GB',
  showToTop: false,
  showToLeft: false,
  onChange: () => {},
  onClick: () => {},
  onHide: () => {},
  tabIndex: 0
};

export default
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    };
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
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

  handleToggleClick() {
    this.props.onClick();
    if (this.state.showPicker) {
      return this.hidePicker();
    }
    this.reactDayPicker && this.reactDayPicker.showMonth(this.props.date);
    return this.showPicker();
  }

  handleDateChange(date) {
    this.hidePicker();
    this.props.onChange(date);
  }

  handleKeyDown(event) {
    if(event.which === 9) { // TAB key
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
      date,
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
        onChange={this.handleDateChange}
        { ...dayPickerSpecificProps }
      />
    );

    let showToTopClassName = showToTop ? 'opuscapita_date-picker__picker-container--to-top' : '';
    let showToLeftClassName = showToLeft ? 'opuscapita_date-picker__picker-container--to-left' : '';

    let pickerMotionElement = (
      <Motion
        defaultStyle={{ x: this.state.showPicker ? 1 : 0 }}
        style={{ x: this.state.showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
      >
        {interpolatedStyle => (
          <div
            className={`opuscapita_date-picker__picker-container ${showToTopClassName} ${showToLeftClassName}`}
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
        className={`opuscapita_date-picker ${className}`}
        onKeyDown={this.handleKeyDown}
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
