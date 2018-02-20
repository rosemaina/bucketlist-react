import React from 'react';
import moxios from 'moxios';
import  sinon from 'sinon';
import { mountWithContext, shallowWithContext } from '../src/utils/test-utils';

import Login from '../src/components/Login';
import Register from '../src/components/Register';


describe('Login Page', () => {
  let registerWrapper;
  let loginWrapper;

  beforeEach(() => {
    moxios.install();
    loginWrapper = mountWithContext(<Login />);
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  })

  it('has div with correct class', () => {
    expect(loginWrapper.find('.login').length).toEqual(1);
  });


  it('shows email has been entered', () => {
    const inputEmail = loginWrapper.find('#email');
    expect(inputEmail.length).toEqual(1);

    const target = {
      value: 'exapmle@email.com',
      name: 'email',
    };

    it('finds prev page', () =>{
      sinon.spy(Login.prototype, 'login');
      const wrapper = mountWithContext(<Login />);
      wrapper.instance().login();
      expect(Login.prototype.login.called).toEqual(true);
    });

    inputEmail.simulate('change', { target });
    loginWrapper.update();
    expect(loginWrapper.state().email).toEqual(target.value);
  });

  it('shows password has been entered', () => {
    const inputPassword = loginWrapper.find('#password');
    expect(inputPassword.length).toEqual(1);

    const target = {
      value: '',
      name: 'password',
    };

    inputPassword.simulate('change', { target });
    loginWrapper.update();
    expect(loginWrapper.state().password).toEqual(target.value);
  });

  it('shows that user can login', () => {
    const wrapper = mountWithContext(<Login />);
    wrapper.setState({login_success: false});
    expect(wrapper.find('.login').exists()).toBe(true);
    expect(wrapper.find('div.login').length).toEqual(1);
  });

  it('log out a user', () =>{
    loginWrapper.setState({logout_success: false});
    loginWrapper.instance().handleLogout({preventDefault: () => {}});
    expect(loginWrapper.instance().state.logout_success).toEqual(true);
  });
});
