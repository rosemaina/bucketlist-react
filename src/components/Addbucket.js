import React from 'react';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';



const Addbucket = (props) => {
        return(
            <div>
                <Card >
                    <form onSubmit={props.newBucketlist}>
                        <TextField
                            name="title"
                            hintText="Name your bucket!"
                            onChange={props.handleChange}
                            floatingLabelFixed={true}
                            value={props.title}
                        />
                        <FlatButton type="submit" label="Create" primary={true} />
                    </form>
                </Card>
            </div>
        );
    }
export default Addbucket;