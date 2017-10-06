import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Card, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { toast } from 'react-toastify';
import AlertTexts from './AlertTexts';

import LoggedinNavBar from './LoggedinNavBar';


const axios = require('axios')
const BASE_URL = 'http://127.0.0.1:5000'


class BucketItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            open : false,
            itemId: '',
            itemName: '',
            searchText: '',
            logout_success: false
        };
        this.handleUpdateBucketItem = this.handleUpdateBucketItem.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDeleteBucketItem = this.handleDeleteBucketItem.bind(this)
      }
      
      // OPENS DIALOG FOR VIEWING BUCKETLIST TITLE AND ITS'S ITEMS USING ITS ID ie CARD_ID
      handleOpen(event, itemId){
        this.setState({
            open: true,
            itemId: itemId
        });
        // Calls the method using the cardId defined
        // this.getBucketItem(cardId);
      };

      //   CLOSES ALL DIALOGS
      handleClose(){
        this.setState({open: false});
      };

      // This method gets a bucketlist's items using its id
      handleGetBucketItems(bucket_id) {
          axios.get(BASE_URL + '/bucketlist/'+ bucket_id + '/item/', {
              headers: {"Authorization": localStorage.getItem('token')}
          }).then((response) => {
              //   Sets the state inclusive of that item
                this.setState({
                    items: response.data.item
                })
           }).catch((error)=>{})
        }

        // This method deletes a bucketlist item
        handleDeleteBucketItem(event, bucket_id, id){
            axios.delete(BASE_URL + `/bucketlist/${bucket_id}/item/${id}/`,
            {
                headers: {"Authorization": localStorage.getItem('token')}
            }).then((response) => {
                this.handleGetBucketItems(bucket_id);
                })
            }

        // This method updates a bucketlist item
        handleUpdateBucketItem(event, bucket_id){
            axios.put(BASE_URL + `/bucketlist/${bucket_id}/item/${this.state.itemId}/`,
            {name: this.state.itemName},
            {
                headers: {"Authorization": localStorage.getItem('token')}
            }).then((response) => {
                this.handleGetBucketItems(bucket_id)
                toast.success("Item name successfully updated")
                }).catch((error) => {
                    toast.error(error.response.data.error)
                })

            }

            // This method helps for searching an item
            handleSearchItem = (searchText) => {
                axios.get(BASE_URL + `/bucketlist/${this.props.match.params.id}/item?q=`+searchText,
                    {headers: {
                        "Authorization": localStorage.getItem('token'),
                        "content-Type":'application/json'
                    }
                    }).then(response => {
                        this.setState({
                        items :response.data.item
                    })      
            })
            }
            
            // Gets all the bucketlist items before the page renders
            componentWillMount(){
                this.handleGetBucketItems(this.props.match.params.id);
            }

            // Method logs out a user 
            handleLogout =(event) =>{
                event.preventDefault()
                localStorage.removeItem('token');
                this.setState({
                    logout_success: true
                })
            }

    // DISPLAYS 
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
          ];

          const style = {
            margin: "auto",
            width: "45%",
            height: "auto",
            textAlign: "center"
        }

        if (this.state.logout_success) {
            return(
                <Redirect to='/login' />
            );
        }

        let items 
        if (this.state.items.length > 0) {
            items = this.state.items.map((item, index) => {
                return (
                    <div key={index} className='items'>
                            <Card>
                                <ListItem
                                    primaryText={item.name}
                                />
                                <CardActions>
                                    <FlatButton 
                                        label="Edit" 
                                        primary={true}
                                        onClick={(event) => this.handleOpen(event, item.id)}
                                    />

                                    <FlatButton 
                                        label="Delete" 
                                        secondary={true}
                                        onClick={(event) => this.handleDeleteBucketItem(
                                            event, 
                                            this.props.match.params.id, 
                                            item.id)}
                                    />
                                </CardActions>
                            </Card><br />
                
                    </div>
                );
            });
        }
        return(
            <div>
                <LoggedinNavBar
                    navBarTitle="Bucketlisty Adventure"
                    logout={this.handleLogout}
                />

                <List style={style}>
                <TextField
                    type="text"
                    hintText="Search an item"
                    onChange={(event) => this.handleSearchItem(event.target.value)}
                /><br />
                    {items}
                </List> 

                {/* DIALOG FOR ADDING A BUCKETLIST ITEM */}
                <Dialog
                    title='Update Item Name'
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >
                <TextField
                    name="editItem"
                    placeholder="edit item name"
                    onChange={(event) => this.setState({itemName: event.target.value})}
                />
                <FlatButton
                    type="submit"
                    label="submit" primary={true}
                    onClick={(event) => {
                        this.handleUpdateBucketItem(event, this.props.match.params.id)
                        this.handleClose()
                        }}
                />
                </Dialog>
                <AlertTexts />
          </div>
        );
    }
}

export default BucketItems;