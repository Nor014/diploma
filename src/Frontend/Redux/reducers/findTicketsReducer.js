const initState = {
  from_city_id: null,
  to_city_id: null,
  date_start: null,
  date_end: null,
  date_start_arrival: null,
  date_end_arrival: null,
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_air_conditioning: false,
  have_express: false,
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

  if (action.type === 'SET_CITY_PARAMS') {
    const { id, paramsName } = action.payload;
    return { ...state, [paramsName]: id }
  }

  if (action.type === 'CLEAR_CITY_PARAMS') {
    const name = action.payload;
    return { ...state, [name]: null }
  }

  if (action.type === 'CHANGE_DIRECTION_VALUES') {
    const changedFromLocation = state.to_city_id;
    const changedToLocation = state.from_city_id;

    return { ...state, from_city_id: changedFromLocation, to_city_id: changedToLocation };
  }

  if (action.type === 'CHANGE_FILTERS_PARAMS') {
    const { paramsName } = action;
    return { ...state, [paramsName]: !state[paramsName] }
  }

  if (action.type === 'CHANGE_RANGE_PARAMS') {
    const params = action.payload;
    const minParamsName = Object.keys(params)[0];
    const maxParamsName = Object.keys(params)[1];
    const minParamsValue = Object.values(params)[0];
    const maxParamsValue = Object.values(params)[1];

    return { ...state, [minParamsName]: minParamsValue, [maxParamsName]: maxParamsValue }
  }

  return state
}