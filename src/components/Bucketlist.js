import React, { Component } from 'react';
import Navbar from './Navbar';
import Addbucket from './Addbucket';
import Dynamiclist from './Dynamiclist'

const axios = require('axios')

class Bucketlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],
            // bucketname: ''  
        }
        this.handleNewBucketlist = this.handleNewBucketlist.bind(this)
        this.getBucketlist = this.getBucketlist.bind(this)        
        
      }

    getBucketlist(){
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

    // handelUpdateBucketlist(bucket){
    //     let oldBucketlists = this.state.bucket
    //     currentBucketlists.push(bucket.id.index)
    //     this.setState({
    //         bucketlists: currentBucketlists
    //     })
    // }

    handleNewBucketlist(bucketlist){
        let currentBucketlists = this.state.bucketlists
        currentBucketlists.push(bucketlist)
        this.setState({
            bucketlists: currentBucketlists
        })
    }

    // edit(id){
    //     axios.put(`http://127.0.0.1:5000/bucketlist/${id}/`,
    //     {title: this.state.bucketname},
    //       {
    //           headers: {"Authorization": localStorage.getItem('token')}
    //       }).then((response) => {
    //           this.setState((prevState) => {
    //               return {
    //                   bucketlists: Object.assign([], prevState, this.state.bucketname)
    //               }
    //           })
    //       }).catch((error) => {
    //           console.log(error)
    //       })
    // }

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
                <Dynamiclist key={index} bucketobj={bucket} getBucketlist={this.getBucketlist}/>
            );
        })
        return(
            <div>
                <Navbar 
                navBarTitle='Ace Bruuh'/>
                <div style = {style}>
                    <Addbucket newBucketlist={this.handleNewBucketlist} /><br/>
                    {bucketlist}
                </div>
                {}
            </div>
        );
    }
}
export default Bucketlist;