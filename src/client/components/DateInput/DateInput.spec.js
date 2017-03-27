import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DateInput from '.';

describe('<DateInput />', () => {
  it('should have default props', () => {
    let component = <DateInput />;
    expect(component.props.className).to.equal('');
    expect(component.props.date).to.equal(null);
    expect(component.props.disabled).to.equal(false);
    expect(component.props.locale).to.equal('en-GB');
    expect(component.props.maxYear).to.equal(2200);
    expect(component.props.minYear).to.equal(1920);
    expect(component.props.onBlur).to.be.a('function');
    expect(component.props.onChange).to.be.a('function');
    expect(component.props.onFocus).to.be.a('function');
    expect(component.props.onLast).to.be.a('function');
    expect(component.props.onMount).to.be.a('function');
    expect(component.props.onPressLeft).to.be.a('function');
    expect(component.props.onPressRight).to.be.a('function');
    expect(component.props.onUnmount).to.be.a('function');
    expect(component.props.dateFormat).to.equal('dd.MM.yyyy');
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DateInput className="test-class-name" />);
    expect(wrapper).to.have.className('test-class-name');
    expect(wrapper).to.have.className('date-input');
  });

  it('should trigger onFocus property', () => {
    let wrapper = shallow(<DateInput />);
  });

  // it('should have increment button', () => {
  //   let wrapper = shallow(<DemoComponent />);
  //   let incrementButton = wrapper.find('.demo-component__increment-button');
  //   expect(incrementButton).to.present();
  // });

  // it('should increment clicks count by pressing increment button', () => {
  //   let wrapper = shallow(<DemoComponent />);
  //   let clicksCount = wrapper.find('.demo-component__clicks-count');
  //   let incrementButton = wrapper.find('.demo-component__increment-button');

  //   incrementButton.simulate('click');
  //   clicksCount = wrapper.find('.demo-component__clicks-count');
  //   expect(clicksCount.text()).to.equal('1');

  //   incrementButton.simulate('click');
  //   clicksCount = wrapper.find('.demo-component__clicks-count');
  //   expect(clicksCount.text()).to.equal('2');

  //   incrementButton.simulate('click');
  //   clicksCount = wrapper.find('.demo-component__clicks-count');
  //   expect(clicksCount.text()).to.equal('3');
  // });
});
