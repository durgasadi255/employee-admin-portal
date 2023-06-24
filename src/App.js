import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import Listings from './components/Listings';
import AddListing from './components/AddListings';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/listings">Employee List</Link>
          </li>
          <li>
            <Link to="/add-listing">Add Employee</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/listings">
          <Listings />
        </Route>
        <Route path="/add-listing">
          <AddListing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
