import React from 'react';
import { expect } from 'chai';
import { mountWithContext } from '../src/utils/test-utils';

import ChangePassword from '../src/components/ChangePassword';


describe('Change Password Page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithContext(<ChangePassword />);
  });

  it('has div with correct class', () => {
    expect(wrapper.find('.changePassword').length).to.equal(1);
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
