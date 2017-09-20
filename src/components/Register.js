import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

const axios = require('axios')


class Register extends Component {
    constructor(props){
        // Defines the constructor
        super(props);
        // Sets the email & password to empty
        this.state={
            email:'',
            password:'',
            registration_success: false
        }}
    
        handleChange = (event) => {
            const name = event.target.name
            this.setState({[name]: event.target.value})
        }
    
        Register = (event) => {
            event.preventDefault()
            axios.post('http://127.0.0.1:5000/auth/register', {
                email: this.state.email,
                password: this.state.password
              })
            //   .then(resp => {
            //       localStorage.setItem('token', resp.data['token']);
            //   })
              .then(() => this.setState({registration_success: true }))
              .catch((error) => {
                // this.setState({error: error.response.data.error})
                // this.setState({open: true})
                console.log(error)
              })
        }
    

    render() {
        if (this.state.registration_success) {
            return(
                <Redirect to='/bucketlist' />
            );
        }
        return (
            <div>
            <Navbar />
            <Card>
            <CardTitle title="Registration"/>
            <CardText>
                <form onSubmit={this.Register}>
                <TextField
                name="email"
                onChange={this.handleChange}
                hintText="example@email.com"
                errorText="This field is required."
                floatingLabelText="Email"
                type="email"
                /><br />
                <TextField
                name="password"
                onChange={this.handleChange}
                hintText="password"
                errorText="This field is required."
                floatingLabelText="Password"
                type="password"
                /><br />
                <RaisedButton type="submit" label="Sign up" primary={true}/>
                </form>
            </CardText>
            </Card>
            </div>
        );
      }
    }
    
export default Register;