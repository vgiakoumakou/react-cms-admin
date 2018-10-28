import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Pages from "./components/pages";
import NewPage from "./components/newpage";
import EditPage from "./components/editpage";
import DeletePage from "./components/deletepage";
import logo from './logo.svg';
import './App.css';
import './style.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <div className="content">
            <Switch>
              <Route path="/pages" component={Pages} />
              <Route path="/newpage" component={NewPage} />
              <Route path="/editpage/:id" component={EditPage} />
              <Route path="/deletepage/:id" component={DeletePage} />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
