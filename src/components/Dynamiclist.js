import React, { Component } from 'react';
import {Card, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
// import { Redirect } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';


const axios = require('axios')

class Dynamiclist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            openEdit: false,
            redirect:false,
            bucketname: '',
            
        };
      }
      handleOpen = () => {
        this.setState({open: true});
      };

      handleClose = () => {
        this.setState({open: false});
        this.setState({openEdit: false});
      };

      handleOpenEdit = () => {
        this.setState({openEdit: true});
      };

      delete(id){
        console.log(id)
        axios.delete(`http://127.0.0.1:5000/bucketlist/${id}/`,
            {
                headers: {"Authorization": localStorage.getItem('token')}
            }).then((response) => {
                this.props.getBucketlist()
                console.log(response.data)
            })
      }

      edit(id){
          axios.put(`http://127.0.0.1:5000/bucketlist/${id}/`,
          {title: this.state.bucketname},
            {
                headers: {"Authorization": localStorage.getItem('token')}
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
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
                            <FlatButton label="Delete" secondary={true} onClick={() => this.delete(this.props.bucketobj.id)}/>
                        </CardActions>
                    </Card>  
                </List>
      <div>
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
            <strong>{this.props.bucketobj.date_created}</strong><br/>
            Let's have ourselves a little adventure shall we? wink wink
        </Dialog>
        <Dialog
          title={this.props.bucketobj.title}
          actions={actions}
          modal={true}
          open={this.state.openEdit}
        >
        <strong>{this.props.bucketobj.date_created}</strong><br/>
            <TextField
                name="title"
                hintText="Name your bucket"
                onChange={(event) => {
                    this.setState({bucketname: event.target.value})
                }}
            />
                <FlatButton type="submit" label="Submit" primary={true} onClick={() => this.edit(this.props.bucketobj.id)}/>
        </Dialog>
      </div></div>
        );
    }
}
export default Dynamiclist;