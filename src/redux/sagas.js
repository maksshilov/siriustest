import { call, takeEvery, take, put, fork, spawn, select, all } from 'redux-saga/effects'
import { createClient } from 'pexels'
import { SET_DATA, SET_ERROR, SET_LOADING, SET_PHOTO, SET_PHOTO_WATCHER, TRY_AGAIN } from '../redux/types'

const client = createClient('563492ad6f91700001000001757b6bd2d3cb4877a0bce035be1e347f')
const query = 'Nature'

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

function* loadGalleryWatcher() {
  yield takeEvery(TRY_AGAIN, loadGallery)
}

function* loadPhoto() {
  console.log('LOADPHOTO')
  try {
    yield put({ type: SET_LOADING, loading: true })

    const { id } = yield select(state => state.photo)

    const data = yield call(client.photos.show, { id })

    yield put({ type: SET_PHOTO, photo: { id, uri: data.src.medium } })

    yield put({ type: SET_LOADING, loading: false })
  } catch (error) {
    console.log('ERROR >>> loadPhoto')
  }
}

function* loadPhotoWatcher() {
  yield takeEvery(SET_PHOTO_WATCHER, loadPhoto)
}

export default function* rootSaga() {
  const sagas = [loadGallery, loadGalleryWatcher, loadPhotoWatcher].map(s => spawn(s))

  yield all(sagas)
}
