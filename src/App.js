import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Frontend/Redux/store/store';

import Header from './Frontend/Components/Header/Header';
import Footer from './Frontend/Components/Footer/Footer';
import MainPage from './Frontend/Components/MainPage/MainPage';
import OrderPage from './Frontend/Components/OrderPage/OrderPage';
import FinalPage from './Frontend/Components/FinalPage/FinalPage';
import AttentionPopup from './Frontend/Components/GeneralBlocks/AttentionPopup/AttentionPopup';

import './Frontend/index.css';


function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <div className="App">

          <AttentionPopup /> 

          <Header />
          <main className='main'>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/order' component={OrderPage} />
              <Route path='/order-success' component={FinalPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
