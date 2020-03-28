const initState = {
  active: false,
  popup_type: null,
  popup_message: ''
}

export default function attentionPopupReducer(state = initState, action) {
  if (action.type === 'SET_ERROR') {
    const { error_type, message } = action.payload;

    return { ...state, active: true, popup_type: error_type, popup_message: message }
  }

  if (action.type === 'REMOVE_ERROR') {
    return initState
  }

  return state
}