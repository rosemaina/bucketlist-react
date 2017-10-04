import React from 'react';
import { expect } from 'chai';
import Bucketlist from '../components/Bucketlist';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';


describe('Bucketlist Page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithContext(<Bucketlist />);
  });


  it.only('has div with correct class', () => {
    expect(wrapper.find('.bucketlist').length).to.equal(1);
  });
});
