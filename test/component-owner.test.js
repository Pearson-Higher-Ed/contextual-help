/* global describe it expect */

import React              from 'react';
import enzyme             from 'enzyme';
import { ComponentOwner } from '../index';

const { shallow } = enzyme;

describe('Component Owner Suite',() => {

  const data = {text:{greeting:"Hi there!", buttonText:"say hello", placeholder: "placeholder"}};
  const wrapper = shallow(<ComponentOwner data={data} />);

  it('shallowly renders the component', function () {
    expect(wrapper.getElement(0).type).toEqual('div');
  });

  it('renders the correct text when the button is clicked', function () {
    wrapper.find('button').simulate('click');
  });

});
