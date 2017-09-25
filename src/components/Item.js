import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';


const axios = require('axios')
const BASE_URL = 'http://127.0.0.1:5000'


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name:'', 
        };
      }


      handleDeleteBucketItem = (event, bucket_id, id) => {
          console.log(id)
        axios.delete(BASE_URL + `/bucketlist/${bucket_id}/item/${id}/`,
        {
            headers: {"Authorization": localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                items:response.data.name
            })
            this.props.getBucketItem()
             console.log(response.data)
            })
        }

    
    render(){
        const style = {
            margin: "auto",
            width: "50%",
            height: "auto",
            textAlign: "left"
        }
        return(
            <div>
                <List>
                    <Card style={style}>
                        <h3>{this.props.itemObj.name}</h3>
                            <CardActions>
                                <FlatButton 
                                    label="Edit" 
                                    primary={true}
                                />
                                <FlatButton 
                                label="Delete" 
                                secondary={true}
                                onClick={(event) => this.handleDeleteBucketItem(
                                    event, 
                                    this.props.itemObj.bucket_id, 
                                    this.props.itemObj.id)}/>
                            </CardActions>
                    </Card>
                </List>
            </div>
        );
    }
}
export default Item;





    

