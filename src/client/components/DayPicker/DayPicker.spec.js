import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactDayPicker from 'react-day-picker';
import DayPicker from '.';

describe('<DayPicker />', () => {
  it('should have default props', () => {
    let component = <DayPicker />;
    expect(component.props.className).to.equal('');
  });

  it('should have the right class name', () => {
    let wrapper = shallow(<DayPicker className="test-class-name" />);
    expect(wrapper).to.have.className('opuscapita_day-picker');
    expect(wrapper).to.have.className('test-class-name');
  });

  it('should pass props to ReactDayPicker', () => {
    let wrapper = shallow(<DayPicker className="test-class-name" firstDayOfWeek={0} />);
    let reactDayPicker = wrapper.find(ReactDayPicker);
    expect(reactDayPicker).to.have.prop('firstDayOfWeek', 0);
  });
});
