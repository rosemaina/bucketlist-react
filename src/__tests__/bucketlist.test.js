import React from 'react';
import { expect } from 'chai';
import moxios from 'moxios';
import {spy, sinon} from 'sinon';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';

import Bucketlist from '../components/Bucketlist';


describe('Bucketlist Page', () => {
  let wrapper;

  const event = {
    target : {
      value: 'bucketlist one',
      title: 'title',
    },
    preventDefault : () => {}
  };

  beforeEach(() => {
    moxios.install();
    wrapper = mountWithContext(<Bucketlist />);
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('has div with correct class', () => {
    expect(wrapper.find('.bucketlist').length).to.equal(1);
  });

  it('adds a bucketlist', () =>{
    wrapper.setState({title : 'bucketlist one'});
    wrapper.instance().handleAddBucketlist(event);
    expect(wrapper.instance().state.title).to.be.equal('bucketlist one');
    wrapper.setState({title : ''});
    expect(wrapper.instance().state.title).to.be.equal('');
  });

  it('handling a new a bucketlist', () =>{
    wrapper.setState({title : 'bucketlist one'});
    wrapper.instance().handleNewBucketlist(event);
    expect(wrapper.instance().state.title).to.be.equal('bucketlist one');
  });

  it('handling a new a bucketlist', () =>{
    wrapper.setState({title : 'bucketlist one'});
    wrapper.instance().handleUpdateBucketlist(event);
    expect(wrapper.instance().state.title).to.be.equal('bucketlist one');
  });

  it('log out a user', () =>{
    wrapper.setState({logout_success: false});
    wrapper.instance().handleLogout(event);
    expect(wrapper.instance().state.logout_success).to.be.equal(true);
  });
  
});
