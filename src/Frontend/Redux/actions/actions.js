// directionInput

export function setDirectionInputValue(value, inputName) {
  return {
    type: 'SET_DIRECTION_INPUT_VALUE',
    payload: {
      value: value,
      inputName: inputName
    }
  }
}

export function getLocations(fromComponent, url, name) {
  return {
    type: `GET_LOCATIONS`,
    payload: {
      url: url,
      fromComponent: fromComponent,
      name: name
    }
  }
}

export function setDirectionList(list, name) {
  return {
    type: 'SET_LOCATIONS',
    payload: {
      directionList: list,
      name: name
    }
  }
}

export function changeListsValues() {
  return {
    type: 'CHANGE_LISTS_VALUES'
  }
}

export function clearDirectionList(name) {
  return {
    type: 'CLEAR_DIRECTION_LIST',
    payload: name
  }
}

export function setCity(id, paramsName) {
  return {
    type: 'SET_CITY',
    payload: {
      id: id,
      paramsName: paramsName
    }
  }
}


// dateInput

export function setDate(date, paramsName) {
  return {
    type: 'SET_DATE',
    payload: {
      date: date,
      paramsName: paramsName
    }
  }
}