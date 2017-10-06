import React from 'react';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const Addbucket = (props) => {
        return(
            <div className="addBucket">
                <Card >
                    <form onSubmit={props.newBucketlist}>
                        <TextField
                            placeholder="Name your bucketlist"
                            name="title"
                            onChange={props.handleChange}
                            floatingLabelFixed
                            value={props.title}
                        />
                        <FlatButton label= "Create" primary type="submit" />
                    </form>
                </Card>
            </div>
        );
    };

export default Addbucket;