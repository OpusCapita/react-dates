import React, { Component, PropTypes } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import MomentLocaleUtils from 'react-day-picker/moment';
import assign from 'lodash/assign';
import './DayPicker.less';

function splitProps(props, specificPropNames = []) {
  return Object.keys(props).reduce((result, propName) => {
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
};

export default
class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date
    };
  }

  handleDateChange(date) {
    this.props.onChange(date);
  }

  handleTodayClick() {
    this.props.onChange(new Date());
  }

  render() {
    let {
      className,
      pickerClassName,
      ...restProps
    } = this.props;

    let splittedProps = splitProps(restProps, Object.keys(ReactDayPicker.propTypes));
    let commonProps = splittedProps[0];
    let pickerSpecificProps = splittedProps[1];

    return (
      <div className={`opuscapita_day-picker ${className}`} { ...commonProps }>
        <div className={`opuscapita_day-picker__header`}>
        </div>
        <div className={`opuscapita_day-picker__picker`}>
          <ReactDayPicker
            className={pickerClassName}
            localeUtils={ MomentLocaleUtils }
            onDayClick={this.handleDateChange.bind(this)}
            onDayKeyDown={this.handleDateChange.bind(this)}
            onDayTouchEnd={this.handleDateChange.bind(this)}
            { ...pickerSpecificProps }
          />
        </div>
        <div className={`opuscapita_day-picker__footer`}>
          <button
            type="button"
            className={`btn btn-sm btn-default opuscapita_day-picker__today-button`}
            onClick={this.handleTodayClick.bind(this)}
            tabIndex={-1}
          >
            Today
        </button>
        </div>
      </div>
    );
  }
}

DayPicker.propTypes = {
  ...ReactDayPicker.propTypes,
  className: PropTypes.string,
  pickerClassName: PropTypes.string,
  onChange: PropTypes.func
};
DayPicker.defaultProps = {
  className: '',
  labels: ReactDayPicker.defaultProps.labels,
  pickerClassName: '',
  onChange: () => {}
};
