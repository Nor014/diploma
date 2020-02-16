const initState = {
  passengersAmount: {
    adult: {
      maxValue: 5,
      value: 0
    },
    children: {
      maxValue: 4,
      value: 0
    },
    withoutTicket: 0
  }
}

export default function orderDetailsReducer(state = initState, action) {

  return state
}