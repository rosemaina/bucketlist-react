import React from 'react';
import { expect } from 'chai';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';
import moxios from 'moxios';
import {spy, sinon} from 'sinon';

import Bucketlist from '../components/Bucketlist';
import Dynamiclist from '../components/Dynamiclist';


describe('Dynamiclist Page', () => {
  let wrapper;
  // let functionDelete;
  // let functionUpdate;

  beforeEach(() => {
    moxios.install();

    const bucketobj  = { bucketobj :{
      id : 4
    }};
    // functionDelete= spy(Bucketlist.prototype, 'handleDeleteBucketlist');
    // functionUpdate = spy(Bucketlist.prototype, 'handleUpdateBucketlist');
    wrapper = mountWithContext(<Dynamiclist {...bucketobj}  />);
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
    // functionDelete.restore();
    // functionUpdate.restore();

  });

  it.only('has div with correct class', () => {
    expect(wrapper.find('.dynamiclist').length).to.equal(1);
  });
});
