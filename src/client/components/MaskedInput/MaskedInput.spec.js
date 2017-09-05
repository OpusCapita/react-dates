import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import MaskedInput from '../MaskedInput';
import DateInput from '../DateInput';
import DateInputField from '../DateInputField';

function getRegExp(dateFormat = 'dd/MM/yyyy') {
  const sep = dateFormat.split('').filter(ch => !ch.match(/[a-zA-Z]/g)).map(sep => sep)[0];
  // const regExpD = new RegExp(`\\bD(?=\\${sep})`, 'g');
  // const regExpM = new RegExp(`\\bM(?=\\${sep})`, 'g');
  const regExpDM = new RegExp(`\\bD(?=\\${sep})|\\bM(?=\\${sep})`, 'g');
  return { /*regExpD, regExpM, */regExpDM };
}

function getMask(dateFormat = 'dd/MM/yyyy') {
  const { regExpDM } = getRegExp(dateFormat);
  return dateFormat.replace(regExpDM, '  ').replace(/[a-zA-Z]/g, '1');
}

const event = { preventDefault() {}, stopPropagation() {} };

function moveToLeft(wrapper, pos, hasShift = false) {
  for (let i = 0; i < pos; i++) {
    wrapper.simulate('keyDown', { shiftKey: hasShift, key: 'ArrowLeft' });
  }
}

const WITH_SHIFT = true;

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

