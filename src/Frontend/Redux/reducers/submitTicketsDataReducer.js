const initState = {
  user: {
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: null
  },
  departure: {
    route_direction_id: null,
    seats: []
  },
  arrival: {
    route_direction_id: null,
    seats: []
  }
}



export default function submitTicketsDataReducer(state = initState, action) {
  if (action.type === 'SET_ROUTE_DIRECTION_ID') {
    const { direction, id } = action.payload;

    const newState = { ...state[direction] };
    newState.route_direction_id = id;

    return { ...state, [direction]: newState };
  }

  return state
}