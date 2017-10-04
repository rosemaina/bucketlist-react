import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';

export const getContext = () => ({
  context: {
    muiTheme: getMuiTheme(),
    router: {
      history: {
        push() {},
        createHref() {},
        replace() {},
      },
    },
  },
  childContextTypes: {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  },
});

export const mountWithContext = node => mount(node, getContext());
export const shallowWithContext = node => shallow(node, getContext());
