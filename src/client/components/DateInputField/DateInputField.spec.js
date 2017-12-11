import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import DateInputField from '.';

describe('<DateInputField />', () => {
  describe('callback props', () => {
    it('should call onFocus prop if date format input being focused', () => {
      const spy_1_1 = sinon.spy();
      const wrapper_1_1 = mount(<DateInputField onFocus={spy_1_1}/>, { attachTo: document.body });
      wrapper_1_1.find('input').simulate('focus');
      wrapper_1_1.detach();
    });

    it.skip('+ should call onBlur if all format inputs being unfocused', () => {
      let inputFocusSpy_1 = sinon.spy();
      let inputFocusSpy_2 = sinon.spy();
      let formatInputFocusSpy = sinon.spy();
      let formatInputBlurSpy = sinon.spy();
      let wrapper = mount((
        <div>
          <input className="input-1" onFocus={inputFocusSpy_1} />
          <DateInputField onBlur={formatInputBlurSpy} onFocus={formatInputFocusSpy} />
          <input className="input-2" onFocus={inputFocusSpy_2} />
        </div>
      ), { attachTo: document.body });
      let inputReactElement_1 = wrapper.find('.input-1').get(0);
      let inputReactElement_2 = wrapper.find('.input-2').get(0);
      let formatInputReactElement = wrapper.find('.opuscapita_date-input-field input').get(0);
      inputReactElement_1.focus();
      expect(inputFocusSpy_1.calledOnce).to.be.true;
      formatInputReactElement.focus();
      formatInputReactElement.blur();
      expect(formatInputFocusSpy.calledOnce).to.be.true;
      expect(formatInputBlurSpy.calledOnce).to.be.true;
      inputReactElement_2.focus();
      expect(inputFocusSpy_2.calledOnce).to.be.true;
      wrapper.detach();
    });

    it('validate date format DD/MM/YYYY', () => {
      let onChangeHandler = sinon.spy();
      let onErrorHandler = sinon.spy();
      let wrapper = mount(
        <DateInputField
          dateFormat="DD/MM/YYYY"
          onChange={onChangeHandler}
          onError={onErrorHandler}
        />
      );
      let wrapperInstance = wrapper.instance();
      wrapperInstance.handleInputChange({ target: { value: '12/11/2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('12/11/2017');
      expect(onChangeHandler.calledOnce).to.be.true;
      wrapperInstance.handleInputChange({ target: { value: '02/01/2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('02/01/2017');
      expect(onChangeHandler.calledTwice).to.be.true;
      wrapperInstance.handleInputChange({ target: { value: '2/2/2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('2/2/2017');
      expect(onErrorHandler.calledOnce).to.be.true;
    });

    it('validate date format D/M/YYYY', () => {
      let onChangeHandler = sinon.spy();
      let onErrorHandler = sinon.spy();
      let wrapper = mount(
        <DateInputField
          dateFormat="D/M/YYYY"
          onChange={onChangeHandler}
          onError={onErrorHandler}
        />
      );
      let wrapperInstance = wrapper.instance();
      wrapperInstance.handleInputChange({ target: { value: '12/11/2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('12/11/2017');
      expect(onChangeHandler.calledOnce).to.be.true;
      wrapperInstance.handleInputChange({ target: { value: '02/01/2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('02/01/2017');
      expect(onChangeHandler.calledTwice).to.be.true;
      wrapperInstance.handleInputChange({ target: { value: '2/2/2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('2/2/2017');
      expect(onChangeHandler.calledThrice).to.be.true;
      expect(onErrorHandler.callCount).to.equal(0);
    });

    it('validate date format D.M.YYYY', () => {
      let onChangeHandler = sinon.spy();
      let onErrorHandler = sinon.spy();
      let wrapper = mount(
        <DateInputField
          dateFormat="D.M.YYYY"
          onChange={onChangeHandler}
          onError={onErrorHandler}
        />
      );
      let wrapperInstance = wrapper.instance();
      wrapperInstance.handleInputChange({ target: { value: '12.11.2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('12.11.2017');
      expect(onChangeHandler.calledOnce).to.be.true;
      wrapperInstance.handleInputChange({ target: { value: '02.01.2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('02.01.2017');
      expect(onChangeHandler.calledTwice).to.be.true;
      wrapperInstance.handleInputChange({ target: { value: '2.2.2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('2.2.2017');
      expect(onChangeHandler.calledThrice).to.be.true;
      expect(onErrorHandler.callCount).to.equal(0);
      wrapperInstance.handleInputChange({ target: { value: '2.22.2017' }});
      expect(wrapperInstance.state.inputValue).to.equal('2.22.2017');
      expect(onChangeHandler.calledThrice).to.be.true;
      expect(onErrorHandler.calledOnce).to.be.true;
    });

    it('clear', () => {
      let wrapper = mount(
        <DateInputField
          dateFormat="D.M.YYYY"
        />
      );
      let wrapperInstance = wrapper.instance();
      wrapperInstance.clear();
      expect(wrapperInstance.state.inputValue).to.equal('');
    });
  });
});
