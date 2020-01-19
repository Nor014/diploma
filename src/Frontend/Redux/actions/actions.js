// directionInput

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