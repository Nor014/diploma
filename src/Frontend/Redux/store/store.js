import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga/saga';
import directionInputReducer from '../reducers/directionInputReducer';
import findTicketsReducer from '../reducers/findTicketsReducer';

const generalReducer = combineReducers({
  directionState: directionInputReducer,
  findTicketsState: findTicketsReducer
})

const sagaMiddleware = createSagaMiddleware();
const store = createStore(generalReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)

export default store