import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
   addSongRequest, addSongSuccess, addSongFailure,
  updateSongRequest, updateSongSuccess, updateSongFailure,
  deleteSongRequest, deleteSongSuccess, deleteSongFailure
} from './songsSlice';

const API = 'http://localhost:4000/api/songs';

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, API);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action) {
  try {
    const response = yield call(axios.post, API, action.payload);
    yield put(addSongSuccess(response.data));
  } catch (e) {
    yield put(addSongFailure(e.message));
  }
}

function* updateSongSaga(action) {
  try {
    const response = yield call(axios.put, `${API}/${action.payload.id}`, action.payload);
    yield put(updateSongSuccess(response.data));
  } catch (e) {
    yield put(updateSongFailure(e.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `${API}/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (e) {
    yield put(deleteSongFailure(e.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(fetchSongsRequest.type, fetchSongsSaga),
    takeEvery(addSongRequest.type, addSongSaga),
    takeEvery(updateSongRequest.type, updateSongSaga),
    takeEvery(deleteSongRequest.type, deleteSongSaga)
  ]);
}
