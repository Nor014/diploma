const initState = {
  data: [],
  loading: false,
  error: null
}

export default function seatsDataReducer(state = initState, action) {
  if (action.type === 'GET_SEATS_DATA') {
    return { ...state, data: [], error: null, loading: true }
  }

  if (action.type === 'SET_SEATS_DATA') {
    return { ...state, data: action.payload, error: null, loading: false }
  }


  return state
}