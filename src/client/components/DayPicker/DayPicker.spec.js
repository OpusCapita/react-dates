import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ReactDayPicker from 'react-day-picker';
import DayPicker from '.';

describe('<DayPicker />', () => {
  it('should have default props', () => {
    let component = <DayPicker />;
    expect(component.props.className).to.equal('');
    expect(component.props.onChange).to.be.a('function');
    expect(component.props.pickerClassName).to.be.a('string');
  });

  it('should pass specific ReactDayPicker props to it', () => {
    let wrapper = mount(
      <DayPicker
        aria-label="day-picker"
        locale="en-GB"
        tabIndex={4}
        className="container"
        pickerClassName="picker"
        enableOutsideDays={true}
        fixedWeeks={true}
      />
    );
    let reactDayPickerElement = wrapper.find(ReactDayPicker);
    expect(reactDayPickerElement).to.have.className('picker');
    expect(reactDayPickerElement).to.not.have.className('container');
    expect(reactDayPickerElement).to.not.have.props({ 'aria-label': 'day-picker' });
    expect(reactDayPickerElement).to.have.props({
      tabIndex: 4,
      locale: 'en-GB',
      enableOutsideDays: true,
      fixedWeeks: true
    });
  });

  it('should pass non specific ReactDayPicker props to container div', () => {
    let wrapper = mount(
      <DayPicker
        aria-label="day-picker"
        locale="en-GB"
        tabIndex={4}
        pickerClassName="picker"
        className="container"
        enableOutsideDays={true}
        fixedWeeks={true}
      />
    );
    let containerDiv = wrapper.find('.opuscapita_day-picker');
    expect(containerDiv).to.not.have.className('picker');
    expect(containerDiv).to.have.className('container');
    expect(containerDiv).to.have.props({ 'aria-label': 'day-picker' });
    expect(containerDiv).to.not.have.props({
      tabIndex: 4,
      locale: 'en-GB',
      enableOutsideDays: true,
      fixedWeeks: true
    });
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DayPicker className="test-class-name" />);
    expect(wrapper).to.have.className('opuscapita_day-picker');
    expect(wrapper).to.have.className('test-class-name');
  });

  it('should pass props to ReactDayPicker', () => {
    let wrapper = shallow(<DayPicker className="test-class-name" firstDayOfWeek={0} />);
    let reactDayPicker = wrapper.find(ReactDayPicker);
    expect(reactDayPicker).to.have.prop('firstDayOfWeek', 0);
  });

  it('should call dayPickerRef when react-day-picker mounted', () => {
    let spy = sinon.spy();
    let wrapper = mount(<DayPicker dayPickerRef={spy} />);

    expect(spy).to.have.been.called;
    expect(spy.args[0][0]).to.be.instanceOf(ReactDayPicker);
  });

  it('should call onChange when new date selected', () => {
    let spy = sinon.spy();
    let wrapper = mount(<DayPicker onChange={spy} />);

    let dayElement = wrapper.find('.DayPicker-Day[aria-selected]').first();
    dayElement.simulate('click');

    expect(spy).to.have.been.called;
    expect(spy.args[0][0]).to.be.instanceOf(Date);
  });

  it('should have today button', () => {
    let wrapper = shallow(<DayPicker />);
    let todayButton = wrapper.find('button.opuscapita_day-picker__today-button');
    expect(todayButton).to.exist;
  });

  it('should call onChange on today button click', () => {
    let spy = sinon.spy();
    let wrapper = shallow(<DayPicker onChange={spy} />);
    let todayButton = wrapper.find('button.opuscapita_day-picker__today-button');
    let todayDate = new Date();

    todayButton.simulate('click');
    expect(spy).to.have.been.called;
    expect(spy.args[0][0]).to.be.instanceOf(Date);
    expect(spy.args[0][0].getFullYear()).to.equal(todayDate.getFullYear());
    expect(spy.args[0][0].getMonth()).to.equal(todayDate.getMonth());
    expect(spy.args[0][0].getDate()).to.equal(todayDate.getDate());
  });
});
