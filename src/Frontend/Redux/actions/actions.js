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

export function clearCityParams(name) {
  return {
    type: 'CLEAR_CITY_PARAMS',
    payload: name
  }
}

export function clearDirectionInput(name) {
  return {
    type: 'CLEAR_DIRECTION_INPUT',
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

export function findTickets(url, fromComponent, redirectFromMain = false) {
  return {
    type: 'FIND_TICKETS',
    payload: {
      url: url,
      fromComponent: fromComponent,
      redirectFromMain: redirectFromMain
    }
  }
}

// OrderSteps

export function changeOrderStep(stepIndex) {
  return {
    type: 'CHANGE_ORDER_STEP',
    payload: stepIndex
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

// OrderPage

export function resetRedirectFromMain() {
  return {
    type: 'RESET_REDIRECT_FROM_MAIN'
  }
}

// OrderTickets

export function setTicketsData(data, redirectFromMain) {
  return {
    type: 'SET_TICKETS_DATA',
    payload: { data, redirectFromMain }
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

export function setPathDetails(details, direction) {
  return {
    type: 'SET_PATH_DETAILS',
    payload: {
      details: details,
      direction: direction,
    }
  }
}

export function clearOrderDetailsData() {
  return {
    type: 'CLEAR_ORDER_DETAILS_DATA'
  }
}

export function clearSeatsData() {
  return {
    type: 'CLEAR_SEATS_DATA'
  }
}

export function setFullPathData(data) {
  return {
    type: 'SET_FULL_PATH_DATA',
    payload: data
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

export function chooseSeat(seatIndex, ticketCategory, direction) {
  return {
    type: 'CHOOSE_SEAT',
    payload: {
      seatIndex: seatIndex,
      ticketCategory: ticketCategory,
      direction: direction
    }
  }
}

export function setTicketDetails(ticketDetails) {
  return {
    type: 'SET_TICKET_DETAILS',
    payload: ticketDetails
  }
}

export function removeTicketDetails(seatIndex, ticketCategory, direction) {
  return {
    type: 'REMOVE_TICKET_DETAILS',
    payload: {
      seatIndex: seatIndex,
      ticketCategory: ticketCategory,
      direction: direction
    }
  }
}

// OptionCheckBox

export function checkService(serviceName, direction) {
  return {
    type: 'CHECK_SERVICE',
    payload: {
      serviceName: serviceName,
      direction: direction
    }
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

// Registration

export function setRouteDirectionId(direction, id) {
  return {
    type: 'SET_ROUTE_DIRECTION_ID',
    payload: {
      direction: direction,
      id: id
    }
  }
}

export function setSubmitTicketData(direction, data) {
  return {
    type: 'SET_SUBMIT_TICKET_DATA',
    payload: {
      direction: direction,
      data: data
    }
  }
}

export function removeSubmitTicketData(id) {
  return {
    type: 'REMOVE_SUBMIT_TICKET_DATA',
    payload: id
  }
}

export function submitDataToDefaultState() {
  return {
    type: 'SUBMIT_DATA_TO_DEFAULT_STATE'
  }
}

// Payment

export function setUserParams(paramsName, value) {
  return {
    type: 'SET_USER_PARAMS',
    payload: {
      paramsName: paramsName,
      value: value
    }
  }
}

// AttentionPopup

export function setError(error_type, message) {
  return {
    type: 'SET_ERROR',
    payload: {
      error_type,
      message
    }
  }
}

export function removeError() {
  return {
    type: 'REMOVE_ERROR'
  }
}

// DataConfirmation

export function postSubmitData(data) {
  return {
    type: 'POST_SUBMIT_DATA',
    payload: data
  }
}

export function setPostResponseMessage(message) {
  return {
    type: 'SET_POST_RESPONSE_MESSAGE',
    payload: message
  }
}

// FinalPage

export function resetReducers() {
  return {
    type: 'RESET_REDUCERS'
  }
}

// Для маршрутизации

export function orderStepComplete(fromComponent) {
  return {
    type: `ORDER_STEP_COMPLETE_${fromComponent.toUpperCase()}`
  }
}

// Supscription

export function subscribe(fromComponent, url) {
  return {
    type: 'SUBSCRIBE',
    payload: {
      fromComponent,
      url
    }
  }
}