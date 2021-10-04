import './App.css';
import React from 'react';
import SearchPage from "./components/SearchPage";
import DisplayPage from './components/DisplayPage';
import PageNotFound from './components/PageNotFound'
import { BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Router>
      <div className="headerApp">
        <h1>
        <Link to="/">
          Rijks Collection
        </Link>
        </h1>
      </div>
      
    
    
      <Switch>
      <Route exact path="/">
          <Redirect to="/search/" /> : <SearchPage />
        </Route>
        <Route path="/search" exact>
          <SearchPage />
        </Route>
        <Route path="/object/:id">
          <DisplayPage />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    
    </Router>
    </div>
  );
}

export default App;
