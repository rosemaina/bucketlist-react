import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

const axios = require('axios')

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            login_success: false
        }
    }

    handleChange = (event) => {
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    login = (event) => {
        event.preventDefault()
        axios.post('http://127.0.0.1:5000/auth/login', {
            email: this.state.email,
            password: this.state.password
          })
          .then(resp => {
              localStorage.setItem('token', resp.data['token']);
          })
          .then(() => this.setState({login_success: true }))
          .catch((error) => {
            // this.setState({error: error.response.data.error})
            // this.setState({open: true})
            console.log(error)
          })
    }

    render() {
        const style = {
            margin: "auto",
            width: "10%",
            height: "auto",
            alignment: "center"
        }
        if (this.state.login_success) {
            return(
                <Redirect to='/bucketlist' />
            );
        }
        return (
            <div>
            <Navbar />
            <Card>
            <CardTitle title="Login"/>
            <CardText>
                <form onSubmit={this.login}>
                    <TextField
                        name="email"
                        hintText="example@email.com"
                        errorText="This field is required."
                        floatingLabelText="Email"
                        type="email"
                        onChange = {this.handleChange}
                    /><br />
                    <TextField
                        name="password"
                        hintText="password"
                        errorText="This field is required."
                        floatingLabelText="Password"
                        type="password"
                        onChange = {this.handleChange}
                    /><br />
                    <RaisedButton type="submit" label="login" primary={true}/>
                </form>
            </CardText>
            </Card>
            </div>
        );
  }
}
const style = {
    margin: 15,
   };

export default Login;