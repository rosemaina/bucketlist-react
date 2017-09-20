import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui-icons/Add';

import Navbar from './Navbar';

const axios = require('axios')

class Addbucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
            
        };
      }
    
      handleChange = (event) => {
          const name = event.target.name
          const value = event.target.value
          this.setState({[name]: value});
      };

    Item = (event) => {
        event.preventDefault()
        axios.post('http://127.0.0.1:5000/bucketlist/', {
            title: this.state.title
        }, {
            headers: {
                "Authorization": localStorage.getItem('token'),
                "content-Type":'application/json'
            }
        })
          .catch((error) => {
            console.log(error)
          })
        }

    render(){
        return(
            <div>
                <Card >
                    <form onSubmit={this.Bucketlist}>
                    <TextField
                        name="title"
                        hintText="Name your bucket!"
                        onChange={this.handleChange}
                        floatingLabelFixed={true}
                    />
                    <FlatButton type="submit" label="Create" primary={true} />
                    </form>
                </Card>
            </div>
        );
    }
}
export default Addbucket;