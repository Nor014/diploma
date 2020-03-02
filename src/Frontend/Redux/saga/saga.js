import { spawn, take, put, fork, call, takeLatest, delay, race } from 'redux-saga/effects';
import { setDirectionList, setTicketsData, clearDirectionList, setLastTickets, setSeatsData } from '../actions/actions';
import { fetchData } from '../fetchFunctions/fetchFunctions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


function* getDataSaga(action) {
  const { fromComponent, url } = action.payload;

  try {
    if (action.type === 'FIND_TICKETS') yield put(showLoading());

    if (fromComponent === 'directionInput') { // необходимо для отмены последнего запроса при пустом инпуте выбора города
      const { data, cancel } = yield race({
        data: call(fetchData, url),
        cancel: take('CANCEL_FETCH_DATA')
      })

      if (cancel) {
        console.log('canceled', fromComponent)
      }

      yield put(setDirectionList(data, action.payload.name))
    }

    const data = yield call(fetchData, url);

    if (fromComponent === 'FindTickets') {
      yield put(setTicketsData(data))
    } else if (fromComponent === 'LastTickets') {
      yield put(setLastTickets(data))
    } else if (fromComponent === 'OrderSeats') {
      yield put(setSeatsData(data, action.payload.directionName))
    }

  } catch (error) {

  } finally {

    if (action.type === 'FIND_TICKETS') yield put(hideLoading());

  }
}

function* getLocationsWatcher() {
  yield takeLatest('GET_LOCATIONS', getDataSaga);
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

function* lastTicketsWatcher() {
  while (true) {
    const action = yield take('GET_LAST_TICKETS')
    yield fork(getDataSaga, action)
  }
}

function* seatsWatcher() {
  while (true) {
    const action = yield take('GET_SEATS_DATA')
    yield fork(getDataSaga, action)
  }
}

export default function* saga() {
  yield spawn(getDataWatcher)
  yield spawn(getLocationsWatcher)
  yield spawn(findTicketsWatcher)
  yield spawn(lastTicketsWatcher)
  yield spawn(seatsWatcher)
}