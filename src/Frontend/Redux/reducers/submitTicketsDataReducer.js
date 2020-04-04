const initState = {
  data: {
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
  },
  post_status: null
}


export default function submitTicketsDataReducer(state = initState, action) {
  if (action.type === 'SET_ROUTE_DIRECTION_ID') {
    const { direction, id } = action.payload;

    const newState = { ...state.data };
    newState[direction].route_direction_id = id;

    return { ...state, data: newState };
  }

  if (action.type === 'SET_SUBMIT_TICKET_DATA') {
    const { direction, data } = action.payload;

    const newState = { ...state.data };
    newState[direction].seats.push(data);

    return { ...state, data: newState };
  }

  if (action.type === 'REMOVE_SUBMIT_TICKET_DATA') {
    const id = action.payload;

    const newState = { ...state.data };
    newState.departure.seats = newState.departure.seats.filter(seat => seat.passengerId !== id);

    if (newState.arrival.seats.length > 0) {
      newState.arrival.seats = newState.arrival.seats.filter(seat => seat.passengerId !== id);
    }

    return { ...state, data: newState };
  }

  if (action.type === 'SET_USER_PARAMS') {
    let { paramsName, value } = action.payload;
    const newState = { ...state.data };

    if (paramsName === 'phone') value = value.replace(/-/g, '');
    newState.user[paramsName] = value;

    return { ...state, data: newState };
  }

  if (action.type === 'SET_POST_RESPONSE_MESSAGE') {
    console.log(action.payload)
    return { ...state, post_status: action.payload.status }
  }

  if (action.type === 'SUBMIT_DATA_TO_DEFAULT_STATE' || action.type === 'RESET_REDUCERS') {
    return {
      data: {
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
      },
      post_status: null
    }
  }

  return state
}