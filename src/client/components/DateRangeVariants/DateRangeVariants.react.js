import React, { Component, PropTypes } from 'react';
import VerticalList from 'opuscapita-react-ui-autocompletes/lib/VerticalList';
import moment from 'moment';
import './DateRangeVariants.less';

let propTypes = {
  variants: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    range: PropTypes.array
  })),
  onChange: PropTypes.func
};

let defaultProps = {
  variants: [
    {
      label: 'Previous week',
      getRange: () => [
        moment().subtract(7, 'days').startOf('week').toDate(),
        moment().subtract(7, 'days').endOf('week').toDate()
      ]
    },
    {
      label: 'This week',
      getRange: () => [
        moment().startOf('week').toDate(),
        moment().endOf('week').toDate()
      ]
    },
    {
      label: 'Next week',
      getRange: () => [
        moment().add(7, 'days').startOf('week').toDate(),
        moment().add(7, 'days').endOf('week').toDate()
      ]
    },
    {
      label: 'Previous month',
      getRange: () => [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate()
      ]
    },
    {
      label: 'Last 30 days',
      getRange: () => [
        moment().subtract(30, 'days').toDate(),
        moment().toDate()
      ]
    },
    {
      label: 'This month',
      getRange: () => [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate()
      ]
    },
    {
      label: 'Next month',
      getRange: () => [
        moment().add(1, 'month').startOf('month').toDate(),
        moment().add(1, 'month').endOf('month').toDate()
      ]
    }
  ],
  onChange: () => {}
};

export default
class DateRangeVariants extends Component {
  handleChange(key) {
    let range = this.props.variants[key].getRange();
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
