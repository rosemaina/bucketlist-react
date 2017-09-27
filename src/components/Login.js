import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
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
              console.log(resp)
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
            background: "rgba(0, 0, 0, 0.44)",
        }

        const titleStyle ={
            color: "rgba(255, 255, 255, 0.87)",
        }

        const color={
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




        if (this.state.login_success) {
            return(
                <Redirect to='/bucketlist' />
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
                            title="Explore the adventure calling" />
                            <CardTitle 
                            titleStyle={titleStyle}
                            title="Login here"/>
                            <CardText color={color}>
                                <form onSubmit={this.login}>
                                    <TextField 
                                        name="email"
                                        hintText="example@email.com"
                                        hintStyle={styles.hintColor}
                                        floatingLabelText="Email"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="email"
                                        onChange = {this.handleChange}
                                    /><br />

                                    <TextField
                                        color="white"
                                        name="password"
                                        hintText="password"
                                        hintStyle={styles.hintColor}
                                        floatingLabelText="Password"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        type="password"
                                        onChange = {this.handleChange}
                                    /><br />
                                    <RaisedButton type="submit" label="login" primary={true}/>
                                </form>
                            </CardText>
                        </div>
                    }
                    overlayContentStyle={overlayContentStyle}
                    >
                    {/* static/clouds.jpg */}
                    <img src="static/homepage.jpg" alt=""/>
                </CardMedia>
            </Card>
            </div>
        );
  }
}
// const style = {
//     margin: 15,
//    };

export default Login;