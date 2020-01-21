import { spawn, take, put, fork, call, takeLatest, delay } from 'redux-saga/effects';
import { setDirectionList, setError } from '../actions/actions';
import { fetchData } from '../fetchFunctions/fetchFunctions';


function* getDataSaga(action) {
  const { fromComponent, url } = action.payload

  try {
    if (action.type === 'GET_LOCATIONS') {
      yield delay(300)
    }

    const data = yield call(fetchData, url);
    console.log(data)
    if (fromComponent === 'directionInput') {
      yield put(setDirectionList(data, action.payload.name))
    }

  } catch (error) {
    // yield put(setError(error, fromComponent, action.payload.name))
  }
}

function* getLocationsWatcher() {
  yield takeLatest('GET_LOCATIONS', getDataSaga)
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
}