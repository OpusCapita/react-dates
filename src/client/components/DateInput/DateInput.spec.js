import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DateInput from '.';

describe('<DateInput />', () => {
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

  it('should trigger onFocus property', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should display date-mask if date prop not specified', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should render date-mask separators as non-focusable elements', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should render date-mask parts as focusable elements', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should render date-mask parts as inputs', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should fire onChange prop if entered valid value to date-mask part', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should\'t call onChange prop if entered invalid value to date-mask part', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should call onFocus prop', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should call onBlur prop', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should show date-picker popup on focus', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should hide date-picker popup on blur', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should\'t show date-picker popup on focus if allowShowPicker prop is truthy', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should call onChange prop on date-picker value selection', () => {
    let wrapper = shallow(<DateInput />);
  });

  it('should call onChange prop on date-picker value selection', () => {
    let wrapper = shallow(<DateInput />);
  });

  describe('key navigation', () => {
    it('should move to next date-mask part on pres Right-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to next date-mask part on press TAB', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to prev date-mask part on press Left-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to prev date-mask part on press Shift-TAB', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to next focusable element in DOM on press TAB if last date-mask part selected', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should move to prev focusable element in DOM on press Shift-TAB if first date-mask part selected', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should change date-mask part to next possible value on press Down-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });

    it('should change date-mask part to prev possible value on press Up-Arrow', () => {
      let wrapper = shallow(<DateInput />);
    });
  });
});
