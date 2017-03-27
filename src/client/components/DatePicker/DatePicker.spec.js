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
    expect(component.props.disabled).to.equal(false);
    expect(component.props.tabIndex).to.equal(0);
    expect(component.props.onChange).to.be.a('function');
    expect(component.props.onHide).to.be.a('function');
    expect(component.props.locale).to.equal('en-GB');
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DatePicker className="test-class-name" />);
    expect(wrapper).to.have.className('opuscapita_date-picker');
    expect(wrapper).to.have.className('test-class-name');
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
});
