import React, { PureComponent, PropTypes } from 'react';
import VerticalList from '@opuscapita/react-autocompletes/lib/VerticalList';
import moment from 'moment';
import './DateVariants.less';

let propTypes = {
  variants: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.array
  })),
  onChange: PropTypes.func,
  locale: PropTypes.string
};

let defaultProps = {
  variants: [
    {
      label: 'Previous week',
      getValue: (locale) => [
        moment().locale(locale).subtract(7, 'days').startOf('week').toDate(),
        moment().locale(locale).subtract(7, 'days').endOf('week').toDate()
      ]
    },
    {
      label: 'This week',
      getValue: (locale) => [
        moment().locale(locale).startOf('week').toDate(),
        moment().locale(locale).endOf('week').toDate()
      ]
    },
    {
      label: 'Next week',
      getValue: (locale) => [
        moment().locale(locale).add(7, 'days').startOf('week').toDate(),
        moment().locale(locale).add(7, 'days').endOf('week').toDate()
      ]
    },
    {
      label: 'Previous month',
      getValue: (locale) => [
        moment().locale(locale).subtract(1, 'month').startOf('month').toDate(),
        moment().locale(locale).subtract(1, 'month').endOf('month').toDate()
      ]
    },
    {
      label: 'Last 30 days',
      getValue: (locale) => [
        moment().locale(locale).subtract(30, 'days').toDate(),
        moment().locale(locale).toDate()
      ]
    },
    {
      label: 'This month',
      getValue: (locale) => [
        moment().locale(locale).startOf('month').toDate(),
        moment().locale(locale).endOf('month').toDate()
      ]
    },
    {
      label: 'Next month',
      getValue: (locale) => [
        moment().locale(locale).add(1, 'month').startOf('month').toDate(),
        moment().locale(locale).add(1, 'month').endOf('month').toDate()
      ]
    }
  ],
  onChange: () => {},
  locale: 'en-GB'
};

export default
class DateVariants extends PureComponent {
  handleChange(key) {
    let variants = this.props.variants;
    let value = variants[key].getValue(this.props.locale);
    this.props.onChange(value);
  }

  render() {
    let {
      variants,
      onChange // eslint-disable-line no-unused-vars
    } = this.props;
    let items = variants.map((variant, index) => ({
      key: index.toString(),
      value: variant.label
    }));

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

DateVariants.propTypes = propTypes;
DateVariants.defaultProps = defaultProps;
