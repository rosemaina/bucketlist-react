import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import {blue500, yellow600} from 'material-ui/styles/colors';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';


import Navbar from './Navbar';
import Addbucket from './Addbucket';
import Dynamiclist from './Dynamiclist'

const axios = require('axios')

class Bucketlist extends Component {
    constructor(props) {
        super(props);
        this.state = {            
        };
      }

    render(){
        const style = {
            margin: "auto",
            width: "45%",
            height: "auto",
            textAlign: "center"
        }
        return(
            <div>
                <Navbar />
                <div style = {style}>
                    <Addbucket /><br/>
                    <Dynamiclist /><br/>
                </div>
            </div>
        );
    }
}
export default Bucketlist;