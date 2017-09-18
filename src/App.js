import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Bucketlist from './components/Bucketlist';
// import AddBucketlist from './components/AddBucketlist';
// import EditBucket from './components/EditBucketlist';



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
          {/* <Route exact path="/addBucketlist" component={AddBucketlist}/>
          <Route exact path="/editBucketlist" component={EditBucketlist}/> */}
          </div>
        </Router>
      </MuiThemeProvider>

    );
  }
}

export default App;
