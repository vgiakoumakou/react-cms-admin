import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaFolderPlus } from 'react-icons/fa';

class Pages extends Component {

      state = {
          pages: []
      };
    
      async componentDidMount() {
        // pending > resolved (success) OR rejected (failure)
        // we await the result of the call and get the actual response object
        const { data: pages } = await axios.get('http://pagesmanagement.azurewebsites.net/api/ResponsivePages')
        this.setState({ pages });
        console.log(pages);
      }

      getPageType(pageType) {
        if (pageType === 0)
          return "Menu"
        else if (pageType === 1)
          return "Events"
        else
          return "Content"
      }
    
      render() {
        return (
          <div>
            <h4>Responsive Pages</h4>
            <button className="btn btn-light"><Link to="/newpage"><FaFolderPlus /> Create New Page</Link></button>
            <table className="table">
              <thead>
                  <tr>
                      <th scope="col">#id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>  
                      <th scope="col">Type</th>
                      <th scope="col">Active</th>
                      <th scope="col">Published on</th>
                      <th scope="col"></th>
                  </tr>
              </thead>
              <tbody>
                  {this.state.pages.map(page => (
                  <tr key={page.id}>
                      <th scope="row">{page.id}</th>
                      <td>{page.title}</td>
                      <td>{page.description}</td>
                      <td>{this.getPageType(page.type)}</td>
                      <td>{page.isActive? "Yes" : "No"}</td>
                      <td>{new Date(page.publishedOn).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-light"><Link to={`/editpage/${page.id}`}><FaEdit /> Edit</Link></button> 
                        {/* <button type="button" className="btn btn-danger"><Link to={`/deletepage/${page.id}`}><FaTrashAlt /> Delete Page</Link></button> */}
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