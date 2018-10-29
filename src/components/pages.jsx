import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './common/pagination.jsx';
import { paginate } from '../utils/paginate';
import { FaEdit, FaPlusCircle, FaDesktop, FaSearch } from 'react-icons/fa';

class Pages extends Component {

      state = {
          pages: [],
          currentPage: 1,
          pageSize: 5,
          filteredPages: []
      };
    
      async componentDidMount() {
        // pending > resolved (success) OR rejected (failure)
        // we await the result of the call and get the actual response object
        const { data: pages } = await axios.get('http://pagesmanagement.azurewebsites.net/api/ResponsivePages')
        
        this.setState({ pages, filteredPages: pages });
      }

      getPageType(pageType) {
        if (pageType === 0)
          return "Menu"
        else if (pageType === 1)
          return "Events"
        else
          return "Content"
      }

      handlePageChange = page => {
        this.setState({ currentPage: page });
      }

      filterPageByTitle = (event) => {
        let filteredPages = this.state.pages;
        filteredPages = filteredPages.filter((page) => {
          return page.title.toLowerCase().search( 
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ filteredPages });
      };
    
      render() {

        const { pageSize, currentPage, pages: allPages, filteredPages } = this.state;

        const pages = paginate(filteredPages, currentPage, pageSize);

        return (
          <div>
            <h4><FaDesktop /> Responsive Pages</h4>
            <hr />
            <div className="row">
              <div className="col-6">
                <button className="btn btn-primary createPageBtn"><Link to="/newpage"><FaPlusCircle /> Create New Page</Link></button>
              </div>
              <div className="col-6">
                <form>
                  <div className="input-group searchGroup">
                    <div className="input-group-prepend">
                      <span className="input-group-text primary"><FaSearch /></span>
                    </div>
                    <input type="text" className="form-control form-control" placeholder="Search page title" onChange={this.filterPageByTitle}/>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table className="table pagesTable">
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
                      <span>{filteredPages.length === 0 ? "There are no pages to display." : "" }</span>
                      {pages.map(page => (
                      <tr key={page.id}>
                          <th scope="row">{page.id}</th>
                          <td>{page.title}</td>
                          <td>{page.description}</td>
                          <td>{this.getPageType(page.type)}</td>
                          <td>{page.isActive? "Yes" : "No"}</td>
                          <td>{new Date(page.publishedOn).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-light btn-outline-primary"><Link to={`/editpage/${page.id}`}><FaEdit /> Edit</Link></button> 
                            {/* <button type="button" className="btn btn-danger"><Link to={`/deletepage/${page.id}`}><FaTrashAlt /> Delete Page</Link></button> */}
                          </td>
                      </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination 
              itemsCount={this.state.filteredPages.length} 
              pageSize={pageSize} 
              currentPage={currentPage} 
              onPageChange={this.handlePageChange} />
          </div>
        );
      }
}

export default Pages;