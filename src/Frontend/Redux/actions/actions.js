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

export function changeDirectionValues() {
  return {
    type: 'CHANGE_DIRECTION_VALUES'
  }
}

export function clearDirectionList(name) {
  return {
    type: 'CLEAR_DIRECTION_LIST',
    payload: name
  }
}

export function setCityParams(id, paramsName) {
  return {
    type: 'SET_CITY_PARAMS',
    payload: {
      id: id,
      paramsName: paramsName
    }
  }
}

export function clearDirectionInput(name) {
  return {
    type: 'CLEAR_DIRECTION_INPUT',
    payload: name
  }
}

export function clearCityParams(name) {
  return {
    type: 'CLEAR_CITY_PARAMS',
    payload: name
  }
}

export function cancelFetchData(params) {
  return {
    type: 'CANCEL_FETCH_DATA',
    payload: params
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

// findTickets

export function findTickets(url, fromComponent) {
  return {
    type: 'FIND_TICKETS',
    payload: {
      url: url,
      fromComponent: fromComponent
    }
  }
}

// CheckBox

export function changeFiltersParams(paramsName) {
  return {
    type: 'CHANGE_FILTERS_PARAMS',
    paramsName: paramsName
  }
}

// RangeInput

export function changeRangeParams(params) {
  return {
    type: 'CHANGE_RANGE_PARAMS',
    payload: params
  }
}

// OrderTickets

export function setTicketsData(data) {
  return {
    type: 'SET_TICKETS_DATA',
    payload: data
  }
}

export function sortTickets(filter) {
  return {
    type: 'SORT_TICKETS',
    payload: filter
  }
}

// LastTickets

export function getLastTickets(url, fromComponent) {
  return {
    type: 'GET_LAST_TICKETS',
    payload: {
      url: url,
      fromComponent: fromComponent
    }
  }
}

export function setLastTickets(data) {
  return {
    type: 'SET_LAST_TICKETS',
    payload: data
  }
}

// OrderSeats

export function getSeatsData(url, directionName, fromComponent) {
  return {
    type: 'GET_SEATS_DATA',
    payload: {
      url: url,
      directionName: directionName,
      fromComponent: fromComponent
    }
  }
}

export function setSeatsData(data, directionName) {
  return {
    type: 'SET_SEATS_DATA',
    payload: {
      data: data,
      directionName: directionName
    }
  }
}

export function setPathDetails(details) {
  return {
    type: 'SET_PATH_DETAILS',
    payload: details
  }
}

export function clearOrderDetailsData() {
  return {
    type: 'CLEAR_ORDER_DETAILS_DATA'
  }
}

// Coach

export function changeCoachClass(coachClass, direction) {
  return {
    type: 'CHANGE_COACH_CLASS',
    payload: {
      coachClass: coachClass,
      direction: direction
    }
  }
}

export function changeCoachWagon(id, direction) {
  return {
    type: 'CHANGE_COACH_WAGONE',
    payload: {
      id: id,
      direction: direction
    }
  }
}

// CoachScheme

export function chooseSeat(seatIndex, ticketCategory) {
  return {
    type: 'CHOOSE_SEAT',
    payload: {
      seatIndex: seatIndex,
      ticketCategory: ticketCategory
    }
  }
}

export function setTicketDetails(ticketDetails) {
  return {
    type: 'SET_TICKET_DETAILS',
    payload: ticketDetails
  }
}

export function removeTicketDetails(seatIndex, ticketCategory) {
  return {
    type: 'REMOVE_TICKET_DETAILS',
    payload: {
      seatIndex: seatIndex,
      ticketCategory: ticketCategory
    }
  }
}

// OptionCheckBox

export function checkService(serviceName) {
  return {
    type: 'CHECK_SERVICE',
    payload: serviceName
  }
}

// Passengers

export function changePassengersNumber(number, category) {
  return {
    type: 'CHANGE_PASSENGERS_NUMBER',
    payload: {
      number: number,
      category: category
    }
  }
}

export function changePassengersCategory(category) {
  return {
    type: 'CHANGE_PASSENGERS_CATEGORY',
    payload: category
  }
}