import React, { PropTypes, Component } from 'react';
import './DatePicker.less';
import LocaleUtils from 'react-day-picker/moment';
import DayPicker from '../DayPicker';
import { spring, presets, Motion} from 'react-motion';
let springPreset = presets.gentle;

export default
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleToggleClick() {
    this.props.onClick();
    if(this.state.showPicker) {
      return this.hidePicker();
    }
    return this.showPicker();
  }

  handleDateChange(date) {
    this.hidePicker();
    this.props.onChange(date);
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

    let pickerElement = (
      <DayPicker
        locale={locale}
        month={date}
        tabIndex={-1}
        onDayClick={this.handleDateChange.bind(this)}
        onDayKeyDown={this.handleDateChange.bind(this)}
        onDayTouchEnd={this.handleDateChange.bind(this)}
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
        ref={el => (this.container = el)}
        { ...restProps }
      >
        <button
          className="opuscapita_date-picker__toggle-picker btn btn-default"
          disabled={disabled}
          onClick={this.handleToggleClick.bind(this)}
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

DatePicker.propTypes = {
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
DatePicker.defaultProps = {
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
