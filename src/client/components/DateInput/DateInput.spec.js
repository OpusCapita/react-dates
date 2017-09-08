import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import DateInput from '.';
import DateInputField from '../DateInputField';
import MaskedInput from '@opuscapita/react-maskedinput';

describe('<DateInput />', () => {
  /* Recommended test-cases */
  it('should have default props', () => {
    let component = <DateInput />;
    expect(component.props.className).to.equal('');
    expect(component.props.dateFormat).to.equal('dd/MM/yyyy');
    expect(component.props.disabled).to.equal(false);
    expect(component.props.isValid).to.equal(true);
    expect(component.props.locale).to.equal('en');
    expect(component.props.onBlur).to.be.a('function');
    expect(component.props.onFocus).to.be.a('function');
    expect(component.props.onChange).to.be.a('function');
  });

  it('should have the mask', () => {
    let dateFormat="D/M/yyyy";
    let dateInputReact = (<DateInput
      dateFormat={dateFormat}
      disabled={false}
      locale="en"
    />);
    let dateInputShallow = shallow(dateInputReact);
    let maskedInputFind = dateInputShallow.find(DateInputField).shallow().find(MaskedInput);
    expect(maskedInputFind.get(0).props.mask).to.equal('  /  /1111');

    dateFormat="dd/MM/yyyy";
    dateInputReact = (<DateInput
      dateFormat={dateFormat}
      disabled={false}
      locale="en"
    />);
    dateInputShallow = shallow(dateInputReact);
    maskedInputFind = dateInputShallow.find(DateInputField).shallow().find(MaskedInput);
    expect(maskedInputFind.get(0).props.mask).to.equal('11/11/1111');
  });

  it('should have the right class name', () => {
    let component = <DateInput className="test-class-name" />;
    expect(component.props.className).to.equal('test-class-name');
  });
});
