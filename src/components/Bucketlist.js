import React, { Component } from 'react';
import LoggedinNavBar from './LoggedinNavBar';
import Addbucket from './Addbucket';
import Dynamiclist from './Dynamiclist'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AlertTexts from './AlertTexts';


const axios = require('axios')
const BASE_URL = 'http://127.0.0.1:5000'


class Bucketlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],
            title:'',
            logout_success: false,
            textSearch: '',
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
        }).catch((error)=>{})
    }


    handleSearch = (event) => {
        axios.get(BASE_URL + '/bucketlist'+'?q='+ event.target.value,
        {headers: {
            "Authorization": localStorage.getItem('token'),
            "content-Type":'application/json'
        }
        }).then(response => {
            this.setState({
            bucketlists :response.data.bucketlist
        })
        console.log('buckets', response.data.bucketlist)        
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
            toast.error(error.response.data.error)
          })

    }

    // Method edits a bucketlist title
    handleUpdateBucketlist = (id)=> {
        axios.put(BASE_URL + `/bucketlist/${id}/`,
        {title: this.state.title},
        {
            headers: {"Authorization": localStorage.getItem('token')}
        })
        .then((response) => {
            this.getBucketlist()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    // Method deletes a bucketlist object using its id
    handleDeleteBucketlist = (id) => {
        axios.delete(BASE_URL + `/bucketlist/${id}/`,
        {
            headers: {"Authorization": localStorage.getItem('token')}
        })
        .then((response) => {
            toast.success(response.data.message)
            this.getBucketlist();
            
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
        }

    componentWillMount(){
        this.getBucketlist()
    }

    // Method logs out a user 
    handleLogout =(event) =>{
        event.preventDefault()
        localStorage.removeItem('token');
        this.setState({
            logout_success: true
        })
    }

    render(){
        const style = {
            margin: "auto",
            width: "45%",
            height: "auto",
            textAlign: "center"
        }
        let bucketlist = this.state.bucketlists.map((bucket, index) => {
            return (
                <Dynamiclist 
                key={index} 
                bucketobj={bucket} 
                handleDeleteBucketlist={this.handleDeleteBucketlist} 
                handleUpdateBucketlist={this.handleUpdateBucketlist} 
                handleChange={this.handleChange}/>
            );
        })

        if (this.state.logout_success) {
            return(
                <Redirect to='/login' />
            );
        }
        return(
            
            <div className='bucketlist'>
                <LoggedinNavBar 
                navBarTitle='BucketListy Adventure'
                logout={this.handleLogout}/>
                <div style = {style}>
                    <Addbucket
                    title={this.state.title}
                    newBucketlist={this.handleAddBucketlist} 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}/><br/>
                    {bucketlist}
                </div>
                <AlertTexts />
            </div>
        );
    }
}

export default Bucketlist;





    

