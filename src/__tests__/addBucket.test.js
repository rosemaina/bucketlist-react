import React from 'react';
import { expect } from 'chai';
import { shallowWithContext, mountWithContext } from '../utils/test-utils';
import moxios from 'moxios';
import {spy, sinon} from 'sinon';

import Bucketlist from '../components/Bucketlist';
import Addbucket from '../components/Addbucket';


describe('Addbucket Page', () => {
  let wrapper;

  beforeEach(() => {
    moxios.install();

    const bucketobj  = { bucketobj :{
      id : 4
    }};
    wrapper = mountWithContext(<Addbucket {...bucketobj} />);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('has div with correct class', () => {
    expect(wrapper.find('.addBucket').length).to.equal(1);
  });
});
