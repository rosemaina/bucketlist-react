import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';


class Navbar extends Component {
  
  render() {
    return (
      <div className="Navbar">
        <AppBar
          title="BucketList App"
          iconElementRight={
            <div>
            <Link to={'/Login'}><RaisedButton label="Login" /></Link>
            <Link to={'/Register'}><RaisedButton label="Sign up" primary={true} /></Link>
            <Link to={'/Logout'}><RaisedButton label="Logout" secondary={true} /></Link>
          </div>
          }
          
        />
      </div>
    );
  }
}

export default Navbar;