import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import InputAddonButton from '.';

describe('<InputAddonButton />', () => {
  it('should have the right class name', () => {
    let wrapper = shallow(<InputAddonButton className="test-class-name" />);
    expect(wrapper.hasClass('opuscapita_input-addon-button')).to.be.true;
    expect(wrapper.hasClass('test-class-name')).to.be.true;
  });
});
