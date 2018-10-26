import React, { Component } from 'react';

class EditPage extends Component {
    state = {  }
    render() {
        return ( 
            <div>
                Edit Page #{this.props.match.params.id}
            </div> );
    }
}

export default EditPage;