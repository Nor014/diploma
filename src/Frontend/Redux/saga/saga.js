import { spawn, take, put, fork, call, takeLatest, delay } from 'redux-saga/effects';
import { setDirectionList, setTicketsData } from '../actions/actions';
import { fetchData } from '../fetchFunctions/fetchFunctions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


function* getDataSaga(action) {
  const { fromComponent, url } = action.payload;

  try {
    if (action.type === 'GET_LOCATIONS') yield delay(300);
    if (action.type === 'FIND_TICKETS') yield put(showLoading());

    const data = yield call(fetchData, url);
    console.log(data)

    if (fromComponent === 'directionInput') {
      yield put(setDirectionList(data, action.payload.name))
    } else if (fromComponent === 'FindTickets') {
      yield put(setTicketsData(data))
    }

  } catch (error) {
    // yield put(setError(error, fromComponent, action.payload.name))
  } finally {

    if (action.type === 'FIND_TICKETS') yield put(hideLoading());

  }
}

function* getLocationsWatcher() {
  yield takeLatest('GET_LOCATIONS', getDataSaga)
}

function* findTicketsWatcher() {
  while (true) {
    const action = yield take('FIND_TICKETS');
    yield fork(getDataSaga, action)
  }
}

function* getDataWatcher() {
  while (true) {
    const action = yield take('GET_DATA')
    yield fork(getDataSaga, action)
  }
}


export default function* saga() {
  yield spawn(getDataWatcher)
  yield spawn(getLocationsWatcher)
  yield spawn(findTicketsWatcher)
}