const initState = {
  fullPathData: null,
  pathDetails: [
    {
      name: 'departure',
      details: null
    },
    {
      name: 'arrival',
      details: null
    }
  ],
  ticketCategories: [
    {
      categoryName: 'adult',
      categoryHint: 'взрослый',
      categoryDiscountСoefficient: 1,
      maxAmountOfTickets: 5,
      currentDepartureAmountOfTickets: 0,
      currentArrivalAmountOfTickets: 0,
      active: true,
      ticketsData: [
        {
          name: 'departure',
          data: []
        },
        {
          name: 'arrival',
          data: []
        }
      ]
    },
    {
      categoryName: 'children',
      categoryHint: 'детский',
      categoryDiscountСoefficient: 0.4,
      maxAmountOfTickets: 4,
      currentDepartureAmountOfTickets: 0,
      currentArrivalAmountOfTickets: 0,
      active: false,
      ticketsData: [
        {
          name: 'departure',
          data: []
        },
        {
          name: 'arrival',
          data: []
        }
      ]
    },
  ],
  total_cost: 0,
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

  if (action.type === 'SET_PATH_DETAILS') {
    const { details, direction } = action.payload;

    let newState = state.pathDetails.map(el => {
      if (el.name === direction) {
        el.details = details
      }
      return el
    })

    return { ...state, pathDetails: newState }
  }

  if (action.type === 'SET_FULL_PATH_DATA') {
    return { ...state, fullPathData: action.payload };
  }

  if (action.type === 'SET_TICKET_DETAILS') {
    const ticketDetails = action.payload;

    console.log(ticketDetails)

    const newState = [...state.ticketCategories].map(category => {
      if (category.categoryName === ticketDetails.ticketCategory) {
        category.ticketsData.map(direction => {
          if (direction.name === ticketDetails.ticketDirection) {
            direction.data.push(ticketDetails);

            ticketDetails.ticketDirection === 'departure'
              ? category.currentDepartureAmountOfTickets = direction.data.length
              : category.currentArrivalAmountOfTickets = direction.data.length;
          }

          return direction
        })
      }

      return category
    });

    let newTotalCost = state.total_cost;
    newTotalCost += ticketDetails.totalCost;

    return { ...state, ticketCategories: newState, total_cost: newTotalCost }
  }

  if (action.type === 'REMOVE_TICKET_DETAILS') {
    const { seatIndex, ticketCategory, direction } = action.payload;

    const newState = [...state.ticketCategories].map(category => {
      if (category.categoryName === ticketCategory) {
        category.ticketsData.map(ticketDirection => {

          if (ticketDirection.name === direction) {
            ticketDirection.data = ticketDirection.data.filter(ticketData => ticketData.seatNumber !== seatIndex);

            direction === 'departure'
              ? category.currentDepartureAmountOfTickets = ticketDirection.data.length
              : category.currentArrivalAmountOfTickets = ticketDirection.data.length;
          }

          return ticketDirection
        })
      }

      return category;
    })

    return { ...state, ticketCategories: newState };
  }

  if (action.type === 'CLEAR_ORDER_DETAILS_DATA' || action.type === 'RESET_REDUCERS') {
    // по хорошему нужно было юзать например CloneDeep от Lodash, Immer и т.д. и возвращать initState, так как spred оператор копирует только поверхностно
    return {
      fullPathData: null,
      pathDetails: [
        {
          name: 'departure',
          details: null
        },
        {
          name: 'arrival',
          details: null
        }
      ],
      ticketCategories: [
        {
          categoryName: 'adult',
          categoryHint: 'взрослый',
          categoryDiscountСoefficient: 1,
          maxAmountOfTickets: 5,
          currentDepartureAmountOfTickets: 0,
          currentArrivalAmountOfTickets: 0,
          active: true,
          ticketsData: [
            {
              name: 'departure',
              data: []
            },
            {
              name: 'arrival',
              data: []
            }
          ]
        },
        {
          categoryName: 'children',
          categoryHint: 'детский',
          categoryDiscountСoefficient: 0.4,
          maxAmountOfTickets: 4,
          currentDepartureAmountOfTickets: 0,
          currentArrivalAmountOfTickets: 0,
          active: false,
          ticketsData: [
            {
              name: 'departure',
              data: []
            },
            {
              name: 'arrival',
              data: []
            }
          ]
        },
      ],
      total_cost: 0,
    }
  }

  return state
}