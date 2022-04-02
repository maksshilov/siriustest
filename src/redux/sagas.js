import { call, takeEvery, put, spawn, select, all } from 'redux-saga/effects'
import { createClient } from 'pexels'
import {
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_PHOTO,
  SET_PHOTO_WATCHER,
  TRY_AGAIN_LOAD_GALLERY,
  TRY_AGAIN_LOAD_PHOTO,
} from '../redux/types'
import { API_KEY, QUERY } from '../../keys'

const client = createClient(API_KEY)
const query = QUERY

function* loadGallery() {
  try {
    yield put({ type: SET_ERROR, error: false })
    yield put({ type: SET_LOADING, loading: true })

    const data = yield call(client.photos.search, { query, per_page: 50 })
    yield put({ type: SET_DATA, gallery: data.photos })

    yield put({ type: SET_LOADING, loading: false })
  } catch (error) {
    console.log('ERROR >>> loadGallery')
    yield put({ type: SET_ERROR, error: true })
  }
}

function* loadGalleryWatcherTryAgain() {
  yield takeEvery(TRY_AGAIN_LOAD_GALLERY, loadGallery)
}

function* loadPhoto() {
  try {
    yield put({ type: SET_LOADING, loading: true })

    const { id } = yield select(state => state.photo)

    const data = yield call(client.photos.show, { id })

    yield put({ type: SET_PHOTO, photo: { id, uri: data.src.medium } })

    yield put({ type: SET_LOADING, loading: false })
  } catch (error) {
    console.log('ERROR >>> loadPhoto')
    yield put({ type: SET_ERROR, error: true })
  }
}

function* loadPhotoWatcher() {
  yield takeEvery(SET_PHOTO_WATCHER, loadPhoto)
}

function* loadPhotoWatcherTryAgain() {
  yield takeEvery(TRY_AGAIN_LOAD_PHOTO, loadPhoto)
}

export default function* rootSaga() {
  const sagas = [loadGallery, loadGalleryWatcherTryAgain, loadPhotoWatcher, loadPhotoWatcherTryAgain]
  const spawnSagas = sagas.map(s => spawn(s))
  yield all(spawnSagas)
}
