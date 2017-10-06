import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import AlertTexts from './AlertTexts';
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
        
        // Method registers a user
        register = (event) => {
            //Prevents react reloading a page
            event.preventDefault()
                axios.post('http://127.0.0.1:5000/auth/register', {
                    email: this.state.email,
                    password: this.state.password
                })
                .then(() => this.setState({registration_success: true }),
                    toast.success("You have registered successfully")
                    )
                .catch((error) => {
                    toast.error(error.response.data.error)
                })
        }
    
    render() {

        const style = {
            margin: "auto", 
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

        const styles={
            hintColor: {
                color: "rgba(255, 255, 255, 0.87)",
              },
            floatingLabelStyle: {
                color: "rgba(255, 255, 255, 0.87)",
            },
        }


        if (this.state.registration_success) {
            return(
                <Redirect to='/login' />
            );
        }
        return (
            <div className='register'>
            <Navbar 
            navBarTitle="BucketListy Adventure"/>
            <Card>
                <CardMedia
                    overlay={
                        <div style={style}>
                        <CardTitle
                        titleStyle={titleStyle}
                        title="Registration"/>
                        <CardText>
                            <form onSubmit={this.register}>
                                <TextField
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                hintText="example@email.com"
                                hintStyle={styles.hintColor}
                                floatingLabelText="Email"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                type="email"
                                />
                                <br />
                                <TextField
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                hintText="password"
                                hintStyle={styles.hintColor}
                                floatingLabelText="Password"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                type="password"
                                />
                                <br />
                                <RaisedButton type="submit" id="register" label="Sign up" primary={true}/>
                            </form>
                        </CardText>
                        </div>
                    }
                    overlayContentStyle={overlayContentStyle}
                    >
                        <img src="static/clouds.jpg" alt=""/>
                </CardMedia>
            </Card>
            <AlertTexts />
            </div>
            
        );
      }
    }
    
export default Register;