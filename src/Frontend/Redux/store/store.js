import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga/saga';

import directionInputReducer from '../reducers/directionInputReducer';
import findTicketsReducer from '../reducers/findTicketsReducer';
import ticketDataReducer from '../reducers/ticketDataReducer';
import lastTicketsReducer from '../reducers/lastTicketsReducer';
import seatsDataReducer from '../reducers/seatsDataReducer';
import orderDetailsReducer from '../reducers/orderDetailsReducer';

import { loadingBarReducer } from 'react-redux-loading-bar';

const generalReducer = combineReducers({
  directionState: directionInputReducer,
  findTicketsState: findTicketsReducer,
  loadingBar: loadingBarReducer,
  ticketsData: ticketDataReducer,
  lastTicketsData: lastTicketsReducer,
  seatsData: seatsDataReducer,
  orderDetailsData: orderDetailsReducer
})

const sagaMiddleware = createSagaMiddleware();
const store = createStore(generalReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store