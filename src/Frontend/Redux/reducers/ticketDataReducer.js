import moment from 'moment';

const initState = {
  data: [],
  loading: false,
  redirectFromMainPage: false,
  filters: [
    {
      value: 'time',
      innerText: 'времени',
      active: true
    },
    {
      value: 'cost',
      innerText: 'стоимости',
      active: false
    },
    {
      value: 'duration',
      innerText: 'длительности',
      active: false
    }
  ]
}

export default function ticketDataReducer(state = initState, action) {

  if (action.type === 'FIND_TICKETS') {
    return { ...state, loading: true, data: [] };
  }

  if (action.type === 'SET_TICKETS_DATA') {
    const { data, redirectFromMain } = action.payload;

    console.log(data, redirectFromMain)

    const currentFilter = state.filters.find(el => el.active).value;
    const sortedData = sortData(data, currentFilter);

    sortedData.items.forEach(ticket => { // преобразуем данные для рендера
      // заглавная буква городов
      ticket.departure.from.city.name = firstLetterToUppercase(ticket.departure.from.city.name);
      ticket.departure.to.city.name = firstLetterToUppercase(ticket.departure.to.city.name);

      // секунды в время
      ticket.departure.from.datetimeToRender = secondsToTime(ticket.departure.from.datetime);
      ticket.departure.to.datetimeToRender = secondsToTime(ticket.departure.to.datetime);

      ticket.departure.from.fullDateToRender = moment(ticket.departure.from.datetime * 1000).format('DD.MM.YYYY');
      ticket.departure.to.fullDateToRender = moment(ticket.departure.to.datetime * 1000).format('DD.MM.YYYY');

      // длительность поездки в часы
      ticket.departure.durationToRender = secondsToDuration(ticket.departure.duration);

      if (ticket.arrival !== undefined) { // те же операции если есть поезд назад
        ticket.arrival.from.city.name = firstLetterToUppercase(ticket.arrival.from.city.name);
        ticket.arrival.to.city.name = firstLetterToUppercase(ticket.arrival.to.city.name);
        ticket.arrival.from.datetimeToRender = secondsToTime(ticket.arrival.from.datetime);
        ticket.arrival.to.datetimeToRender = secondsToTime(ticket.arrival.to.datetime);
        ticket.arrival.from.fullDateToRender = moment(ticket.arrival.from.datetime * 1000).format('DD.MM.YYYY');
        ticket.arrival.to.fullDateToRender = moment(ticket.arrival.to.datetime * 1000).format('DD.MM.YYYY');
        ticket.arrival.durationToRender = secondsToDuration(ticket.departure.duration)
      }

      let classes = []; // преобразуем данные для рендера в цикле

      if (ticket.departure.have_first_class) {
        classes.push({
          className: 'Люкс',
          seatsAmount: ticket.departure.available_seats_info.first,
          seatsPrice: ticket.departure.price_info.first.price,
          seatsDetails: [
            {
              seatsType: 'Люкс',
              seatsPrice: ticket.departure.price_info.first.price
            }
          ]
        })
      }

      if (ticket.departure.have_second_class) {
        classes.push({
          className: 'Купе',
          seatsAmount: ticket.departure.available_seats_info.second,
          seatsPrice: ticket.departure.price_info.second.top_price,
          seatsDetails: [
            {
              seatsType: 'Верхние',
              seatsPrice: ticket.departure.price_info.second.top_price
            },
            {
              seatsType: 'Нижние',
              seatsPrice: ticket.departure.price_info.second.bottom_price
            }
          ]
        })
      }

      if (ticket.departure.have_third_class) {
        classes.push({
          className: 'Плацкарт',
          seatsAmount: ticket.departure.available_seats_info.third,
          seatsPrice: ticket.departure.price_info.third.top_price,
          seatsDetails: [
            {
              seatsType: 'Верхние',
              seatsPrice: ticket.departure.price_info.third.top_price
            },
            {
              seatsType: 'Нижние',
              seatsPrice: ticket.departure.price_info.third.bottom_price
            },
            {
              seatsType: 'Боковые',
              seatsPrice: ticket.departure.price_info.third.side_price
            }
          ]
        })
      }

      if (ticket.departure.have_fourth_class) {
        classes.push({
          className: 'Сидячие',
          seatsAmount: ticket.departure.available_seats_info.fourth,
          seatsPrice: ticket.departure.price_info.fourth.bottom_price,
          seatsDetails: [
            {
              seatsType: 'Сидячее',
              seatsPrice: ticket.departure.price_info.fourth.bottom_price
            },
          ]
        })
      }

      ticket.departure.classes = classes
    })

    return { ...state, data: sortedData, loading: false, redirectFromMainPage: redirectFromMain };
  }

  if (action.type === 'SORT_TICKETS') {
    const filter = action.payload;
    const data = state.data;
    const sortedData = sortData(data, filter);

    const newFiltersState = state.filters
      .map(el => {
        el.active = el.value === filter ? true : false;
        return el
      })
      .sort((a, b) => b.active - a.active)

    return { ...state, data: sortedData, filters: newFiltersState, loading: false };
  }

  if (action.type === 'RESET_REDIRECT_FROM_MAIN') {
    return { ...state, redirectFromMainPage: false }
  }

  function sortData(data, filter) {
    let result = [].concat(data.items).sort((a, b) => {
      if (filter === 'time') {
        return a.departure.from.datetime - b.departure.from.datetime;
      }

      if (filter === 'cost') {
        return a.departure.min_price - b.departure.min_price;
      }

      if (filter === 'duration') {
        return a.departure.duration - b.departure.duration;
      }

      return 0
    })

    console.log(result)

    return { ...data, items: result };
  }

  function secondsToTime(seconds) {
    return moment(seconds * 1000).format("HH:mm")
  }

  function secondsToDuration(seconds) {
    const totalDuration = seconds / 60 / 60;
    const hours = Math.floor(totalDuration);
    const minutes = ((totalDuration - hours) * 60).toFixed(0);

    return `${hours} : ${minutes}`;
  }

  function firstLetterToUppercase(value) {
    return value[0].toUpperCase() + value.slice(1);
  }


  return state;
}