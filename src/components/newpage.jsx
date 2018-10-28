import React, { Component } from 'react';
import axios from 'axios';
import PageForm from './common/pageform';
import { FaExternalLinkAlt } from 'react-icons/fa';

class NewPage extends PageForm {
    state = {
        data: { title: "", description: "", type: "", isActive: true, publishedOn: new Date().toISOString() },
        errors: {}
    };

    doSubmit = async () => {
        console.log('prin '+ this.state.data );
        const obj = this.state.data;
        const { data } = await axios.post('http://pagesmanagement.azurewebsites.net/api/ResponsivePages/', obj);
        console.log(data);
        
        //Redirect to pages 
        this.props.history.push('/pages');
    }

    render() {
        // we use object destructuring to avoid repetitions
        //const { data, errors } = this.state;
        return ( 
            <div>
                <h4><FaExternalLinkAlt /> New Page {this.state.data.title}</h4>
                <form>
                    {this.renderPageForm()}
                </form>
            </div> );
    }
}

export default NewPage;