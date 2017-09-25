import React, { Component } from 'react';
import {Card, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
// import { Redirect } from 'react-router-dom';
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
            
        };
      }


      handleChange = (event) => {
          this.setState({
            // Value of input box which has this value
            name: event.target.value
        })
    }

      getBucketItem = () => {
          //   this gets the bucktetlist items
          axios.get(BASE_URL + '/bucketlist/'+ this.props.bucketobj.id + '/item/', {
              headers: {"Authorization": localStorage.getItem('token')}
          }).then((response) => {
              this.setState({
                  items: response.data.item
              })
          }).catch((error)=>{
              console.log(error)
          })
      }

      handleOpen = () => {
        this.setState({open: true});
      };

      handleClose = () => {
        this.setState({open: false, openEdit: false, openAdd: false});
      };

      handleOpenEdit = () => {
        this.setState({openEdit: true});
      };
      handleOpenAdd = () => {
        this.setState({openAdd: true});
      };


    handleSubmit = () => {
        axios.post(BASE_URL + '/bucketlist/' + this.props.bucketobj.id +'/item/', {
            name: this.state.name
        }, {
            headers: {
                "Authorization": localStorage.getItem('token'),
                "content-Type":'application/json'
            }
            // Sets the input text field to empty onSubmit
        }).then((response) => {
          this.setState({
              name: ''
          })
          this.handleNewItem(response.data.name) 
          this.handleClose()
          this.getBucketItem()      
        })
          .catch((error) => {
            console.log(error)
          })

    }
    handleNewItem(item){
        let currentItems = this.state.items
        currentItems.push(item)
        console.log(item)
        this.setState({
            items: currentItems
        })
    }

    componentWillMount(){
        this.getBucketItem()
    }

    render(){
        // console.log(this.props)
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
          ];

          let itemsArray = []
          if (this.state.items > 0 ){
          itemsArray = this.state.items.map((itemObj, index) => {
              console.log(itemObj)
              return (
                <Item 
                key={index} 
                itemObj={itemObj}
                getBucketItem={this.getBucketItem}
                />
              );
          })}
        return(
            <div>
                <List>
                    <Card>
                        <ListItem
                            onClick={this.handleOpen}
                            rightIcon={<ActionInfo />}
                            primaryText={this.props.bucketobj.title}
                        />
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
                            onClick={this.handleOpenAdd}
                            />
                        </CardActions>
                    </Card>  
                </List>
      <div>
          {/* DIALOG FOR SOWING BUCEKTLIST NAME WITH ITS ITEMS */}
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
            <strong>{this.props.bucketobj.date_created}</strong><br/>

            {/* LIST SHOWS ALL BUCKEKTLIST ITEMS(VIEW) */}
            <List>
                {itemsArray.length > 0  ? itemsArray: 'No items yet'}
            </List>
        </Dialog>

        {/* DIALOG FOR CREATING A BUCKETLIST */}
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.openEdit}
        >
        <strong>{this.props.bucketobj.date_modified}</strong><br/>
            <TextField
                name="title"
                hintText="Name your bucket"
                onChange={this.props.handleChange}
            />
                <FlatButton 
                type="submit" 
                label="Submit" primary={true} 
                onClick={() => this.props.handleUpdateBucketlist(this.props.bucketobj.id)}/>
        </Dialog>

        {/* DIALOG FOR ADDING A BUCKETLIST ITEM */}
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.openAdd}>
          <TextField
            name="name"
            hintText="Your activites"
            onChange={this.handleChange}
            />
            <FlatButton
                type="submit"
                label="submit" primary={true}

                onClick={this.handleSubmit}
            />
        </Dialog>

      </div></div>
        );
    }
}
export default Dynamiclist;