const initState = {
  data: [],
  loading: false,
  error: null
}

export default function lastTicketsReducer(state = initState, action) {
  if (action.type === 'SET_LAST_TICKETS') {
    return { ...state, data: action.payload, loading: false, error: null }
  }

  return state
}