import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga/saga';
import directionInputReducer from '../reducers/directionInputReducer';

const generalReducer = combineReducers({
  directionState: directionInputReducer
})

const sagaMiddleware = createSagaMiddleware();
const store = createStore(generalReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)

export default store