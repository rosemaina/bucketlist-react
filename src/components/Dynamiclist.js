import React, { Component } from 'react';
import {Card, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';

import AlertTexts from './AlertTexts';
import BucketItems from './BucketItems';


const axios = require('axios')
const BASE_URL = 'http://127.0.0.1:5000'


class Dynamiclist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            openEdit: false,
            openAdd: false,
            redirect:false,
            items:[],
            name:''            
        };
      }

    //   Method changes state for every instance of input
    handleChange = (event) => {
        this.setState({
        // Value of input box which has this value
        name: event.target.value
    })
}

    // This method gets a bucketlist's items using its id
    getBucketItem = (id) => {
        axios.get(BASE_URL + '/bucketlist/'+ id + '/item/', {
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
        //   Sets the state inclusive of that item
            this.setState({
                items: response.data.item
            })
        }).catch((error)=>{ })
    }

    //   OPENS DIALOG FOR VIEWING BUCKETLIST TITLE AND ITS'S ITEMS USING ITS ID ie CARD_ID
    handleOpen = (event, cardId) => {
    event.preventDefault();
    this.setState({
        open: true
    });

    // Calls the method using the cardId defined
    this.getBucketItem(cardId);
    };

    //   CLOSES ALL DIALOGS
    handleClose = () => {
    this.setState({open: false, openEdit: false, openAdd: false});
    };

    //   OPENS DIALOG FOR EDITING A BUCKELIST TITLE
    handleOpenEdit = () => {
    this.setState({openEdit: true});
    };

    //   OPENS DIALOG FOR ADD A BUCKETLIST ITEM
    handleOpenAdd = () => {
    this.setState({openAdd: true});
    };

    // CREATES A BUCKETLIST ITEM
    handleAddItem = (event, id) => {
        axios.post(BASE_URL + '/bucketlist/' + id +'/item/', {
            name: this.state.name
        }, {
            headers: {
                "Authorization": localStorage.getItem('token'),
                "content-Type":'application/json'
            }
            // Sets the input text field to empty onSubmit
        }).then((response) => {
            // SETS THE INPUT FIELD TO EMPTY
          this.setState({
              name: ''
          })
          //this.handleNewItem(response.data.name) 
          this.handleClose()
          this.getBucketItem(id)
          toast.success("Item created successfully")    
        })
          .catch((error) => {
            toast.error(error.response.data.error)
          })
    }

    // SETS THE STATE OF THE ITEMS ARRAY TO INCLUDE THE ITEM CREATED
    handleNewItem(item){
        let currentItems = this.state.items
        currentItems.push(item)
        this.setState({
            items: currentItems
        })
    }

    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
          ];

        return(
            <div className='dynamiclist'>
                <List>
                    {/* This card displays the title,edit and delete button */}
                    <Card>
                        <Link to={`/bucketlist/${this.props.bucketobj.id}/item`}>
                            <ListItem
                                rightIcon={<ActionInfo />}
                                primaryText={this.props.bucketobj.title}
                            />
                        </Link>

                        <CardActions>
                            <FlatButton
                                id="edit"
                                label="Edit" 
                                primary={true}
                                onClick={this.handleOpenEdit}
                            />

                            <FlatButton 
                            label="Delete" 
                            secondary={true} 
                            onClick={() => this.props.handleDeleteBucketlist(this.props.bucketobj.id)}/>

                            <FlatButton
                                label="Add item"
                                onClick={this.handleOpenAdd}
                            />

                        </CardActions>
                    </Card> 
                </List>
      <div>

          {/* DIALOG FOR SHOWING BUCEKTLIST NAME WITH ITS ITEMS */}
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}>

         <strong>{this.props.bucketobj.date_created}</strong><br/>

            {/* LIST SHOWS ALL BUCKEKTLIST ITEMS(VIEW) */}
            <List>
                {this.state.items === undefined ? "No Items Yet":
                
                    this.state.items.map((itemObj, index) => {
                        return (
                            <BucketItems
                            key={index} 
                            itemObj={itemObj}
                            getBucketItem={this.getBucketItem}/>
                        );
                    })
                }
            </List>
        </Dialog>

        {/* DIALOG FOR UPDATING A BUCKETLIST */}
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.openEdit}
          autoScrollBodyContent={true}>
    
          <strong>{this.props.bucketobj.date_modified}</strong><br/>
            <TextField
            name="editBucketlistName"
            hintText="Name your bucket"
            onChange={this.props.handleChange}
            />

                <FlatButton 
                type="submit" 
                label="Submit"
                primary={true} 
                onClick={() => {
                    this.props.handleUpdateBucketlist(this.props.bucketobj.id)
                    this.handleClose()
                }}/>

        </Dialog>

        {/* DIALOG FOR ADDING A BUCKETLIST ITEM */}
        <Dialog
        title={this.props.bucketobj.title}
        actions={actions}
        modal={true}
        open={this.state.openAdd}
        autoScrollBodyContent={true}
        >
          <TextField
            name="name"
            hintText="Your activites"
            onChange={this.handleChange}
           />
           <FlatButton
            type="submit"
            label="submit"
            primary={true}
            onClick={(event) => this.handleAddItem(event, this.props.bucketobj.id)}
           />
        </Dialog>
        </div>
        <AlertTexts />
        </div>
        );
    }
}

export default Dynamiclist;