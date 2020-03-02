const initState = {
  lastTickets: [],
  loading: false,
  error: null
}

export default function lastTicketsReducer(state = initState, action) {
  if (action.type === 'SET_LAST_TICKETS') {
    return { ...state, lastTickets: action.payload, loading: false, error: null }
  }

  return state
}