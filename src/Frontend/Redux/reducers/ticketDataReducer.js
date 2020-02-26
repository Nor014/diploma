import moment from 'moment';

const initState = {
  data: [],
  loading: false,
  error: null,
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
    const data = action.payload;
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
    })

    return { ...state, data: sortedData, loading: false };
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
    })

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