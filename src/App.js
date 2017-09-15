import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import Login from './components/Login';


// injectTapEventPlugin();


class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          </div>
        </Router>
      </MuiThemeProvider>

    );
  }
}

export default App;
