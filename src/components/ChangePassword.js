import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertTexts from './AlertTexts';

import Navbar from './Navbar';


const axios = require('axios')


class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            confirm_password: '',
            login_success: false,
            change_password_success: false,
        }
    }

    handleChange = (event) => {
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    // Method changes a user's password
    handleChangePassword = (event) => {
        event.preventDefault()
        if (this.state.password === this.state.confirm_password) {
            axios.post('http://127.0.0.1:5000/auth/reset_password', {
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
            })
              .then((response) => this.setState({change_password_success: true}))

              .catch((error) => {
                console.log(error)
                toast.error(error.data.error);
            })
        } else{ 
            //alert(error)
            toast.error("Passwords do not match");
        }
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
            floatingLabelStyle: {
                color: "rgba(255, 255, 255, 0.87)",
            },
        }

        if (this.state.change_password_success) {
            return(
                <Redirect to='/login' />
            );
        }

        return (
            <div>
           
            <Navbar 
            navBarTitle="BucketListly Adventure"
            />
            <Card >
                <CardMedia
                    overlay={ 
                        <div style={style}>
                            <CardTitle 
                            titleStyle={titleStyle}
                            title="Change Your Password"/>
                            <CardText>
                                <form onSubmit={this.login}>
                                    <TextField 
                                        name="email"
                                        floatingLabelText="Email"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="email"
                                        onChange = {this.handleChange}
                                    /><br />

                                    <TextField
                                        name="password"
                                        floatingLabelText="Password"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="password"
                                        onChange = {this.handleChange}
                                    /><br />
                                    <TextField
                                        name="confirm_password"
                                        floatingLabelText="Confirm password"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="password"
                                        onChange = {this.handleChange}
                                    /><br />
                                    <RaisedButton 
                                        type="submit" 
                                        label="Change Password" 
                                        primary={true}
                                        onClick={this.handleChangePassword}
                                    />
                                </form>
                            </CardText>
                        </div>
                    }
                    overlayContentStyle={overlayContentStyle}
                    >
                    <img src="static/hurray.jpg" alt=""/>
                </CardMedia>
            </Card>
            <AlertTexts />
            </div>
        );
  }
}

export default ChangePassword;