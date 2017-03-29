import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import DateInput from '.';

describe('<DateInput2 />', () => {
  it('should have default props', () => {

  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DateInput className="test-class-name" />);
    expect(wrapper).to.have.className('test-class-name');
    expect(wrapper).to.have.className('date-input');
  });

  it('should became disabled if disabled prop is truthy', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should display dateFormat if date prop not specified', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should render dateFormat separators as non-focusable elements', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should render dateFormat parts as focusable elements', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should render dateFormat parts as inputs', () => {
    let wrapper = shallow(<DateInput />);
  });

  describe('callback props', () => {
    it('should fire onChange prop if entered valid value to dateFormat part', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should\'t call onChange prop if entered invalid value to dateFormat part', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should call onFocus prop', () => {
      let spy = sinon.spy();
      let wrapper = mount(<DateInput onFocus={spy} />);
      let formatPartInput = wrapper.find('.opuscapita_date-input__format-part-input').first();
      formatPartInput.simulate('focus');
      expect(spy).to.have.been.called;
    });

    it('should\'t call onFocus prop if one of format inputs has been focused', () => {
      let spy = sinon.spy();
      let wrapper = mount(<DateInput onFocus={spy} />);
      let firstFormatPartInput = wrapper.find('.opuscapita_date-input__format-part-input').at(0);
      let secondFormatPartInput = wrapper.find('.opuscapita_date-input__format-part-input').at(1);
      let thirdFormatPartInput = wrapper.find('.opuscapita_date-input__format-part-input').at(2);

      firstFormatPartInput.simulate('focus');
      secondFormatPartInput.simulate('focus');
      thirdFormatPartInput.simulate('focus');
      expect(spy).to.have.been.calledOnce;
    });

    it('should call onBlur prop', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should call onChange prop on date-picker value selection', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should call onChange prop on date-picker value selection', () => {
      let wrapper = shallow(<DateInput />);
    });

  });

  describe('key navigation', () => {
    it('should move to next dateFormat part on pres Right-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to next dateFormat part on press TAB', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to prev dateFormat part on press Left-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to prev dateFormat part on press Shift-TAB', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to next focusable element in DOM on press TAB if last dateFormat part selected', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to prev focusable element in DOM on press Shift-TAB if first dateFormat part selected', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should change dateFormat part to next possible value on press Down-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should change dateFormat part to prev possible value on press Up-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });
  });
});

// it('should show date-picker popup on focus', () => {
//   let wrapper = shallow(<DateInput />);
// });

// it('should hide date-picker popup on blur', () => {
//   let wrapper = shallow(<DateInput />);
// });

// it('should\'t show date-picker popup on focus if allowShowPicker prop is truthy', () => {
//   let wrapper = shallow(<DateInput />);
// });
