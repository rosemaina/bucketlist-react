import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertTexts from './AlertTexts';

import LoggedinNavBar from './LoggedinNavBar';


const axios = require('axios')


class DeleteUser extends Component {
    constructor(props){
        super(props);
        this.state={
            password:'',
            confirm_password: '',
            delete_success: false,
        }
    }

    handleChange = (event) => {
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    // Method deletes a user's account
    handleDeleteUser = (event) => {
        event.preventDefault()
        console.log(this.state.password)
        if (this.state.password === this.state.confirm_password) {
            axios.delete('http://127.0.0.1:5000/auth/delete/', {
                password: this.state.password,
                confirm_password: this.state.confirm_password,
                headers: {"Authorization": localStorage.getItem('token')}
            })
              .then((response) => this.setState({delete_success: true}))

              .catch((error) => {
                  console.error('error', error.response)
                  //console.log(error.target)
                  if (error.response){
                    toast.error(error.response.data.error);
                  }
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

        if (this.state.delete_success) {
            return(
                <Redirect to='/registration' />
            );
        }

        return (
            <div>
           
            <LoggedinNavBar 
            navBarTitle="BucketListly Adventure"
            />
            <Card >
                <CardMedia
                    overlay={ 
                        <div style={style}>
                            <CardTitle 
                            titleStyle={titleStyle}
                            title="Delete Account"/>
                            <CardText>
                                <form>
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
                                        label="Delete" 
                                        secondary={true}
                                        onClick={this.handleDeleteUser}
                                    />
                                </form>
                            </CardText>
                        </div>
                    }
                    overlayContentStyle={overlayContentStyle}
                    >
                    <img src="static/see_that.jpg" alt=""/>
                </CardMedia>
            </Card>
            <AlertTexts />
            </div>
        );
  }
}
//onSubmit={this.login}
export default DeleteUser;