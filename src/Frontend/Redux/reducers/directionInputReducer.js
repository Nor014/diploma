const initState = {
  fromLocation: [],
  toLocation: [],
}

export default function directionInputReducer(state = initState, action) {
  if (action.type === 'SET_LOCATIONS') {
    const { directionList, name } = action.payload;
    return { ...state, [name]: directionList };
  }

  if (action.type === 'CHANGE_LISTS_VALUES') {
    const changedFromLocation = state.toLocation,
      changedToLocation = state.fromLocation;
    return { ...state, fromLocation: changedFromLocation, toLocation: changedToLocation };
  }

  if (action.type === 'CLEAR_DIRECTION_LIST') {
    const { name } = action.payload;
    return name ? { ...state, [name]: [] } : initState;
  }

  return state
}