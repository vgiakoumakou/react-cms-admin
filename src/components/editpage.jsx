import React, { Component } from 'react';
import Joi from 'joi-browser';
import PageForm from './common/pageform';
import { FaEdit } from 'react-icons/fa';

class EditPage extends PageForm {
    state = {
        data: { title: "PageAA", description: "DescrAA"},
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
                <h4><FaEdit /> Edit Page #{this.props.match.params.id}</h4>
                {this.renderPageForm()}
            </div> );
    }
}

export default EditPage;