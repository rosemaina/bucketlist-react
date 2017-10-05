import React from 'react';
import { expect } from 'chai';
import Register from '../components/Register';
import { mountWithContext } from '../utils/test-utils';


describe('Sign up Page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithContext(<Register />);
  });

  it('has div with correct class', () => {
    expect(wrapper.find('.register').length).to.equal(1);
  });


  it('shows email has been entered', () => {
    const inputEmail = wrapper.find('#email');
    expect(inputEmail.length).to.equal(1);

    const target = {
      value: 'exapmle@email.com',
      name: 'email',
    };

    inputEmail.simulate('change', { target });
    wrapper.update();
    expect(wrapper.state().email).to.equal(target.value);
  });


  it('shows password has been entered', () => {
    const inputPassword = wrapper.find('#password');
    expect(inputPassword.length).to.equal(1);

    const target = {
      value: '',
      name: 'password',
    };

    inputPassword.simulate('change', { target });
    wrapper.update();
    expect(wrapper.state().email).to.equal(target.value);
  });
});
