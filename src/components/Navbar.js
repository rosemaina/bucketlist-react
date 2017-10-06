import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';


const Navbar = (props) => (
  <div className="Navbar">
    <AppBar
      showMenuIconButton={false}
      title={props.navBarTitle}
      iconElementRight={
        <div>
          <Link to={'/login'}><FlatButton label="Login" /></Link>
          <Link to={'/register'}><RaisedButton label="Sign up" primary /></Link>
        </div>
      }
    />
  </div>
);

// Type checking PropTypes (Validation)
Navbar.propTypes = {
  navBarTitle: PropTypes.string
};

export default Navbar;
