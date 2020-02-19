const initState = {
  pathDetails: {},
  ticketCategories: [
    {
      categoryName: 'adult',
      categoryHint: 'взрослый',
      categoryDiscountСoefficient: 1,
      maxAmountOfTickets: 5,
      currentAmountOfTickets: 0,
      active: true,
      ticketsData: []
    },
    {
      categoryName: 'children',
      categoryHint: 'детский',
      categoryDiscountСoefficient: 0.4,
      maxAmountOfTickets: 4,
      currentAmountOfTickets: 0,
      active: false,
      ticketsData: []
    },
  ]
}

export default function orderDetailsReducer(state = initState, action) {
  if (action.type === 'CHANGE_PASSENGERS_CATEGORY') {
    const category = action.payload;

    const newState = [...state.ticketCategories].map(el => {
      el.active = el.categoryName === category ? true : false;
      return el
    });

    return { ...state, ticketCategories: newState }
  }

  if (action.type === 'SET_TICKET_DETAILS') {
    const ticketDetails = action.payload;

    const newState = [...state.ticketCategories].map(category => {
      if (category.categoryName === ticketDetails.ticketCategory) {
        category.ticketsData.push(ticketDetails);
        category.currentAmountOfTickets = category.ticketsData.length;
      }
      return category
    });

    return { ...state, ticketCategories: newState }
  }

  if (action.type === 'REMOVE_TICKET_DETAILS') {
    const { seatIndex, ticketCategory } = action.payload;

    const newState = [...state.ticketCategories].map(category => {
      if (category.categoryName === ticketCategory) {
        category.ticketsData = category.ticketsData.filter(ticketData => ticketData.seatNumber !== seatIndex);
        category.currentAmountOfTickets = category.ticketsData.length;
      }
      return category;
    })

    return { ...state, ticketCategories: newState };
  }

  return state
}