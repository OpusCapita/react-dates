import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount, ReactWrapper } from 'enzyme';
import sinon from 'sinon';
import DayPicker from '../DayPicker';
import DatePicker from '.';

describe('<DatePicker />', () => {
  it('should have default props', () => {
    let component = <DatePicker />;
    expect(component.props.className).to.equal('');
    expect(component.props.disabled).to.equal(false);
    expect(component.props.tabIndex).to.equal(0);
    expect(component.props.onChange).to.be.a('function');
    expect(component.props.locale).to.equal('en');
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DatePicker className="test-class-name" />);
    expect(wrapper.hasClass('opuscapita_date-picker')).to.be.true;
    expect(wrapper.hasClass('test-class-name')).to.be.true;
  });

  it('should have picker-container', () => {
    let wrapper = mount(<DatePicker />);
    let pickerContainers = document.getElementsByClassName('opuscapita_date-picker__picker-container');
    expect(pickerContainers).to.have.lengthOf(1);
  });

  it.skip('+ should pass specific DayPicker props to it', () => {
    let wrapper = mount(
      <DatePicker
        aria-label="day-picker"
        locale="en"
        tabIndex={4}
        className="container"
        pickerClassName="picker"
        enableOutsideDays={true}
        fixedWeeks={true}
      />
    );
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let dayPickerElement = portal.find(DayPicker);
    expect(dayPickerElement.hasClass('picker')).to.be.false;
    expect(dayPickerElement.hasClass('container')).to.be.false;
    expect(dayPickerElement.prop('container')).to.be.undefined;
    expect(dayPickerElement.prop('aria-label')).to.be.undefined;
    expect(dayPickerElement.prop('tabIndex')).to.be.equal(-1);
    expect(dayPickerElement.prop('locale')).to.equal('en');
    expect(dayPickerElement.prop('enableOutsideDays')).to.be.true;
    expect(dayPickerElement.prop('fixedWeeks')).to.be.true;
  });

  it('should pass non specific ReactDayPicker props to container div', () => {
    let wrapper = mount(
      <DatePicker
        aria-label="day-picker"
        locale="en"
        tabIndex={4}
        className="container"
        pickerClassName="picker"
        enableOutsideDays={true}
        fixedWeeks={true}
      />
    );
    let containerDiv = wrapper.find('.opuscapita_date-picker');
    expect(containerDiv.hasClass('picker')).to.be.false;
    expect(containerDiv.hasClass('container')).to.be.true;
    expect(containerDiv.prop('aria-label')).to.equal('day-picker');
    expect(containerDiv.prop('tabIndex')).to.be.undefined;
    expect(containerDiv.prop('locale')).to.be.undefined;
    expect(containerDiv.prop('enableOutsideDays')).to.be.undefined;
    expect(containerDiv.prop('fixedWeeks')).to.be.undefined;
  });

  it.skip('+ should pass html attributes to outer element', () => {
    let wrapper = mount(
      <DatePicker
        aria-label="date-picker"
        style={{ fontSize: '24px' }}
      />
    );
    let container = wrapper.find('.opuscapita_date-picker');
    expect(container.prop('aria-label')).to.equal('date-picker');
    let containerStyle = container.get(0).style;
    expect(containerStyle).to.have.property('font-size', '24px');
  });

  it('should have toggle picker button', () => {
    let wrapper = shallow(<DatePicker />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    expect(showPickerButton).to.have.length(1);
  });

  it('should have toggle picker button with 0 tabIndex by default', () => {
    let wrapper = shallow(<DatePicker />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    expect(showPickerButton.prop('tabIndex')).to.equal(0);
  });

  it('should have toggle picker button with specified tabIndex', () => {
    let wrapper = shallow(<DatePicker tabIndex={2} />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    expect(showPickerButton.prop('tabIndex')).to.equal(2);
  });

  it.skip('+ should show picker on toggle button click', (done) => {
    let wrapper = mount(<DatePicker />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    setTimeout(() => {
      let pickerContainerStyle = pickerContainer.get(0).style;
      expect(pickerContainerStyle).to.have.property('opacity', '1');
      done();
    }, 1000);
  });

  it.skip('+ should hide picker on toggle button click second time', (done) => {
    let wrapper = mount(<DatePicker />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    showPickerButton.simulate('click');
    setTimeout(() => {
      let pickerContainerStyle = pickerContainer.get(0).style;
      expect(pickerContainerStyle).to.have.property('opacity', '0');
      done();
    }, 1000);
  });

  it.skip('+ shouldn\'t hide on click within picker', (done) => {
    let wrapper = mount(<DatePicker />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');

    pickerContainer.simulate('click');
    setTimeout(() => {
      let pickerContainerStyle = pickerContainer.get(0).style;
      expect(pickerContainerStyle).to.have.property('opacity', '1');
      done();
    }, 1000);
  });

  it.skip('should hide picker on click outside of element', (done) => {
    let wrapper = mount(<DatePicker />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');

    let event = document.createEvent("HTMLEvents");
    event.initEvent("click", false, true);
    document.body.dispatchEvent(event);

    setTimeout(() => {
      let pickerContainerStyle = pickerContainer.get(0).style;
      expect(pickerContainerStyle).to.have.property('opacity', '0');
      done();
    }, 1000);
  });

  it.skip('should hide picker on press TAB', (done) => {
    let wrapper = mount(
      <div>
        <DatePicker />
        <input />
      </div>
    );
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    showPickerButton.simulate('keydown', { which: 9, keyCode: 9 });

    setTimeout(() => {
      let pickerContainerStyle = pickerContainer.get(0).style;
      expect(pickerContainerStyle).to.have.property('opacity', '0');
      done();
    }, 1000);
  });

  it.skip('+ shouldn\'t hide on click within picker but not concrete day', (done) => {
    let wrapper = mount(<DatePicker />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');

    pickerContainer.simulate('click');
    setTimeout(() => {
      let pickerContainerStyle = pickerContainer.get(0).style;
      expect(pickerContainerStyle).to.have.property('opacity', '1');
      done();
    }, 1000);
  });

  it.skip('+ should call onChange when new date selected', () => {
    let spy = sinon.spy();
    let wrapper = mount(<DatePicker onChange={spy} />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    let dayElement = pickerContainer.find('.DayPicker-Day[aria-selected]').first();
    dayElement.simulate('click');

    expect(spy).to.have.been.called;
    expect(spy.args[0][0]).to.be.instanceOf(Date);
  });

  it('should disable button if disabled prop is truthy', () => {
    let wrapper = shallow(<DatePicker disabled={true} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    expect(showPickerButton.props('disabled')).to.exist;
  });

  it.skip('+ should show current month if date prop not specified', () => {
    let wrapper = mount(<DatePicker locale="en" />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    let currentYear = new Date().getFullYear();
    let currentDate = new Date().getDate();
    let yearElement = pickerContainer.find('.DayPicker-Caption');
    let dateElement = pickerContainer.find('.DayPicker-Day--today');

    expect(yearElement.text()).to.contain(currentYear);
    expect(dateElement.text()).to.contain(currentDate);
  });

  it.skip('+ should change date if new date prop passed', () => {
    let wrapper = mount(<DatePicker locale="en" value={new Date(1945, 6, 16)} />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    showPickerButton.simulate('click');
    let yearElement = pickerContainer.find('.DayPicker-Caption');

    expect(yearElement.text()).to.contain(1945);
    wrapper.setProps({ value: new Date(1971, 10, 15) });
    expect(yearElement.text()).to.contain(1971);
  });

  it.skip('+ should react on locale change', () => {
    let wrapper = mount(<DatePicker locale="en" value={new Date(1945, 6, 16)} />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    let monthElement = pickerContainer.find('.DayPicker-Caption');
    showPickerButton.simulate('click');

    expect(monthElement.text()).to.contain('July');
    wrapper.setProps({ locale: "de-DE" });
    expect(monthElement.text()).to.contain('Juli');
    wrapper.setProps({ locale: "ru-RU" });
    expect(monthElement.text()).to.contain('июль');
    wrapper.setProps({ locale: "hu-HU" });
    expect(monthElement.text()).to.contain('július');
  });

  it.skip('+ should show date from prop after reopen picker', () => {
    let wrapper = mount(<DatePicker locale="en" value={new Date(1945, 6, 16)} />);
    const portal = new ReactWrapper(
      wrapper.instance().datePickerRef,
      true
    );
    let pickerContainer = portal.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    let nextMonthButton = portal.find('.DayPicker-NavButton--next');
    let monthElement = pickerContainer.find('.DayPicker-Caption');

    showPickerButton.simulate('click');
    expect(monthElement.text()).to.contain('July');

    nextMonthButton.simulate('click');
    expect(monthElement.text()).to.contain('August');

    showPickerButton.simulate('click');
    showPickerButton.simulate('click');

    expect(monthElement.text()).to.contain('July');
  });
});
