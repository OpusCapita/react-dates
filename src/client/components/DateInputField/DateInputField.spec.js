import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import DateInputField from '.';

describe('<DateInputField />', () => {
  // it('should have default props', () => {

  // });

  // it('should have the right class name', () => {
  //   let wrapper = shallow(<DateInputField className="test-class-name" />);
  //   expect(wrapper.hasClass('test-class-name')).to.be.true;
  //   expect(wrapper.hasClass('opuscapita_date-input')).to.be.true;
  // });

  // it('should became disabled if disabled prop is truthy', () => {
  //   let wrapper = shallow(<DateInputField />);
  // });

  // it('should display dateFormat if date prop not specified', () => {
  //   let wrapper = shallow(<DateInputField />);
  // });

  // it('should render dateFormat separators as non-focusable elements', () => {
  //   let wrapper = shallow(<DateInputField />);
  // });

  // it('should render dateFormat parts as focusable elements', () => {
  //   let wrapper = shallow(<DateInputField />);
  // });

  // it('should render dateFormat parts as inputs', () => {
  //   let wrapper = shallow(<DateInputField />);
  // });

  describe('callback props', () => {
    // it('should fire onChange prop if entered valid value to dateFormat part', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should\'t call onChange prop if entered invalid value to dateFormat part', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    it('should call onFocus prop if date format input being focused', () => {
      let spy_1_1 = sinon.spy();
      let wrapper_1_1 = mount(<DateInputField onFocus={spy_1_1} />, { attachTo: document.body });
      let inputReactElement_1_1 = wrapper_1_1.find('.opuscapita_date-input__format-part-input').get(0);
      inputReactElement_1_1.focus();
      expect(spy_1_1.calledOnce).to.be.true;
      wrapper_1_1.detach();

      let spy_2_1 = sinon.spy();
      let wrapper_2_1 = mount(<DateInputField onFocus={spy_2_1} />, { attachTo: document.body });
      let inputReactElement_2_1 = wrapper_2_1.find('.opuscapita_date-input__format-part-input').get(1);
      let inputReactElement_2_2 = wrapper_2_1.find('.opuscapita_date-input__format-part-input').get(2);
      inputReactElement_2_1.focus();
      inputReactElement_2_2.focus();
      expect(spy_2_1.calledOnce).to.be.true;
      wrapper_2_1.detach();
    });

    it('should call onBlur if all format inputs being unfocused', () => {
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
      let formatInputReactElement = wrapper.find('.opuscapita_date-input__format-part-input').get(0);

      inputReactElement_1.focus();
      expect(inputFocusSpy_1.calledOnce).to.be.true;
      formatInputReactElement.focus();
      expect(formatInputFocusSpy.calledOnce).to.be.true;
      inputReactElement_2.focus();
      expect(inputFocusSpy_2.calledOnce).to.be.true;
      wrapper.detach();
    }
      );

    // it('should call onChange prop on date-picker value selection', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should call onChange prop on date-picker value selection', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });
  });

  describe('key navigation', () => {
    it('should move to next dateFormat part on press Right-Arrow', () => {
      // let root = document.createElement('div');
      // root.id = 'root';
      // document.body.appendChild(root);
      // ReactDOM.render(<DateInputField />, root);

      // let inputReactElement_1 = root.querySelectorAll('.opuscapita_date-input__format-part-input')[0];
      // let inputReactElement_3 = root.querySelectorAll('.opuscapita_date-input__format-part-input')[2];

      // inputReactElement_1.focus();
      // console.log('!!! ACTIVE ELEMENT 1:', document.activeElement);

      // let inputReactElement_2 = root.querySelectorAll('.opuscapita_date-input__format-part-input')[1];
      // let event = document.createEvent('Event');
      // event.initEvent('keydown', true, true);
      // event.which = 39;
      // event.keyCode = 39;
      // document.dispatchEvent(event);
      // console.log('!!! ACTIVE ELEMENT 2:', document.activeElement);
    });

    // it('should move to next dateFormat part on press TAB', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should move to prev dateFormat part on press Left-Arrow', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should move to prev dateFormat part on press Shift-TAB', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should move to next focusable element in DOM on press TAB if last dateFormat part selected', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should move to prev focusable element in DOM on press Shift-TAB if first dateFormat part selected', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should change dateFormat part to next possible value on press Down-Arrow', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });

    // it('should change dateFormat part to prev possible value on press Up-Arrow', () => {
    //   let wrapper = shallow(<DateInputField />);
    // });
  });
});

// it('should show date-picker popup on focus', () => {
//   let wrapper = shallow(<DateInputField />);
// });

// it('should hide date-picker popup on blur', () => {
//   let wrapper = shallow(<DateInputField />);
// });

// it('should\'t show date-picker popup on focus if allowShowPicker prop is truthy', () => {
//   let wrapper = shallow(<DateInputField />);
// });
