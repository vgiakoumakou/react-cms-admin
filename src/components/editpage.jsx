import React, { Component } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class EditPage extends Component {
    state = {  }
    render() {
        return ( 
            <div>
                <FaEdit /> Edit Page #{this.props.match.params.id}
            </div> );
    }
}

export default EditPage;