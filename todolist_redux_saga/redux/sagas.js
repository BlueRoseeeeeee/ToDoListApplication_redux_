import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
} from './actions';

const url = 'https://6719211b7fc4c5ff8f4c8db7.mockapi.io/toDo';

function* fetchItems() {
  try {
    const response = yield call(fetch, url);
    const data = yield response.json();
    yield put({ type: FETCH_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCH_ITEMS_FAILURE, payload: error.message });
  }
}

function* addItem(action) {
  try {
    const response = yield call(fetch, url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: action.payload }),
    });
    const data = yield response.json();
    yield put({ type: ADD_ITEM_SUCCESS, payload: data });
  } catch (error) {
    // Handle error if necessary
  }
}

function* updateItem(action) {
  try {
    const response = yield call(fetch, `${url}/${action.payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: action.payload.updatedText }),
    });
    const data = yield response.json();
    yield put({ type: UPDATE_ITEM_SUCCESS, payload: { id: action.payload.id, updatedText: data.title } });
  } catch (error) {
    // Handle error if necessary
  }
}

function* deleteItem(action) {
  try {
    yield call(fetch, `${url}/${action.payload}`, { method: 'DELETE' });
    yield put({ type: DELETE_ITEM_SUCCESS, payload: action.payload });
  } catch (error) {
    // Handle error if necessary
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_ITEMS_REQUEST, fetchItems);
  yield takeEvery(ADD_ITEM_REQUEST, addItem);
  yield takeEvery(UPDATE_ITEM_REQUEST, updateItem);
  yield takeEvery(DELETE_ITEM_REQUEST, deleteItem);
}
