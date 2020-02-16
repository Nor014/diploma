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

    const formatedData = data.map(el => {
      // преобразовываем данные мест для работы со схемой вагона
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

      // данные для рендера информации по местам
      let info = [];

      if (el.coach.class_type === 'second' || el.coach.class_type === 'third') {
        info.push(
          {
            name: 'Верхнее',
            amount: el.seats.filter(el => el.type === 'верхнее').length,
            cost: el.coach.top_price
          },
          {
            name: 'Нижнее',
            amount: el.seats.filter(el => el.type === 'нижнее').length,
            cost: el.coach.bottom_price
          })
      }

      if (el.coach.class_type === 'third') {
        info.push({
          name: 'Боковое',
          amount: el.seats.filter(el => el.type === 'боковое').length,
          cost: el.coach.side_price
        })
      }

      if (el.coach.class_type === 'fourth') {
        info.push({
          name: 'Сидячее',
          amount: el.seats.length,
          cost: el.coach.top_price
        })
      }

      if (el.coach.class_type === 'first') {
        info.push({
          name: 'Люкс',
          amount: el.seats.length,
          cost: el.coach.price
        })
      }

      // данные об услугах
      const services = [
        {
          name: 'air-conditioning',
          hint: 'кондиционер',
          available: el.coach.have_air_conditioning,
          price: 0,
          inTicketCost: true,
          checked: false
        },
        {
          name: 'wifi',
          hint: 'wi-fi',
          available: el.coach.have_wifi,
          price: el.coach.wifi_price,
          inTicketCost: false,
          checked: false
        },
        {
          name: 'linens',
          hint: 'белье',
          available: el.coach.class_type !== 'fourth' ? true : false,
          price: el.coach.linens_price,
          inTicketCost: el.coach.is_linens_included,
          checked: false
        },
        {
          name: 'eating',
          hint: 'питание',
          available: true,
          price: 0,
          inTicketCost: true,
          checked: false
        }
      ]

      el.seatsInfo = info;
      el.servicesInfo = services;

      return el
    })

    // функция разбивки данных по классам вагонов
    function filterDataByClass(coachClass) {
      return formatedData
        .filter(el => el.coach.class_type === coachClass)
        .map((el, index) => {
          // добавляем флаг для определения активного вагона
          el.coach.active = index === 0 ? true : false;
          return el
        })
    }

    const classes = [
      {
        class: 'fourth',
        name: 'Сидячий',
        icon: 'fourth-coach-class',
        active: false,
        data: filterDataByClass('fourth')
      },
      {
        class: 'third',
        name: 'Плацкарт',
        icon: 'third-coach-class',
        active: false,
        data: filterDataByClass('third')
      },
      {
        class: 'second',
        name: 'Купе',
        icon: 'second-coach-class',
        active: false,
        data: filterDataByClass('second')
      },
      {
        class: 'first',
        name: 'Люкс',
        icon: 'first-coach-class',
        active: false,
        data: filterDataByClass('first')
      },
    ]

    return { ...state, data: classes, error: null, loading: false }
  }

  if (action.type === 'CHANGE_COACH_CLASS') {
    const coachClass = action.payload;

    const newData = state.data.map(el => {
      el.active = el.class === coachClass ? !el.active : false;
      return el
    })

    return { ...state, data: newData }
  }

  if (action.type === 'CHANGE_COACH_WAGONE') {
    const coachId = action.payload;

    const newData = state.data.map(coachClass => {
      if (coachClass.active) {
        coachClass.data.map(el => {
          el.coach.active = el.coach._id === coachId ? true : false
          return el
        })
      }

      return coachClass
    })

    return { ...state, data: newData }
  }


  if (action.type === 'CHOOSE_SEAT') {
    const seatIndex = action.payload;

    const newData = state.data.map(coachClass => {
      if (coachClass.active) {
        coachClass.data.map(wagon => {
          if (wagon.coach.active) {
            let seat = wagon.seats.find(el => el.index === Number(seatIndex));
            seat.selected = !seat.selected
          }

          return wagon
        })
      }

      return coachClass
    })

    console.log(newData)
    return { ...state, data: newData }
  }

  if (action.type === 'CHECK_SERVICE') {
    const serviceToCheck = action.payload;

    const newData = state.data.map(coachClass => {
      if (coachClass.active) {
        coachClass.data.map(wagon => {
          if (wagon.coach.active) {
            let service = wagon.servicesInfo.find(service => service.name === serviceToCheck);
            service.checked = !service.checked;
          }

          return wagon
        })
      }

      return coachClass
    })

    return { ...state, data: newData }
  }

  return state
}