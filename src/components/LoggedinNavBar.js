import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
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
          <Link to={'/deleteuser'}><RaisedButton label="Delete" secondary /></Link>
      </div>
      }
      
    />
  </div>
  )
}


export default LoggedinNavBar;