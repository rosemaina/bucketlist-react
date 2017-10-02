import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Bucketlist from './components/Bucketlist';
import ChangePassword from './components/ChangePassword';
import BucketItems from './components/BucketItems';
import DeleteUser from './components/DeleteUser';


// injectTapEventPlugin();


class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/bucketlist" component={Bucketlist}/>
          <Route exact path="/bucketlist/:id/item" component={BucketItems}/>
          <Route exact path="/changepassword" component={ChangePassword}/>
          <Route exact path="/deleteuser" component={DeleteUser}/>
          </div>
        </Router>
      </MuiThemeProvider>

    );
  }
}

export default App;
