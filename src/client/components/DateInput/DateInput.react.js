import React, { Component, PropTypes } from 'react';
import './DateInput.less';
import DateInputField from '../DateInputField';
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
      showPicker: false
    };
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleBodyKeyDown = this.handleBodyKeyDown.bind(this);
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
  }

  handleError(error) {
    this.setState({ error });
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
    this.showPicker();
  }

  reset() {
    this.props.onChange(null);
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
      showResetButton,
      onChange,
      onClick,
      onHide,
      tabIndex,
      ...restProps
    } = this.props;

    let { error } = this.state;

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
    let hasErrorClassName = error === null ? '' : 'has-error';

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

    let resetButton = showResetButton ? (
      <button
        className={`
          btn btn-default opuscapita_date-input__reset-btn
        `}
        tabIndex="-1"
        onClick={this.reset}
      >
        <i className="fa fa-times" />
      </button>
    ) : null;

    return (
      <div
        ref={el => (this.container = el)}
        className={`opuscapita-date-input form-group ${hasErrorClassName}`}
      >
        <DateInputField
          date={date}
          dateFormat={dateFormat}
          onChange={this.handleDateChange.bind(this)}
          onError={this.handleError.bind(this)}
          onFocus={this.handleInputFocus.bind(this)}
        />
        {resetButton}
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
  showResetButton: PropTypes.bool,
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
  showResetButton: false,
  onChange: () => {},
  onClick: () => {},
  onHide: () => {},
  tabIndex: 0
};
