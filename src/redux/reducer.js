import {
  ADD_TO_FAVORITES,
  DEL_FROM_FAVORITES,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_PHOTO,
  SET_PHOTO_WATCHER,
} from './types'

const initialState = {
  loading: false,
  error: false,
  gallery: [],
  photo: {
    id: null,
    uri: '',
  },
  favorites: [],
}

const handlers = {
  [SET_DATA]: (state, { gallery }) => ({ ...state, gallery }),
  [SET_LOADING]: (state, { loading }) => ({ ...state, loading }),
  [SET_PHOTO]: (state, { photo }) => ({ ...state, photo }),
  [SET_PHOTO_WATCHER]: (state, { photo }) => ({ ...state, photo }),
  [SET_ERROR]: (state, { error }) => ({ ...state, error }),
  [ADD_TO_FAVORITES]: (state, { favorites }) => ({ ...state, favorites }),
  [DEL_FROM_FAVORITES]: (state, { favorites }) => ({ ...state, favorites }),
  DEFAULT: state => state,
}

export default reducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
