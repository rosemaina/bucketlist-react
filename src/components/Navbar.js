import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


// class Navbar extends Component {
  
//   render() {
//     return (
//       <div className="Navbar">
//         <AppBar
//           title="BucketList App"
//           iconElementRight={
//             <div>
//             <Link to={'/login'}><FlatButton label="Login" /></Link>
//             <Link to={'/register'}><RaisedButton label="Sign up" primary={true} /></Link>
//             <Link to={'/logout'}><FlatButton label="Logout" secondary={true} /></Link>
//           </div>
//           }
          
//         />
//       </div>
//     );
//   }
// }

const Navbar = ({navBarTitle}) => {
  return (
    <div className="Navbar">
    <AppBar
      title={navBarTitle}
      iconElementRight={
        <div>
        <Link to={'/login'}><FlatButton label="Login" /></Link>
        <Link to={'/register'}><RaisedButton label="Sign up" primary={true} /></Link>
        <Link to={'/logout'}><FlatButton label="Logout" secondary={true} /></Link>
      </div>
      }
      
    />
  </div>
  )
}


export default Navbar;