import React from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';


const LoggedinNavBar = (props) => {
  
  return (
    <div className="Navbar">
    <AppBar
      showMenuIconButton={false}
      title={props.navBarTitle}
      iconElementRight={
        <div>
          <RaisedButton label="Log Out" primary onClick={props.logout}/>
      </div>
      }
      
    />
  </div>
  );
};

// Type checking PropTypes (Validation)
LoggedinNavBar.propTypes = {
  logout: PropTypes.func,
  navBarTitle: PropTypes.string
};

export default LoggedinNavBar;