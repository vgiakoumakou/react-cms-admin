import React, { Component } from 'react';
import PageForm from './common/pageform';
import { FaEdit } from 'react-icons/fa';

class NewPage extends PageForm {
    state = {
        data: { title: "", description: ""},
        errors: {}
    };

    doSubmit = () => {
        // Call the server
        console.log("Submitted!");
    }

    render() {
        // we use object destructuring to avoid repetitions
        //const { data, errors } = this.state;
        return ( 
            <div>
                <h4><FaEdit /> New Page #{this.props.match.params.id}</h4>
                {this.renderPageForm()}
            </div> );
    }
}

export default NewPage;