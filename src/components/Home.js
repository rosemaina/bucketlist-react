import React, { Component } from 'react';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';


import Navbar from './Navbar';

class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <Navbar />
        <Card>
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="static/homepage.jpg" alt="" />
    </CardMedia>
    {/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
  </Card>
      </div>
    );
  }
}

export default Home;