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

    const sortedList = directionList
      .filter(el => el.name.substring(0, state[name].value.length) === state[name].value.toLowerCase())
      .map(el => {
        el.name = el.name[0].toUpperCase() + el.name.slice(1);
        return el;
      })

    const newState = { ...state[name], list: sortedList }
    return { ...state, [name]: newState };
  }

  if (action.type === 'CHANGE_DIRECTION_VALUES') {
    const changedFromLocation = state.toLocation;
    const changedToLocation = state.fromLocation;

    return { ...state, fromLocation: changedFromLocation, toLocation: changedToLocation };
  }

  if (action.type === 'CLEAR_DIRECTION_LIST') {
    const name = action.payload;
    const newState = { ...state[name], list: [] }

    return { ...state, [name]: newState }
  }

  if (action.type === 'CLEAR_DIRECTION_INPUT') {
    const name = action.payload;
    const newState = { ...state[name], value: [] }

    return { ...state, [name]: newState }
  }

  return state
}