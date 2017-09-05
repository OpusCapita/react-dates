import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import InputMask from '../InputMask';

describe('<InputMask />', () => {
  /* Recommended test-cases */
  it.skip('should have default props', () => {
    let component = <DateInput />;
    expect(component.props.testProp).to.equal('Give me back my label!');
    expect(component.props.onClick).to.be.a('function');
  });
  it.skip('should have the right class name', () => {
    let wrapper = shallow(<DateInput className="test-class-name" />);
    expect(wrapper).to.have.className('date-input');
    expect(wrapper).to.have.className('test-class-name');
  });
});
