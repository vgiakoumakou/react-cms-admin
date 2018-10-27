import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Pages extends Component {

      state = {
          pages: []
      };
    
      async componentDidMount() {
        // pending > resolved (success) OR rejected (failure)
        // we await the result of the call and get the actual response object
        const { data: pages } = await axios.get('http://pagesmanagement.azurewebsites.net/api/ResponsivePages')
        this.setState({ pages });
      }
    
      render() {
        return (
          <div>
            <h4>Responsive Pages</h4>
            <button className="btn btn-light"><Link to="/newpage">(+) Create New Page</Link></button>
            <table className="table">
              <thead>
                  <tr>
                      <th scope="col">#id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>  
                      <th scope="col">Type</th>
                      <th scope="col">isActive</th>
                      <th scope="col">Published On</th>
                      <th scope="col"></th>
                  </tr>
              </thead>
              <tbody>
                  {this.state.pages.map(page => (
                  <tr key={page.id}>
                      <th scope="row">{page.id}</th>
                      <td>{page.title}</td>
                      <td>{page.description}</td>
                      <td>{page.type}</td>
                      <td>{page.isActive}</td>
                      <td>{new Date(page.publishedOn).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-light"><Link to={`/editpage/${page.id}`}><FaEdit /> Edit</Link></button> 
                        <button type="button" className="btn btn-danger"><FaTrashAlt /> Delete</button>
                      </td>
                  </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      }
}

export default Pages;