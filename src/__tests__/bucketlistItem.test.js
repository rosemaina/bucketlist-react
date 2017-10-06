import React from 'react';
import { expect } from 'chai';
import moxios from 'moxios';
import  sinon from 'sinon';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';

import BucketItems from '../components/BucketItems';


describe('Bucketlist Page', () => {
  let wrapper;

  const event = {
    target : {
      value: 'bucketlist one',
      name: 'item one',
    },
    id: 1,
    preventDefault : () => {}
  };

  const props = {
    match: {params: {id:1}}
  }
  
  beforeEach(() => {
    moxios.install();
    
    wrapper = mountWithContext(<BucketItems {...props} />);
    wrapper.setState({items:[{id: 1, name: 'try'}]})
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('has div with correct class', () => {
    expect(wrapper.find('.items').length).to.equal(1);
  });

  it('handling a updating a bucketlist item', () =>{
    wrapper.setState({name : 'item one'});
    wrapper.instance().handleUpdateBucketItem(event);
    expect(wrapper.instance().state.name).to.be.equal('item one');
  });

  it('handling a deleting a bucketlist item', () =>{
    wrapper.setState({name : 'item one'});
    wrapper.instance().handleDeleteBucketItem(event, props);
    expect(wrapper.instance().state.name).to.be.equal('item one');
  });

  it('open main modal for showing bucketlist items ', () =>{
    wrapper.setState({open : false});
    wrapper.instance().handleOpen(event);
    expect(wrapper.instance().state.open).to.be.equal(true);
  });

  it('Closes main modal for showing bucketlist items', () =>{
    wrapper.setState({open : true});
    wrapper.instance().handleClose(event);
    expect(wrapper.instance().state.open).to.be.equal(false);
  });

  it('log out a user', () =>{
    wrapper.setState({logout_success: false});
    wrapper.instance().handleLogout({preventDefault: () => {}});
    expect(wrapper.instance().state.logout_success).to.be.equal(true);
  });

  it('finds handleUpdateBucketItem is called', () =>{
    sinon.spy(BucketItems.prototype, 'handleUpdateBucketItem');
    const wrapper = mountWithContext(<BucketItems {...props}/>);
    wrapper.instance().handleUpdateBucketItem({target: {value: ''}});
    expect(BucketItems.prototype.handleUpdateBucketItem.called).to.be.equal(true);
  });
});
