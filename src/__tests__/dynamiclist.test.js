import React from 'react';
import { expect } from 'chai';
import moxios from 'moxios';
import {spy, sinon} from 'sinon';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';

import Bucketlist from '../components/Bucketlist';
import Dynamiclist from '../components/Dynamiclist';


describe('Dynamiclist Page', () => {
  let wrapper;

  const item= {
    name: 'item one',
    id: 2,
  };

  const event = {
    target : {
      value: 'activity one',
      name: 'name',
    },
    preventDefault : () => {},
  },
  itemId = {id : 2},
  bucketobj  = { bucketobj :{
    id : 4
  }};

  beforeEach(() => {
    moxios.install()
    wrapper = mountWithContext(<Dynamiclist {...bucketobj} {...itemId} />);
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('has div with correct class', () => {
    expect(wrapper.find('.dynamiclist').length).to.equal(1);
  });

  it('adds a bucketlist item', () =>{
    wrapper.setState({name : 'activity one'});
    wrapper.instance().handleAddItem(event);
    expect(wrapper.instance().state.name).to.be.equal('activity one');
    wrapper.setState({name : ''});
    expect(wrapper.instance().state.name).to.be.equal('');
  });

  it('shows name has been entered', () => {
    wrapper.setState({name: ''})
    wrapper.instance().handleOpen(event);
    expect(wrapper.instance().state.name).to.equal('');
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
