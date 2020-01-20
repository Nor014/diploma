
const initState = {
  from_city_id: null,
  to_city_id: null,
  date_start: null,
  date_end: null,
  date_start_arrival: null,
  date_end_arrival: null,
  have_first_class: null,
  have_second_class: null,
  have_third_class: null,
  have_fourth_class: null,
  have_wifi: null,
  have_air_conditioning: null,
  have_express: null,
  price_from: null,
  price_to: null,
  start_departure_hour_from: null,
  start_departure_hour_to: null,
  start_arrival_hour_from: null,
  start_arrival_hour_to: null,
  end_departure_hour_from: null,
  end_departure_hour_to: null,
  end_arrival_hour_from: null,
  end_arrival_hour_to: null,
  limit: null,
  offset: null,
  sort: null
}

export default function findTicketsReducer(state = initState, action) {
  if (action.type === 'SET_DATE') {
    const { date, paramsName } = action.payload;
    return { ...state, [paramsName]: date }
  }

  if (action.type === 'SET_CITY') {
    const { id, paramsName } = action.payload;
    return { ...state, [paramsName]: id }
  }

  return state
}