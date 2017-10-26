import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import DateInput from '.';

describe('<DateInput />', () => {
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

  it('should have the right class name', () => {
    let component = <DateInput className="test-class-name" />;
    expect(component.props.className).to.equal('test-class-name');
  });

  it('should have right props', () => {
    let component = (
      <DateInput
        value={new Date("01/02/2017")}
        dateFormat="dd/MMM/yyyy"
      />
    );
    let wrapper = mount(component);
    let wrapperInstance = wrapper.instance();
    expect(component.props.value).to.deep.equal(new Date("01/02/2017"));
    expect(component.props.dateFormat).to.equal('dd/MMM/yyyy');
    expect(wrapperInstance.state.error).to.be.null;
  });

  it('should have right DateInputField props', () => {
    let component = (
      <DateInput
        value={new Date("01/02/2017")}
        dateFormat="dd/MMM/yyyy"
      />
    );

    let wrapper = mount(component);
    let dateInputField = wrapper.find('DateInputField');
    expect(dateInputField.prop('value')).to.deep.equal(new Date("01/02/2017"));
    expect(dateInputField.prop('dateFormat')).to.equal("DD/MMM/YYYY");
    expect(dateInputField.prop('disabled')).to.be.false;
  });

  it('should have right state after change', () => {
    let component = (
      <DateInput
        value={new Date("01/02/2017")}
        dateFormat="dd/MMM/yyyy"
      />
    );

    let wrapper = mount(component);
    let wrapperInstance = wrapper.instance();
    wrapperInstance.handleDateChange(new Date("15/15/1953"));
    expect(wrapperInstance.state.error).to.be.null;
  });

  it('should have error state after change DateInputField to error value', () => {
    let component = (
      <DateInput
        value={new Date("01/02/2017")}
        dateFormat="dd/MMM/yyyy"
      />
    );

    let wrapper = mount(component);
    wrapper.setState(({ error: null }));
    let wrapperInstance = wrapper.instance();
    wrapperInstance.dateInputField.handleInputChange({
      target: { value: '011/021/2017' }
    });
    expect(wrapperInstance.dateInputField.state.inputValue).to.equal('011/021/2017');
    wrapperInstance.handleBlur({});
    expect(wrapperInstance.dateInputField.state.inputValue).to.equal('');
  });

  it('should have right state after change DateInputField value', () => {
    let component = (
      <DateInput
        dateFormat="dd/MMM/yyyy"
      />
    );

    let wrapper = mount(component);
    let wrapperInstance = wrapper.instance();
    wrapperInstance.dateInputField.handleInputChange({
      target: { value: '01/01/2017' }
    });
    wrapper.setState(({ error: null }));
    expect(wrapperInstance.dateInputField.state.inputValue).to.equal('01/01/2017');
    wrapperInstance.handleBlur({});
    expect(wrapperInstance.dateInputField.state.inputValue).to.equal('01/01/2017');
  });
});
