import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Navbar from './Navbar';


class Home extends Component {
  
  render() {
    const style = {
      margin: "auto", 
      // margin: "center",
      width: "50%",
      height: "auto",
      textAlign: 'center',
    }

    const overlayContentStyle = {
      position: "absolute",
      bottom: "0%",
      top: "0%",
      right: "0%",
      left: "0%",
      background: "rgba(0, 0, 0, 0.34)",
    }

    const titleStyle ={
      color: "rgba(255, 255, 255, 0.87)",
    }

    return (
    <div className="Home">
      <Navbar />
        <Card>
          <CardMedia
          overlay={
            <div style={style}>
              <CardTitle
              titleStyle={titleStyle}
                title="Bucketlisty"
              />
              <CardText titleStyle={titleStyle}>
              <h1>Live, travel, adventure, bless, and don’t be sorry!</h1><br />
              <h1>Once you have traveled, the voyage never ends, but is played out over and over again in the quiestest chambers. The mind can never break off from the journey.</h1>
              </CardText>
            </div>
            }
            overlayContentStyle={overlayContentStyle}
          >         
          
          <img src="static/homepage.jpg" alt="" />
          </CardMedia>
        </Card>
      </div>
    );
  }
}

export default Home;