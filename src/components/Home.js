import React, { Component } from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';


import Navbar from './Navbar';

class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <Navbar 
          navBarTitle={"Ace"}  
      />
        <Card>
    <CardMedia
      overlay={<CardTitle title="Explore the adventure calling" />}
    >
      <img src="static/homepage.jpg" alt="" />
    </CardMedia>
    {/* <CardTitle title="Card title" subtitle="Card subtitle"  line18 = subtitle="Overlay subtitle"/> */}
  </Card>
      </div>
    );
  }
}

export default Home;