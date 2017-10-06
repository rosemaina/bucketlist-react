import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import LoggedinNavBar from './LoggedinNavBar';
import Addbucket from './Addbucket';
import Dynamiclist from './Dynamiclist'
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
            next_page: '',
            prev_page: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNewBucketlist = this.handleNewBucketlist.bind(this);
        this.getBucketlist = this.getBucketlist.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddBucketlist = this.handleAddBucketlist.bind(this);
        this.handleUpdateBucketlist = this.handleUpdateBucketlist.bind(this);
        this.handleDeleteBucketlist = this.handleDeleteBucketlist.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
      }

      componentWillMount(){
        this.getBucketlist();
    }
    
    handleChange(event){
        this.setState({
            // Value of input box which has this value
            title: event.target.value
        });
    }

    // Method gets all bucketlist items
    getBucketlist(){
        axios.get(BASE_URL + '/bucketlist/',{
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                bucketlists: response.data.bucketlist,
                next_page :response.data.next_page,
                prev_page :response.data.prev_page,
            });
        }).catch((error)=>{});
    }

    // Method gets link to the next page
    handleNextPage(){
        axios.get(BASE_URL + this.state.next_page,
            {
            headers: {"Authorization": localStorage.getItem('token')
        }
        }).then((response) => {
            this.setState({
                bucketlists: response.data.bucketlist,
                next_page :response.data.next_page,
                prev_page :response.data.prev_page,
            })
        }).catch((error)=>{})
    }

    // Method gets link to the previous page
    handlePrevPage(){
        axios.get(BASE_URL + this.state.prev_page,
            {
            headers: {"Authorization": localStorage.getItem('token')
        }
        }).then((response) => {
            this.setState({
                bucketlists: response.data.bucketlist,
                next_page :response.data.next_page,
                prev_page :response.data.prev_page,
            })
        }).catch((error)=>{})
    }

    // Method handles search for bucketlists
    handleSearch(event) {
        axios.get(BASE_URL + '/bucketlist'+'?q='+ event.target.value,
        {
            headers: {
            "Authorization": localStorage.getItem('token'),
            "content-Type":'application/json'
        }}
        ).then(response => {
            this.setState({
            bucketlists :response.data.bucketlist
        });
    });
    }

    // Method updates list of bucketlists with the new bucketlist
    handleNewBucketlist(bucketlist){
        let currentBucketlists = this.state.bucketlists;
        currentBucketlists.push(bucketlist);
        this.setState({
            bucketlists: currentBucketlists
        });
    }

    // Method adds a new bucketlist
    handleAddBucketlist(event){
        event.preventDefault();
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
          });
          this.getBucketlist();       
        })
          .catch((error) => {
            toast.error(error.response.data.error);
          });
    }

    // Method edits a bucketlist title
    handleUpdateBucketlist(id){
        axios.put(BASE_URL + `/bucketlist/${id}/`,
        {title: this.state.title},
        {
            headers: {"Authorization": localStorage.getItem('token')}
        })
        .then((response) => {
            this.getBucketlist();
        })
        .catch((error) => {
            toast.error(error.response.data.error);
        });
    }

    // Method deletes a bucketlist object using its id
    handleDeleteBucketlist(id){
        axios.delete(BASE_URL + `/bucketlist/${id}/`,
        {
            headers: {"Authorization": localStorage.getItem('token')}
        })
        .then((response) => {
            toast.success(response.data.message);
            this.getBucketlist();
            
        })
        .catch((error) => {
            toast.error(error.response.data.error);
        });
    }
    
    // Method logs out a user gf
    handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('token');
        this.setState({
            logout_success: true
        });
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
                <Redirect to= "/login" />
            );
        }
        return(
            
            <div className="bucketlist">
                <LoggedinNavBar 
                navBarTitle=""
                logout={this.handleLogout}/>

            
                <div style = {style}>
                    {/* SEARCH TEXT FIELD  */}
                    <TextField 
                    placeholder="Search"
                    name="Search"
                    onChange={this.handleSearch}
                    />

                    <Addbucket
                    title={this.state.title}
                    newBucketlist={this.handleAddBucketlist} 
                    handleChange={this.handleChange} />
                    {bucketlist}
                </div>
                <AlertTexts />
                <div style={{
                     display:"flex",
                     justifyContent: "center",
                     alignItems: "center"}}>
                    
                <FlatButton 
                type="submit"
                label="prev"
                onClick={event => this.handlePrevPage()}
                />
                <FlatButton 
                type="submit"
                label="next"
                onClick={event => this.handleNextPage()}
                />
                </div>
            </div>
        );
    }
}

export default Bucketlist;





    

