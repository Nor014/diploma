const initState = {
  pathDetails: {},
  ticketCategories: [
    {
      categoryName: 'adult',
      categoryHint: 'взрослый',
      maxAmountOfTickets: 5,
      currentAmountOfTickets: 0,
      active: true,
      ticketsData: {}
    },
    {
      categoryName: 'children',
      categoryHint: 'детский',
      maxAmountOfTickets: 4,
      currentAmountOfTickets: 0,
      active: false,
      ticketsData: {}
    },
  ]
}

export default function orderDetailsReducer(state = initState, action) {
  if (action.type === 'CHANGE_PASSENGERS_NUMBER') {
    const { number, category } = action.payload;
    const newState = { ...state.passengersAmount };

    newState[category].value = number > newState[category].maxValue
      ? newState[category].maxValue
      : number;

    return { ...state, passengersAmount: newState }
  }

  if (action.type === 'CHANGE_PASSENGERS_CATEGORY') {
    const category = action.payload;

    const newState = [...state.ticketCategories].map(el => {
      el.active = el.categoryName === category ? true : false;
      return el
    });

    return { ...state, ticketCategories: newState }
  }

  return state
}