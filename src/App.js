import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Frontend/Redux/store/store';

import Header from './Frontend/Components/Header/Header';
import Footer from './Frontend/Components/Footer/Footer';
import MainPage from './Frontend/Components/MainPage/MainPage';

import './Frontend/index.css';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main className='main'>
            <Switch>
              <Route exact path='/' component={MainPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
