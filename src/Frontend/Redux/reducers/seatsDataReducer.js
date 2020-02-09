const initState = {
  data: [],
  loading: false,
  error: null
}

export default function seatsDataReducer(state = initState, action) {
  if (action.type === 'GET_SEATS_DATA') {
    return { ...state, data: [], error: null, loading: true }
  }

  if (action.type === 'SET_SEATS_DATA') {
    const data = action.payload;

    // преобразовываем данные мест в вагоне
    const formatedData = data.map(el => {
      el.seats.forEach(seat => {
        if (el.coach.class_type === 'second' || el.coach.class_type === 'third') {
          if (seat.index <= 32) {
            seat.type = seat.index % 2 === 0 ? 'верхнее' : 'нижнее';
            seat.price = seat.index % 2 === 0 ? el.coach.top_price : el.coach.bottom_price;
          } else {
            seat.type = 'боковое';
            seat.price = el.coach.side_price;
          }
        }

        if (el.coach.class_type === 'first') {
          seat.price = el.coach.price;
        }

        if (el.coach.class_type === 'fourth') {
          seat.price = el.coach.bottom_price;
        }

        seat.selected = false;
      })

      return el
    })

    const classes = [
      {
        class: 'fourth',
        name: 'Сидячий',
        active: false,
        data: formatedData.filter(el => el.coach.class_type === 'fourth')
      },
      {
        class: 'third',
        name: 'Плацкарт',
        active: false,
        data: formatedData.filter(el => el.coach.class_type === 'third')
      },
      {
        class: 'second',
        name: 'Купе',
        active: false,
        data: formatedData.filter(el => el.coach.class_type === 'second')
      },
      {
        class: 'first',
        name: 'Люкс',
        active: false,
        data: formatedData.filter(el => el.coach.class_type === 'first')
      },
    ]

    return { ...state, data: classes, error: null, loading: false }
  }

  return state
}