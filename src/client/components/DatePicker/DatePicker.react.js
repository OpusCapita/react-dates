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
    if(this.state.showPicker) {
      return this.hidePicker();
    }
    return this.showPicker();
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
      showButton,
      tabIndex,
      locale,
      showPicker,
      ...restProps
    } = this.props;

    let pickerElement = (
      <DayPicker
        locale={locale}
        onBlur={() => console.log('hello')}
        { ...restProps }
      />
    );

    let pickerMotionElement = (
      <Motion
          defaultStyle={{ x: this.state.showPicker ? 1 : 0 }}
          style={{ x: this.state.showPicker ? spring(1, springPreset) : spring(0, springPreset) }}
        >
          {interpolatedStyle => (
            <div
              className="opuscapita_date-picker__picker-container"
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
        style={{ display: 'inline-flex' }}
        ref={el => (this.container = el)}
      >
        <button
          onClick={this.handleToggleClick.bind(this)}
          type="button"
          tabIndex={tabIndex}
          className="opuscapita_date-picker__toggle-picker btn btn-default"
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
  disabled: PropTypes.bool,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  onHide: PropTypes.func,
  tabIndex: PropTypes.number
};
DatePicker.defaultProps = {
  className: '',
  disabled: false,
  locale: 'en-GB',
  onChange: () => {},
  onHide: () => {},
  tabIndex: 0
};
