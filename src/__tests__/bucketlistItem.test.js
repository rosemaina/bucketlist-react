import React from 'react';
import { expect } from 'chai';
import moxios from 'moxios';
import {spy, sinon} from 'sinon';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';

import BucketItems from '../components/BucketItems';


describe('Bucketlist Page', () => {
  let wrapper;

  const event = {
    target : {
      value: 'bucketlist one',
      name: 'item one',
    },
    preventDefault : () => {}
  };

  const props = {
    match: {params: {id:1}}
  }

  beforeEach(() => {
    moxios.install();
    
    wrapper = mountWithContext(<BucketItems {...props}/>);
    wrapper.setState({items:[{id: 1, name: 'try'}]})
  });

  
  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });


  it.only('has div with correct class', () => {
    expect(wrapper.find('.items').length).to.equal(1);
  });

  it.only('handling a updating a bucketlist item', () =>{
    wrapper.setState({name : 'item one'});
    wrapper.instance().handleUpdateBucketItem(event);
    expect(wrapper.instance().state.name).to.be.equal('item one');
  });








  it('open main modal for showing bucketlist items ', () =>{
    wrapper.setState({open : false});
    wrapper.instance().handleOpen(event);
    expect(wrapper.instance().state.open).to.be.equal(true);
  });

  it('open main modal for editing bucketlist', () =>{
    wrapper.setState({openEdit : false});
    wrapper.instance().handleOpenEdit(event);
    expect(wrapper.instance().state.openEdit).to.be.equal(true);
  });

  it('open main modal for adding bucketlist', () =>{
    wrapper.setState({openAdd : false});
    wrapper.instance().handleOpenAdd(event);
    expect(wrapper.instance().state.openAdd).to.be.equal(true);
  });

  it('Closes main modal for showing bucketlist items', () =>{
    wrapper.setState({open : true});
    wrapper.instance().handleClose(event);
    expect(wrapper.instance().state.open).to.be.equal(false);
  });

  it('Closes modal for editing a bucketlist', () =>{
    wrapper.setState({openEdit : true});
    wrapper.instance().handleClose(event);
    expect(wrapper.instance().state.openEdit).to.be.equal(false);
  });

  it('Closes modal for adding a bucketlist', () =>{
    wrapper.setState({openAdd : true});
    wrapper.instance().handleClose(event);
    expect(wrapper.instance().state.openAdd).to.be.equal(false);
  });
});
