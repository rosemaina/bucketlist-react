import React, { Component } from 'react';
import {Card, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';
import Item from './Item';



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
            name:'',
            // newItems : []
            
        };
      }


      handleChange = (event) => {
          this.setState({
            // Value of input box which has this value
            name: event.target.value
        })
    }
    // This method gets a bucketlist's items using its id
      getBucketItem = (id) => {
        //   console.log('id', id)
          axios.get(BASE_URL + '/bucketlist/'+ id + '/item/', {
              headers: {"Authorization": localStorage.getItem('token')}
          }).then((response) => {
            //   Sets the state inclusive of that item
            // console.log('items', response.data)
              this.setState({
                  items: response.data.item
              })
          }).catch((error)=>{
              console.log(error)
          })
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
        })
          .catch((error) => {
            console.log(error)
          })

    }

    // SETS THE STATE OF THE ITEMS ARRAY TO INCLUDE THE ITEM CREATED
    handleNewItem(item){
        let currentItems = this.state.items
        currentItems.push(item)
        console.log(item)
        this.setState({
            items: currentItems
        })
    }

    // DISPLAYS 
    render(){
        // console.log(this.props)
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
          ];

        //   LOOPS THROUGH THE ITEMS ARRAY AND FINDS AN ITEM OBJECT
        //   let itemsArray = []
        //   if (this.state.items > 0 ){
        return(
            <div>
                <List>
                    <Card>
                        <ListItem
                            onClick={(event) => this.handleOpen(event, this.props.bucketobj.id)}
                            rightIcon={<ActionInfo />}
                            primaryText={this.props.bucketobj.title}/>

                        <CardActions>
                            <FlatButton 
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
                            onClick={this.handleOpenAdd}/>

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
                            <Item 
                            key={index} 
                            itemObj={itemObj}
                            getBucketItem={this.getBucketItem}/>
                        );
                    })
                }
                {/* {itemsArray.length > 0  ? itemsArray: 'No items yet'} */}
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
                name="title"
                hintText="Name your bucket"
                onChange={this.props.handleChange}/>

                <FlatButton 
                type="submit" 
                label="Submit" primary={true} 
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
          autoScrollBodyContent={true}>

          <TextField
            name="name"
            hintText="Your activites"
            onChange={this.handleChange}/>

            <FlatButton
                type="submit"
                label="submit" primary={true}

                onClick={(event) => this.handleAddItem(event, this.props.bucketobj.id)}/>

        </Dialog>
        </div>
        </div>
        );
    }
}
export default Dynamiclist;