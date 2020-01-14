import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './Frontend/Components/Header/Header';
import MainPage from './Frontend/Components/MainPage/MainPage';

import './Frontend/Components/index.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className='main'>
          <Switch>
            <Route exact path='/' component={MainPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
