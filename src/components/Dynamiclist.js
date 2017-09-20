import React, { Component } from 'react';
import {Card, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
// import { Redirect } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ActionInfo from 'material-ui/svg-icons/action/info';



// import Navbar from './Navbar';
// import Addbucket from './Addbucket';
// import Bucketlist from './Bucketlist';

const axios = require('axios')

class Dynamiclist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            redirect:false,            
        };
      }
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

      delete(id){
        console.log('heeeee ile id nkt', id)
        axios.delete(`http://127.0.0.1:5000/bucketlist/${id}/`,
            {
                headers: {"Authorization": localStorage.getItem('token')}
            }).then((response) => {
                console.log(response.data)
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
                            <FlatButton type="submit" label="Edit" primary={true}  />
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
      </div></div>
        );
    }
}
export default Dynamiclist;