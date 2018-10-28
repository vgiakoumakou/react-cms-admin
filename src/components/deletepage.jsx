import React, { Component } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUndo } from 'react-icons/fa';

class DeletePage extends Component {
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

        await axios.delete(`http://pagesmanagement.azurewebsites.net/api/ResponsivePages/${this.props.match.params.id}`);
                
        //Redirect to pages 
        this.props.history.push('/pages');

    }

    render() { 
        return ( 
            <div>
                <h4><FaTrashAlt /> Delete Page #{this.props.match.params.id}</h4>
                <hr />
                <p>Are you sure you want to <b>permanently delete</b> the Page named <b>"{this.state.data.title}"</b>?</p>
                <button className="btn btn-danger" onClick={this.doSubmit}><FaTrashAlt /> Yes, delete it.</button>
                <button className="btn btn-secondary" onClick={() => {this.props.history.push(`/editpage/${this.props.match.params.id}`)}}><FaUndo /> Cancel</button>

            </div> );
    }
}
 
export default DeletePage;