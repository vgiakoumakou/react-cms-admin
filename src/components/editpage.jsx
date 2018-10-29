import React from 'react';
import axios from 'axios';
import PageForm from './common/pageform';
import { FaEdit, FaTrashAlt, FaRegCalendarAlt } from 'react-icons/fa';

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

        data.type = data.type.toString();

        this.setState({ data });
    }

    doSubmit = async () => {
        const obj = this.state.data;
        const { data } = await axios.put(`http://pagesmanagement.azurewebsites.net/api/ResponsivePages/${this.props.match.params.id}`, obj);
                
        //Redirect to pages 
        this.props.history.push('/pages');
    }

    render() {
        // we use object destructuring to avoid repetitions
        //const { data, errors } = this.state;
        return ( 
            <div>
                <div className="row">
                    <div className="col-12">
                        <h4><FaEdit /> Edit Page {this.state.data.title && <span> - {this.state.data.title}</span>}</h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <span><FaRegCalendarAlt /> Published on  {new Date(this.state.data.publishedOn).toLocaleDateString()} </span>
                    </div>
                    <div className="col-6">
                        <button type="button" className="btn btn-danger deleteBtn" onClick={() => {this.props.history.push(`/deletepage/${this.props.match.params.id}`)}}><FaTrashAlt /> Delete this page</button>
                    </div>
                </div>
                <form className="pageForm">
                    <input type="number" id="id" name="id" className="form-control d-none" value={this.state.data.id} onChange={this.handleChange} readOnly />
                    {this.renderPageForm()}
                </form>
            </div>
        );
    }
}

export default EditPage;