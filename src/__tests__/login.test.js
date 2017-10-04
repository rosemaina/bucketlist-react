import React from 'react';
import { mountWithContext, shallowWithContext } from '../utils/test-utils';

import Login from '../components/Login';
import Register from '../components/Register';


describe('Login Page', () => {
  let registerWrapper;
  let loginWrapper;

  beforeEach(() => {
    loginWrapper = mountWithContext(<Login />);
  });

  it('has div with correct class', () => {
    expect(loginWrapper.find('.login').length).to.equal(1);
  });


  it('shows email has been entered', () => {
    const inputEmail = loginWrapper.find('#email');
    expect(inputEmail.length).to.equal(1);

    const target = {
      value: 'exapmle@email.com',
      name: 'email',
    };

    inputEmail.simulate('change', { target });
    loginWrapper.update();
    expect(loginWrapper.state().email).to.equal(target.value);
  });


  it('shows password has been entered', () => {
    const inputPassword = loginWrapper.find('#password');
    expect(inputPassword.length).to.equal(1);

    const target = {
      value: '',
      name: 'password',
    };

    inputPassword.simulate('change', { target });
    loginWrapper.update();
    expect(loginWrapper.state().password).to.equal(target.value);
  });


  it.only('shows that user can login', () => {
    const wrapper = mountWithContext(<Login />);
    wrapper.setState({login_success: false});
    expect(wrapper.find('.login').exists()).toBe(true);
    expect(wrapper.find('div.login').length).toEqual(1);
  });


});
