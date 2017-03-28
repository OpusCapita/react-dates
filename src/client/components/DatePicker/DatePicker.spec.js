import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import DatePicker from '.';

let simulateBodyClick = () => {
  /* JSDom body click simulate
     http://stackoverflow.com/questions/27557624/simulating-click-on-document-reactjs-jsdom
  */
  let event = document.createEvent("HTMLEvents");
  event.initEvent("click", false, true);
  document.body.dispatchEvent(event);
};

describe('<DatePicker />', () => {
  it('should have default props', () => {
    let component = <DatePicker />;
    expect(component.props.className).to.equal('');
    expect(component.props.date).to.be.an.instanceof(Date);
    expect(component.props.disabled).to.equal(false);
    expect(component.props.tabIndex).to.equal(0);
    expect(component.props.onChange).to.be.a('function');
    expect(component.props.onClick).to.be.a('function');
    expect(component.props.onHide).to.be.a('function');
    expect(component.props.locale).to.equal('en-GB');
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DatePicker className="test-class-name" />);
    expect(wrapper).to.have.className('opuscapita_date-picker');
    expect(wrapper).to.have.className('test-class-name');
  });

  it('should have the right class name if showToTop property is truthy', () => {
    let wrapper = mount(<DatePicker showToTop={true} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container--to-top');
  });

  it('should have the right class name if showToLeft property is truthy', () => {
    let wrapper = mount(<DatePicker showToLeft={true} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container--to-left');
  });

  it('should have the right class name if showToTop and showToLeft property is truthy', () => {
    let wrapper = mount(<DatePicker showToTop={true} showToLeft={true} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container--to-top');
    expect(pickerContainer).to.have.className('opuscapita_date-picker__picker-container--to-left');
  });

  it('should have toggle picker button', () => {
    let wrapper = shallow(<DatePicker />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    expect(showPickerButton).to.have.length(1);
  });

  it('should have toggle picker button with 0 tabIndex by default', () => {
    let wrapper = shallow(<DatePicker />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    expect(showPickerButton).to.have.prop('tabIndex', 0);
  });

  it('should have toggle picker button with specified tabIndex', () => {
    let wrapper = shallow(<DatePicker tabIndex={2} />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    expect(showPickerButton).to.have.prop('tabIndex', 2);
  });

  it('should show picker on toggle button click', (done) => {
    let wrapper = mount(<DatePicker />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    expect(pickerContainer).to.have.style('opacity', '0');

    showPickerButton.simulate('click');
    setTimeout(() => {
      expect(pickerContainer).to.have.style('opacity', '1');
      done();
    }, 1000);
  });

  it('should call onClick property on toggle button click', () => {
    let spy = sinon.spy();
    let wrapper = shallow(<DatePicker onClick={spy} />);
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    showPickerButton.simulate('click');
    expect(spy).to.have.been.called;
  });


  it('should hide picker on toggle button click second time', (done) => {
    let wrapper = mount(<DatePicker />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    showPickerButton.simulate('click');
    setTimeout(() => {
      expect(pickerContainer).to.have.style('opacity', '0');
      done();
    }, 1000);
  });

  it('should\'t hide on click within picker', (done) => {
    let wrapper = mount(<DatePicker />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');

    pickerContainer.simulate('click');
    setTimeout(() => {
      expect(pickerContainer).to.have.style('opacity', '1');
      done();
    }, 1000);
  });

  it('should hide picker on click outside of element', (done) => {
    let wrapper = mount(<DatePicker />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');

    simulateBodyClick();
    setTimeout(() => {
      expect(pickerContainer).to.have.style('opacity', '0');
      done();
    }, 1000);
  });

  it('should\'t hide on click within picker', (done) => {
    let wrapper = mount(<DatePicker />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');

    pickerContainer.simulate('click');
    setTimeout(() => {
      expect(pickerContainer).to.have.style('opacity', '1');
      done();
    }, 1000);
  });

  it('should handle onChange', () => {
    let spy = sinon.spy();
    let wrapper = mount(<DatePicker onChange={spy} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    let dayElement = pickerContainer.find('.DayPicker-Day[aria-selected]').first();
    dayElement.simulate('click');

    expect(spy).to.have.been.called;
    expect(spy.args[0][0]).to.be.instanceOf(Date);
  });

  it('should disable button if disabled property is truthy', () => {
    let wrapper = shallow(<DatePicker disabled={true} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    expect(showPickerButton).to.have.attr('disabled');
  });

  it('should show current month if date property not specified', () => {
    let wrapper = mount(<DatePicker locale="en-GB" />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');

    showPickerButton.simulate('click');
    let currentYear = new Date().getFullYear();
    let currentDate = new Date().getDate();
    let yearElement = pickerContainer.find('.DayPicker-Caption');
    let dateElement = pickerContainer.find('.DayPicker-Day--today');

    expect(yearElement).to.contain.text(currentYear);
    expect(dateElement).to.contain.text(currentDate);
  });

  it('should change date if new date property passed', () => {
    let wrapper = mount(<DatePicker locale="en-GB" date={new Date(1945, 6, 16)} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    showPickerButton.simulate('click');
    let yearElement = pickerContainer.find('.DayPicker-Caption');

    expect(yearElement).to.contain.text(1945);
    wrapper.setProps({ date: new Date(1971, 10, 15) });
    expect(yearElement).to.contain.text(1971);
  });

  it('should react on locale change', () => {
    let wrapper = mount(<DatePicker locale="en-GB" date={new Date(1945, 6, 16)} />);
    let pickerContainer = wrapper.find('.opuscapita_date-picker__picker-container');
    let showPickerButton = wrapper.find('button.opuscapita_date-picker__toggle-picker');
    let monthElement = pickerContainer.find('.DayPicker-Caption');
    showPickerButton.simulate('click');

    expect(monthElement).to.contain.text('July');
    wrapper.setProps({ locale: "de-DE" });
    expect(monthElement).to.contain.text('Juli');
    wrapper.setProps({ locale: "ru-RU" });
    expect(monthElement).to.contain.text('июль');
    wrapper.setProps({ locale: "hu-HU" });
    expect(monthElement).to.contain.text('július');
  });
});
