import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertTexts from './AlertTexts';

import Navbar from './Navbar';


const axios = require('axios')


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            login_success: false,
            logout_success: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    // Method changes state for every instance of input
    handleChange(event){
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    // Method login a user and gives them a token
    login(event){
        event.preventDefault()
        axios.post('http://127.0.0.1:5000/auth/login', {
            email: this.state.email,
            password: this.state.password
          })
          .then(resp => {
              localStorage.setItem('token', resp.data['token']);
              this.setState({login_success: true});
              toast.success("You have logged in successfully");
          })
          .catch((error) => {
            toast.error(error.response.data.error)
             
          })
    }

    // Methods logs out a user
    handleLogout(event){
        event.preventDefault()
        localStorage.removeItem('token');
        this.setState({
            logout_success: true
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


        // Redirections Conditions
        if (this.state.login_success) {
            return(
                <Redirect to='/bucketlist' />
            );
        }

        if (this.state.logout_success) {
            return(
                <Redirect to="/login" />
            );
        }
        return (
            <div className='login'>
                
            <Navbar 
            navBarTitle="BucketListy Adventure"
            />
            <Card >
                <CardMedia
                    overlay={ 
                        <div style={style}>
                            <CardTitle 
                            titleStyle={titleStyle}
                            title="Explore the adventure calling" />
                            <CardTitle 
                            titleStyle={titleStyle}
                            title="Login here"/>
                            <CardText>
                                <form onSubmit={this.login}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        hintText="example@email.com"
                                        hintStyle={styles.hintColor}
                                        floatingLabelText="Email"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="email"
                                        onChange = {this.handleChange}
                                    /><br />

                                    <TextField
                                        id="password"
                                        name="password"
                                        hintText="password"
                                        hintStyle={styles.hintColor}
                                        floatingLabelText="Password"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="password"
                                        onChange = {this.handleChange}
                                    /><br />
                                    <RaisedButton
                                    id="submitButton"
                                    type="submit" label="login" primary={true}/>
                                    <br/><br/>
                                    <Link to={'/changepassword'}>
                                        forgot password?
                                    </Link><br />
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

export default Login;