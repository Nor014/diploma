const initState = {
  fromLocation: {
    value: '',
    list: []
  },
  toLocation: {
    value: '',
    list: []
  }
}

export default function directionInputReducer(state = initState, action) {
  if (action.type === 'SET_DIRECTION_INPUT_VALUE') {
    const { value, inputName } = action.payload;
    const newState = { ...state[inputName], value: value }

    return { ...state, [inputName]: newState };
  }

  if (action.type === 'SET_LOCATIONS') {
    const { directionList, name } = action.payload;

    console.log(state[name].value)
    // console.log(directionList.filter(el => el.subsring))

    const newState = { ...state[name], list: directionList }

    return { ...state, [name]: newState };
  }

  if (action.type === 'CHANGE_LISTS_VALUES') {
    const changedFromLocation = state.toLocation,
      changedToLocation = state.fromLocation;
    return { ...state, fromLocation: changedFromLocation, toLocation: changedToLocation };
  }

  if (action.type === 'CLEAR_DIRECTION_LIST') {
    const name = action.payload;
    const newState = { ...state[name], list: [] }

    return { ...state, [name]: newState }
  }

  return state
}