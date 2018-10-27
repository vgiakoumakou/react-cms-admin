import React, { Component } from 'react';
import axios from 'axios';
import PageForm from './common/pageform';
import { FaEdit } from 'react-icons/fa';

class EditPage extends PageForm {
    state = {
        data: {},
        errors: {}
    };

    async componentDidMount() {
        // pending > resolved (success) OR rejected (failure)
        // we await the result of the call and get the actual response object
        const { data } = await axios.get('http://pagesmanagement.azurewebsites.net/api/ResponsivePages/', {
            params: {
              id: `${this.props.match.params.id}`
            }
        });
        this.setState({ data });
        console.log(data);
    }

    doSubmit = async () => {
        const obj = this.state.data;
        const { data } = await axios.put('http://pagesmanagement.azurewebsites.net/api/ResponsivePages/'+ this.props.match.params.id, obj);
        console.log(obj);
    }

    render() {
        // we use object destructuring to avoid repetitions
        //const { data, errors } = this.state;
        return ( 
            <div>
                <h4><FaEdit /> Edit Page #{this.props.match.params.id}</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="number" id="id" name="id" className="form-control" value={this.state.data.id} onChange={this.handleChange} readOnly />
                    {this.renderPageForm()}
                </form>
            </div> );
    }
}

export default EditPage;