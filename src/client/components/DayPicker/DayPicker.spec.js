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
    expect(reactDayPickerElement.hasClass('picker')).to.be.true;
    expect(reactDayPickerElement.hasClass('container')).to.be.false;
    expect(reactDayPickerElement.prop('aria-label')).to.be.undefined;
    expect(reactDayPickerElement.prop('tabIndex')).to.equal(4);
    expect(reactDayPickerElement.prop('locale')).to.equal('en-GB');
    expect(reactDayPickerElement.prop('enableOutsideDays')).to.equal(true);
    expect(reactDayPickerElement.prop('fixedWeeks')).to.equal(true);
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
    expect(containerDiv.hasClass('picker')).to.be.false;
    expect(containerDiv.hasClass('container')).to.be.true;
    expect(containerDiv.prop('aria-label')).to.equal('day-picker');
    expect(containerDiv.prop('tabIndex')).to.be.undefined;
    expect(containerDiv.prop('locale')).to.be.undefined;
    expect(containerDiv.prop('enableOutsideDays')).to.be.undefined;
    expect(containerDiv.prop('fixedWeeks')).to.be.undefined;
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DayPicker className="test-class-name" />);
    expect(wrapper.hasClass('opuscapita_day-picker')).to.be.true;
    expect(wrapper.hasClass('test-class-name')).to.be.true;
  });

  it('should pass props to ReactDayPicker', () => {
    let wrapper = shallow(<DayPicker className="test-class-name" firstDayOfWeek={0} />);
    let reactDayPicker = wrapper.find(ReactDayPicker);
    expect(reactDayPicker.prop('firstDayOfWeek')).to.equal(0);
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
