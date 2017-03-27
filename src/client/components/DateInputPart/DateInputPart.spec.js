import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DateInputPart from '.';

describe('<DateInputPart />', () => {
  it('should have default props', () => {
    let component = <DateInputPart />;
    expect(component.props.date).to.equal(null);
    expect(component.props.disabled).to.equal(false);
    expect(component.props.formatResolver).to.be.a('object');
    expect(component.props.isFocused).to.equal(false);
    expect(component.props.locale).to.equal('en-GB');
    expect(component.props.onBlur).to.be.a('function');
    expect(component.props.onChange).to.be.a('function');
    expect(component.props.onError).to.be.a('function');
    expect(component.props.onFocus).to.be.a('function');
    expect(component.props.onMount).to.be.a('function');
    expect(component.props.onPressLeft).to.be.a('function');
    expect(component.props.onPressRight).to.be.a('function');
    expect(component.props.onUnmount).to.be.a('function');
    expect(component.props.options).to.be.a('object');
    expect(component.props.className).to.equal('');
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DateInputPart className="test-class-name" />);
    expect(wrapper).to.have.className('date-input-part');
    expect(wrapper).to.have.className('test-class-name');
  });

  it('should trigger onFocus when focused', () => {
    let callback = sinon.spy();
    let wrapper = shallow(<DateInputPart onFocus={callback} />);
    wrapper.setProps({ isFocused: true });
    wrapper.focus();
    expect(callback.called).to.equal(true);
  });

  it('should trigger onFocus property', () => {
    let wrapper = shallow(<DateInput />);
  });
});
