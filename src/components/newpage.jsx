import React, { Component } from 'react';
import axios from 'axios';
import PageForm from './common/pageform';
import { FaExternalLinkAlt } from 'react-icons/fa';

class NewPage extends PageForm {
    state = {
        data: { title: "", description: "", type: 0, isActive: false, publishedOn: new Date().toISOString() },
        errors: {}
    };

    doSubmit = async () => {
        const obj = this.state.data;
        const { data } = await axios.post('http://pagesmanagement.azurewebsites.net/api/ResponsivePages/', obj);
        console.log(data);
    }

    render() {
        // we use object destructuring to avoid repetitions
        //const { data, errors } = this.state;
        return ( 
            <div>
                <h4><FaExternalLinkAlt /> New Page #{this.props.match.params.id}</h4>
                {this.renderPageForm()}
            </div> );
    }
}

export default NewPage;