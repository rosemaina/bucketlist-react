import React from 'react';
import { expect } from 'chai';
import BucketItems from '../components/BucketItems';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';


describe('Bucketlist Page', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      match: {params: {id:1}}
    }
    wrapper = mountWithContext(<BucketItems {...props}/>);
    wrapper.setState({items:[{id: 1, name: 'try'}]})
  });


  it.only('has div with correct class', () => {
    expect(wrapper.find('.items').length).to.equal(1);
  });
});
