import React, { Component } from 'react';
import LogoutNav from './LogoutNav';
import Addbucket from './Addbucket';
import Dynamiclist from './Dynamiclist'

const axios = require('axios')
const BASE_URL = 'http://127.0.0.1:5000'

class Bucketlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],
            title:''
        };
      }
    handleChange = (event) => {
        this.setState({
            // Value of input box which has this value
            title: event.target.value
        })
    }

    getBucketlist(){
        axios.get(BASE_URL + '/bucketlist/',{
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                bucketlists: response.data.bucketlist
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    handleNewBucketlist(bucketlist){
        let currentBucketlists = this.state.bucketlists
        currentBucketlists.push(bucketlist)
        this.setState({
            bucketlists: currentBucketlists
        })
    }

    handleAddBucketlist = (event) =>{
        // First get the bucketlist from the form in the render function.
        // Render create a form that takes in input
        // Get data from the form and pass it to the onSubit i.e <form onSubmit={this.handleAddBucketlist} 
        // The above goes to the Backend
        // let bucketlist = what is gotten from the form
        // empty object
        // let currentState = this.state.bucketlists
        // let updatedState = currentState.push(bucketlist)
        // this.setState({bucketlists: updatedState })

        event.preventDefault()
        axios.post(BASE_URL + '/bucketlist/', {
            title: this.state.title
        }, {
            headers: {
                "Authorization": localStorage.getItem('token'),
                "content-Type":'application/json'
            }
            // Sets the input text field to empty onSubmit
        }).then((response) => {
          this.setState({
              title: ''
          })
          this.getBucketlist()          
        })
          .catch((error) => {
            console.log(error)
          })

    }
    

    handleUpdateBucketlist = (id)=> {
        console.log(id)
        axios.put(BASE_URL + `/bucketlist/${id}/`,
        {title: this.state.title},
        {
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
            this.getBucketlist()
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    handleDeleteBucketlist = (id) => {
        console.log(id)
        axios.delete(BASE_URL + `/bucketlist/${id}/`,
        {
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
            this.getBucketlist()
                console.log(response.data)
            })
        }

    componentWillMount(){
        this.getBucketlist()
    }

    render(){
        const style = {
            margin: "auto",
            width: "45%",
            height: "auto",
            textAlign: "center"
        }
        // console.log(this.state.bucketlists)
        let bucketlist = this.state.bucketlists.map((bucket, index) => {
            {/* <p>{bucketlist.title}</p> */}
            return (
                <Dynamiclist 
                key={index} 
                bucketobj={bucket} 
                handleDeleteBucketlist={this.handleDeleteBucketlist} 
                handleUpdateBucketlist={this.handleUpdateBucketlist} 
                handleChange={this.handleChange}/>
            );
        })
        return(
            <div>
                <LogoutNav 
                navBarTitle='BucketListly Adventure'/>
                <div style = {style}>
                    <Addbucket
                    title={this.state.title}
                    newBucketlist={this.handleAddBucketlist} 
                    handleChange={this.handleChange}/><br/>
                    {bucketlist}
                </div>
                {}
            </div>
        );
    }
}
export default Bucketlist;





    

