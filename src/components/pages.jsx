import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          pages: []
        };
      }
    
      componentDidMount() {
        fetch("http://pagesmanagement.azurewebsites.net/api/ResponsivePages")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result.pages);
              this.setState({
                isLoaded: true,
                pages: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, pages } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
                <h4>Responsive Pages</h4>
                <table class="table">
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
                            <td><button type="button" className="btn btn-light"><Link to={`/editpage/${page.id}`}><FaEdit /> Edit</Link></button> <button type="button" className="btn btn-danger"><FaTrashAlt /> Delete</button></td>
                            
                        </tr>
                        ))}
                    {/* {this.state.pages.map(page => (
                        <li key={page.id}>
                        <a href={`/pages/${page.id}`}>{page.title}</a>
                        </li>
                    ))} */}
                    </tbody>
                </table>
            </div>

          );
        }
      }
}

export default Pages;