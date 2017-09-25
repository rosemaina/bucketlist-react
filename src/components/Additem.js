const Additem = (props) => {
    return(
        <div>
            <Card >
                <form onSubmit={props.newItem}>
                    <TextField
                        name="name"
                        hintText="Your activities"
                        onChange={props.handleChange}
                        floatingLabelFixed={true}
                        value={props.name}
                    />
                    <FlatButton type="submit" label="Add" primary={true} />
                </form>
            </Card>
        </div>
    );
}
export default Additem;