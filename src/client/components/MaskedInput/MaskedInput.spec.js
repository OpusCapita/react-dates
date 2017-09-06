import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import MaskedInput from '../MaskedInput';
import DateInput from '../DateInput';
import DateInputField from '../DateInputField';

function getRegExp(dateFormat = 'dd/MM/yyyy') {
  const sep = dateFormat.split('').filter(ch => !ch.match(/[a-zA-Z]/g)).map(sep => sep)[0];
  return new RegExp(`\\bD(?=\\${sep})|\\bM(?=\\${sep})`, 'g');
}

function getMask(dateFormat = 'dd/MM/yyyy') {
  const regExpDM = getRegExp(dateFormat);
  return dateFormat.replace(regExpDM, '  ').replace(/[a-zA-Z]/g, '1');
}

const event = { preventDefault() {}, stopPropagation() {} };

function setPositions({ wrapperInstance, start, end }) {
  wrapperInstance.mask.selection.start = start;
  wrapperInstance.mask.selection.end = end;
  wrapperInstance._updateInputSelection();
}

function enterString(wrapper, string) {
  for (let i = 0; i < string.length; i++) {
    wrapper.simulate('keyPress', { key: string[i] });
  }
}

function pasteString(wrapper, string) {
  wrapper.simulate('paste', {
    ...event,
    clipboardData: { getData: () => string }
  });
}

function getWrappers(dateFormat, placeholderChar = '_') {
  const mask = getMask(dateFormat);
  const component = (<MaskedInput
    className="opuscapita_date-input-field form-control"
    dateFormat={dateFormat}
    placeholderChar={placeholderChar}
    mask={mask}
  />);
  const wrapper = mount(component);
  const wrapperInstance = wrapper.instance();
  const inputWrapper = wrapper.find('.form-control');
  return { component, wrapper, wrapperInstance, inputWrapper };
}


describe('<MaskedInput />', () => {
  it('should have default props', () => {
    const mask = getMask();
    let component = (<MaskedInput
      mask={mask}
    />);
    expect(component.props.value).to.equal('');
    expect(component.props.className).to.equal(undefined);
    expect(component.props.dateFormat).to.equal(undefined);
    expect(component.props.mask).to.equal("11/11/1111");
  });

  it('should have the right class name', () => {
    const { component } = getWrappers('dd/MM/yyyy');
    expect(component.props.value).to.equal('');
    expect(component.props.className).to.equal('opuscapita_date-input-field form-control');
  });

  it('should have the mask', () => {
    let dateFormat="D/M/yyyy";
    let dateInputReact = (<DateInput
      dateFormat={dateFormat}
      disabled={false}
      locale="en"
    />);
    let dateInputShallow = shallow(dateInputReact);
    let maskedInputFind = dateInputShallow.find(DateInputField).shallow().find(MaskedInput);
    expect(maskedInputFind.get(0).props.mask).to.equal('  /  /1111');

    dateFormat="dd/MM/yyyy";
    dateInputReact = (<DateInput
      dateFormat={dateFormat}
      disabled={false}
      locale="en"
    />);
    dateInputShallow = shallow(dateInputReact);
    maskedInputFind = dateInputShallow.find(DateInputField).shallow().find(MaskedInput);
    expect(maskedInputFind.get(0).props.mask).to.equal('11/11/1111');
  });

  it('dateFormat="dd/MM/yyyy", enter date', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('dd/MM/yyyy');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2121");
  });

  it('dateFormat="D/M/yyyy", enter date 01/01/2121', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('D/M/yyyy');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2121");
  });

  it('dateFormat="D/M/yyyy", enter date " 1/ 1/2121"', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('D/M/yyyy');
    enterString(inputWrapper, ' 1 1');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/____");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/2121");
  });

  it('dateFormat="D.M.yyyy", enter date " 1. 1.2121"', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('D.M.yyyy', '‒');
    enterString(inputWrapper, ' 1 1');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.‒‒‒‒");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.2121");
  });

  it('dateFormat="D/M/yyyy", paste strings 01/01/2121 and 1/1/2121', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('D/M/yyyy', '‒');
    pasteString(inputWrapper, '01/01/2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2121");
    pasteString(inputWrapper, '1/1/2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/2121");
    pasteString(inputWrapper, ' 1/ 1/2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/2121");
  });

  it('dateFormat="D.M.yyyy", paste strings 01.01.2121 and 1.1.2121', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('D.M.yyyy', '‒');
    pasteString(inputWrapper, '01.01.2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01.01.2121");
    pasteString(inputWrapper, '1.1.2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.2121");
    pasteString(inputWrapper, ' 1. 1.2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.2121");
  });

  it('move positions', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('dd/MM/yyyy');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 6, end: 6 });
    setPositions({ wrapperInstance, start: 5, end: 5 });
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 5, end: 5 });
    inputWrapper.simulate('keyDown', { key: 'Backspace' });
    expect(wrapperInstance.mask.getValue()).to.equal("01/0_/____");
  });

  it('delete selecting (Backspace)', () => {
    const { wrapperInstance, inputWrapper } = getWrappers('dd/MM/yyyy');
    enterString(inputWrapper, '01012017');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2017");
    setPositions({ wrapperInstance, start: 3, end: 8 });
    inputWrapper.simulate('keyDown', { key: 'Backspace' });
    expect(wrapperInstance.mask.getValue()).to.equal("01/__/__17");
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 3, end: 3 });
  });

  it.skip('delete selecting (Delete)', (done) => {
    const { wrapperInstance, inputWrapper } = getWrappers('dd/MM/yyyy');
    enterString(inputWrapper, '01012017');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2017");
    setPositions({ wrapperInstance, start: 3, end: 8 });
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 3, end: 8 });
    inputWrapper.simulate('keyDown', { key: 'Delete' });
    setTimeout(() => {
      expect(wrapperInstance.mask.selection).to.deep.equal({ start: 8, end: 8 });
      expect(wrapperInstance.mask.getValue()).to.equal("01/__/__17");
      done();
    }, 0);
  });
});
