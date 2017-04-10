import React, { Component, PropTypes } from 'react';
import ReactDayPicker from 'react-day-picker/lib/src/DayPicker';
import "react-day-picker/lib/style.css";
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

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

function Caption({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={ handleChange } value={ date.getMonth() }>
        { months.map((month, i) =>
          <option key={ i } value={ i }>{ month }</option>)
        }
      </select>
      <select name="year" onChange={ handleChange } value={ date.getFullYear() }>
        { years.map((year, i) =>
          <option key={ i } value={ year }>
            { year }
          </option>)
        }
      </select>
    </form>
  );
}

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
      dayPickerRef,
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
            ref={el => (dayPickerRef(el))}
            className={pickerClassName}
            localeUtils={ MomentLocaleUtils }
            onDayClick={this.handleDateChange.bind(this)}
            onDayKeyDown={this.handleDateChange.bind(this)}
            onDayTouchEnd={this.handleDateChange.bind(this)}
            captionElement={
              <Caption onChange={this.handleDateChange.bind(this)} />
            }
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
  dayPickerRef: PropTypes.func,
  onChange: PropTypes.func
};
DayPicker.defaultProps = {
  className: '',
  dayPickerRef: () => {},
  labels: ReactDayPicker.defaultProps.labels,
  pickerClassName: '',
  onChange: () => {}
};
