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

  if (action.type === 'SET_SUBMIT_TICKET_DATA') {
    const { direction, data } = action.payload;

    const newState = { ...state[direction] };
    newState.seats.push(data);

    console.log(state)
    return { ...state, [direction]: newState };
  }

  if (action.type === 'REMOVE_SUBMIT_TICKET_DATA') {
    const id = action.payload;

    const newState = { ...state };
    newState.departure.seats = newState.departure.seats.filter(seat => seat.passengerId !== id);

    if (newState.arrival.seats.length > 0) {
      newState.arrival.seats = newState.arrival.seats.filter(seat => seat.passengerId !== id);
    }

    console.log(newState)
    return newState;
  }

  return state
}