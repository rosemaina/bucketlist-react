import React, { Component } from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import {List, ListItem} from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
// import FlatButton from 'material-ui/FlatButton';
// import {blue500, yellow600} from 'material-ui/styles/colors';
// import ActionAssignment from 'material-ui/svg-icons/action/assignment';
// import ActionInfo from 'material-ui/svg-icons/action/info';
// import Avatar from 'material-ui/Avatar';


import Navbar from './Navbar';
import Addbucket from './Addbucket';
import Dynamiclist from './Dynamiclist'

const axios = require('axios')

class Bucketlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],  
            bucketlist: {}     
        };
      }
    componentDidMount(){
        axios.get('http://127.0.0.1:5000/bucketlist/',{
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
            console.log(response.data.bucketlist)
            this.setState({
                bucketlists: response.data.bucketlist
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    handleAddBucketlist = (event) =>{
        // First get the bucketlist from the form in the render function.
        // Render create a form that takes in input
        // Get data from the form and pass it to the onSubit i.e <form onSubmit={this.handleAddBucketlist} 
        // The above goes to the Backend
        // let bucketlist = what is gotten from the form
        let bucketlist = {}
        const name = event.target.name;
        const value = event.target.value;
        bucketlist[name] = value
        handleAddBucketlistRequest(bucketlist)
        // empty object
        // let currentState = this.state.bucketlists
        // let updatedState = currentState.push(bucketlist)
        // this.setState({bucketlists: updatedState })
    }

    handleAddBucketlistRequest = (bucketlist) =>{
        axios.post('Url', bucketlist)
            .then( response =>{
                let st = this.state.bucketlists
                let bucketlists = st.push(bucketlist)
                this.setState({
                    bucketlists
                })

            }
            )
            .catch( err =>{
                console.log(err)
            }

            )
    }
        
    handleReadBucketlist = () => {

    }
    handleUpdateBucketlist = ()=> {

    }

    handleDeleteBucketlist = () => {

    }


    render(){
        const style = {
            margin: "auto",
            width: "45%",
            height: "auto",
            textAlign: "center"
        }
        // console.log(this.state.bucketlists)
        let bucketlist = this.state.bucketlists.map((bucket) => {
            {/* <p>{bucketlist.title}</p> */}
            return (
                <Dynamiclist bucketobj={bucket}/>
            );
        })
        return(
            <div>
                <Navbar />
                <div style = {style}>
                    <Addbucket /><br/>
                    {bucketlist}
                </div>
                {}
            </div>
        );
    }
}
export default Bucketlist;