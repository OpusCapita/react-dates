import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import InputAddonButton from '.';

describe('<InputAddonButton />', () => {
  it('should have the right class name', () => {
    let wrapper = shallow(<InputAddonButton className="test-class-name" />);
    expect(wrapper).to.have.className('opuscapita_input-addon-button');
    expect(wrapper).to.have.className('test-class-name');
  });
});
