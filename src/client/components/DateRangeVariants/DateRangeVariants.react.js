import React, { Component, PropTypes } from 'react';
import VerticalList from 'opuscapita-react-ui-autocompletes/lib/VerticalList';
import moment from 'moment';
import './DateRangeVariants.less';

let propTypes = {
  variants: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    range: PropTypes.array
  })),
  onChange: PropTypes.func,
  locale: PropTypes.string
};

let defaultProps = {
  variants: [
    {
      label: 'Previous week',
      getRange: (locale) => [
        moment().locale(locale).subtract(7, 'days').startOf('week').toDate(),
        moment().locale(locale).subtract(7, 'days').endOf('week').toDate()
      ]
    },
    {
      label: 'This week',
      getRange: (locale) => [
        moment().locale(locale).startOf('week').toDate(),
        moment().locale(locale).endOf('week').toDate()
      ]
    },
    {
      label: 'Next week',
      getRange: (locale) => [
        moment().locale(locale).add(7, 'days').startOf('week').toDate(),
        moment().locale(locale).add(7, 'days').endOf('week').toDate()
      ]
    },
    {
      label: 'Previous month',
      getRange: (locale) => [
        moment().locale(locale).subtract(1, 'month').startOf('month').toDate(),
        moment().locale(locale).subtract(1, 'month').endOf('month').toDate()
      ]
    },
    {
      label: 'Last 30 days',
      getRange: (locale) => [
        moment().locale(locale).subtract(30, 'days').toDate(),
        moment().locale(locale).toDate()
      ]
    },
    {
      label: 'This month',
      getRange: (locale) => [
        moment().locale(locale).startOf('month').toDate(),
        moment().locale(locale).endOf('month').toDate()
      ]
    },
    {
      label: 'Next month',
      getRange: (locale) => [
        moment().locale(locale).add(1, 'month').startOf('month').toDate(),
        moment().locale(locale).add(1, 'month').endOf('month').toDate()
      ]
    }
  ],
  onChange: () => {},
  locale: 'en-GB'
};

export default
class DateRangeVariants extends Component {
  handleChange(key) {
    console.log('locale:', this.props.locale);
    let range = this.props.variants[key].getRange(this.props.locale);
    this.props.onChange(range);
  }

  render() {
    let { variants, onChange } = this.props;
    let items = variants.map((variant, index) => ({ key: index.toString(), value: variant.label }));

    let variantsElement = (
      <li className="opuscapita_date-range-variants__list">
        <VerticalList onClick={(event, key) => this.handleChange(key)} items={items} />
      </li>
    );

    return (
      <div className="opuscapita_date-range-variants">
        {variantsElement}
      </div>
    );
  }
}

DateRangeVariants.propTypes = propTypes;
DateRangeVariants.defaultProps = defaultProps;
