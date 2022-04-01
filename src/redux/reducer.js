import { SET_DATA } from './types'

const handlers = {
  [SET_DATA]: (state, { data }) => ({ ...state, data }),
  DEFAULT: state => state,
}

export default reducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