describe('<MaskedInput />', () => {
  const mask = getMask();
  it('should have default props', () => {
    let component = (<MaskedInput
      mask={mask}
    />);

    // TODO: work with react component

    expect(component.props.value).to.equal('');
    expect(component.props.className).to.equal(undefined);
    expect(component.props.dateFormat).to.equal(undefined);
    expect(component.props.mask).to.equal("11/11/1111");
  });

  it('should have the right class name', () => {
    const dateFormat="dd/MM/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
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
    const dateFormat="dd/MM/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2121");
  });

  it('dateFormat="D/M/yyyy", enter date 01/01/2121', () => {
    const dateFormat="D/M/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2121");
  });

  it('dateFormat="D/M/yyyy", enter date " 1/ 1/2121"', () => {
    const dateFormat="D/M/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    enterString(inputWrapper, ' 1 1');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/____");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/2121");
  });

  it('dateFormat="D.M.yyyy", enter date " 1. 1.2121"', () => {
    const dateFormat="D.M.yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      placeholderChar="‒"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    enterString(inputWrapper, ' 1 1');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.‒‒‒‒");
    enterString(inputWrapper, '2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.2121");
  });

  it('dateFormat="D/M/yyyy", paste strings 01/01/2121 and 1/1/2121', () => {
    const dateFormat="D/M/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      placeholderChar="‒"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    pasteString(inputWrapper, '01/01/2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/2121");
    pasteString(inputWrapper, '1/1/2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/2121");
    pasteString(inputWrapper, ' 1/ 1/2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1/ 1/2121");
  });

  it('dateFormat="D.M.yyyy", paste strings 01.01.2121 and 1.1.2121', () => {
    const dateFormat="D.M.yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      placeholderChar="‒"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    pasteString(inputWrapper, '01.01.2121');
    expect(wrapperInstance.mask.getValue()).to.equal("01.01.2121");
    pasteString(inputWrapper, '1.1.2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.2121");
    pasteString(inputWrapper, ' 1. 1.2121');
    expect(wrapperInstance.mask.getValue()).to.equal(" 1. 1.2121");
  });

  it('move positions', () => {
    const dateFormat="dd/MM/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 6, end: 6 });
    moveToLeft(inputWrapper, 2);
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 4, end: 4 });
  });

  it('select chars', function() {
    const dateFormat="dd/MM/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    enterString(inputWrapper, '0101');
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 6, end: 6 });
    moveToLeft(inputWrapper, 3);
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 3, end: 3 });
    moveToLeft(inputWrapper, 3, WITH_SHIFT);
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 0, end: 3 });

    enterString(inputWrapper, '1');
    expect(wrapperInstance.mask.getValue()).to.equal("1_/01/____");
    expect(wrapperInstance.mask.selection).to.deep.equal({ start: 1, end: 1 });
  });

  it.skip('should have the right class name', () => {
    const dateFormat="dd/MM/yyyy";
    const mask = getMask(dateFormat);
    let component = (<MaskedInput
      className="opuscapita_date-input-field form-control"
      dateFormat={dateFormat}
      mask={mask}
    />);
    expect(component.props.value).to.equal('');
    expect(component.props.className).to.equal('opuscapita_date-input-field form-control');
    expect(component.props.dateFormat).to.equal(dateFormat);
    expect(component.props.mask).to.equal("11/11/1111");

    const wrapper = mount(component);
    const wrapperInstance = wrapper.instance();
    const inputWrapper = wrapper.find('.form-control');
    inputWrapper.simulate('keyPress', { key: '0'});
    inputWrapper.simulate('keyPress', { key: '1'});
    inputWrapper.simulate('keyPress', { key: '0'});
    inputWrapper.simulate('keyPress', { key: '1'});
    expect(wrapperInstance.mask.getValue()).to.equal("01/01/____");
    expect(wrapperInstance.mask.selection.start).to.equal(6);
    expect(wrapperInstance.input.selectionStart).to.equal(6);
    expect(wrapperInstance.input.selectionEnd).to.equal(6);
    wrapper.find('.form-control').simulate('keyDown', { key: 'ArrowLeft' });
    wrapper.find('.form-control').simulate('keyDown', { key: 'ArrowLeft' });

    this.timeout(1);
    // setTimeout(() => {
      expect(wrapperInstance.input.selectionStart).to.equal(4);
      expect(wrapperInstance.input.selectionEnd).to.equal(4);
    // }, 0);

    // key <- ArrowLeft
    // key -> ArrowRight

    console.log(wrapperInstance);
    // console.log(wrapperInstance.mask.value);
    // console.log(wrapperInstance.mask.getValue());
  });

  it.skip('should have the mask', () => {
    let dateFormat="dd/MM/yyyy";
    let dateInputReact = (<DateInputField
      dateFormat={dateFormat}
      disabled={false}
      onBlur={() => null}
      onChange={() => null}
      onClick={() => null}
      onError={() => null}
      onFocus={() => null}
      onRef={dateInputField => (this.dateInputField = dateInputField)}
      tabIndex='10'
      value={null}
    />);
    let dateInputShallow = shallow(dateInputReact);
    let maskedInputFind = dateInputShallow.find(MaskedInput);
    expect(maskedInputFind.get(0).props.mask).to.equal('11/11/1111');

    dateInputShallow.simulate('keyPress', { key: '0'});
    dateInputShallow.simulate('keyPress', { key: '1'});
    dateInputShallow.simulate('keyPress', { key: '0'});
    dateInputShallow.simulate('keyPress', { key: '1'});
    dateInputShallow.simulate('keyPress', { key: '2'});
    dateInputShallow.simulate('keyPress', { key: '1'});
    dateInputShallow.simulate('keyPress', { key: '1'});
    dateInputShallow.simulate('keyPress', { key: '1'});

    console.log(dateInputShallow.state());
  });

  it.skip('should process onKeyPress event', () => {
    const dateFormat="dd/MM/yyyy";
    const dateInputReact = (<DateInput
      dateFormat="dd/MM/yyyy"
      disabled={true}
      locale="en"
    />);
    let dateInputShallow = shallow(dateInputReact);
    console.log(dateInputShallow.html());

    expect(dateInputShallow.find(DateInputField)).to.have.length(1);
    const dateInputField = dateInputShallow.find(DateInputField);
    expect(dateInputField.shallow().find(MaskedInput)).to.have.length(1);
    const maskedInputFind = dateInputField.shallow().find(MaskedInput);
    expect(maskedInputFind.get(0).props.mask).to.equal('11/11/1111');


    // maskedInputFind.simulate('keyPress', { key: '0' });
    //
    // console.log(JSON.stringify(dateInputField.get(0).props));
    // console.log(JSON.stringify(maskedInputFind.get(0).props));
    // console.log(JSON.stringify(maskedInputFind.get(0).input));
    //
    // maskedInputFind.at(0).simulate('keyPress', { key: '0'});
    // console.log(JSON.stringify(maskedInputFind.get(0)));
    console.log(JSON.stringify(maskedInputFind.get(0).mask));
    // console.log(maskedInputFind.get(0).onChange);


    // let dateInputFind = dateInputShallow.find('.date-input');
    // expect(dateInputFind.length).to.equal(1);
    // dateInputFind.simulate('click');
    // dateInputFind.simulate('keyPress', { key: '0'});


    // let maskedInput = dateInputShallow.find('.opuscapita_date-input-field');
    // expect(maskedInput.length).to.equal(1);
    // maskedInput.simulate('click');



    // maskedInput.simulate('click');
    // // maskedInput.simulate('keyPress', { preventDefault: ()=> undefined, key: '0' });
    //
    // expect(wrapper1).to.have.className('date-input');
    // // expect(maskedInput.hasClass("form-control")).to.equal(true);
  });
});
