const initState = {
  data: [],
  loading: false,
  error: null
}

export default function ticketDataReducer(state = initState, action) {
 
  if (action.type === 'SET_TICKETS_DATA') {
     console.log(action)
    return { ...state, data: action.payload, loading: false }
  }

  return state
}