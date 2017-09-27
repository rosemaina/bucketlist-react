import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

const axios = require('axios')


class Register extends Component {
    // Props, an object argument with data that returns a React element
    constructor(props){
        // Defines the constructor
        super(props);
        // Sets the email & password to empty
        this.state={
            email:'',
            password:'',
            registration_success: false,
            error: false,
            errorText: ''
        }}
    
        handleChange = (event) => {
            const name = event.target.name
            this.setState({[name]: event.target.value})
        }
    
        register = (event) => {
            //Prevents react reloading a page
            event.preventDefault()
            if(this.state.email.length === 0 || this.state.password.length === 0){
                this.setState({
                    errorText: 'Both email and password are required',
                    error: true
                })
            }else {
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
        }
    

    render() {
        if (this.state.registration_success) {
            return(
                <Redirect to='/login' />
            );
        }
        return (
            <div>
            <Navbar 
            navBarTitle="BucketListly Adventure"/>
            <Card>
                <CardTitle title="Registration"/>
                    <CardText>
                        <form onSubmit={this.register}>
                            <TextField
                            name="email"
                            onChange={this.handleChange}
                            hintText="example@email.com"
                            floatingLabelText="Email"
                            type="email"
                            />
                            {
                            this.state.error && 
                            <p>{this.state.errorText}</p>
                            }
                            <br />
                            <TextField
                            name="password"
                            onChange={this.handleChange}
                            hintText="password"
                            floatingLabelText="Password"
                            type="password"
                            />
                            {
                            this.state.error && 
                            <p>{this.state.errorText}</p>
                            }
                            <br />
                            <RaisedButton type="submit" label="Sign up" primary={true}/>
                        </form>
                    </CardText>
            </Card>
            </div>
        );
      }
    }
    
export default Register;