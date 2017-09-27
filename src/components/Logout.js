import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


import LogoutNav from './LogoutNav';


const axios = require('axios')
const BASE_URL = 'http://127.0.0.1:5000'


class Logout extends Component{
    constructor(props){
        super(props);
        this.state={
            logout_success:false
        }
    }

    handleLogout =(event) =>{
        event.prventDefault()
        axios.post(BASE_URL + '/auth/logout/', {
            headers: {"Authorization": localStorage.getItem('token')}
        })
        .then(() => this.setState({logout_success: true }))
        .catch((error) => {
            console.log(error)
          })

    }


    render(){
        if (this.state.logout_success) {
            return(
            <Redirect to='/login' />
            );
        }
        
        return(
            <div>
                <LogoutNav 
                navBarTitle="Bucketlistly Adventures" />
                <Card>
                    <CardMedia>
                    {/* <img src="" alt="" /> */}

                    </CardMedia>
                </Card>

            </div>
        );


    }
}
export default Logout;