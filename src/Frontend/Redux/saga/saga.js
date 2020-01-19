import { spawn, take, put, fork, call, takeLatest } from 'redux-saga/effects';
import { setDirectionList } from '../actions/actions';
import { fetchData } from '../fetchFunctions/fetchFunctions';


function* getDataSaga(action) {
  const { fromComponent, url } = action.payload
  
  try {
    const data = yield call(fetchData, url);
    console.log(data)
    if (fromComponent === 'directionInput') {
      yield put(setDirectionList(data, action.payload.name))
    }

    // if (fromComponent === 'SalesHits') {
    //   yield put(setHits(data))
    // } else if (fromComponent === 'CatalogNav') {
    //   yield put(setCatalogNav(data))
    // } else if (fromComponent === 'Catalog') {
    //   yield data.length < 6 ? put(setCatalogAndDisable(data)) : put(setCatalog(data))
    // } else if (fromComponent === 'LoadMore') {
    //   yield data.length < 6 ? put(setMoreForCategoryAndDisable(data)) : put(setMoreForCategory(data))
    // } else if (fromComponent === 'Product') {
    //   yield put(setProduct(data))
  } catch (error) {
    // yield put(setError(error.message, fromComponent))
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