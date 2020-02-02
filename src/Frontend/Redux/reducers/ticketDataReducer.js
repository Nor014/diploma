import moment from 'moment';

const initState = {
  data: [],
  loading: false,
  error: null
}

export default function ticketDataReducer(state = initState, action) {

  if (action.type === 'FIND_TICKETS') {
    return { ...state, loading: true, data: [] };
  }

  if (action.type === 'SET_TICKETS_DATA') {
    const data = action.payload;
    const sortedData = sortData(data, 'time');

    return { ...state, data: sortedData, loading: false };
  }

  if (action.type === 'SORT_TICKETS') {
    const filter = action.payload;
    const data = state.data;
    const sortedData = sortData(data, filter);

    return { ...state, data: sortedData, loading: false };
  }

  function sortData(data, filter) {
    let result = [].concat(data.items).sort((a, b) => {
      if (filter === 'time') {
        let value = Number(moment(a.departure.from.datetime * 1000).format("HH")) - Number(moment(b.departure.from.datetime * 1000).format("HH"));

        if (value !== 0) {
          return value;
        } else {
          return Number(moment(a.departure.from.datetime * 1000).format("mm")) - Number(moment(b.departure.from.datetime * 1000).format("mm"));
        }
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

  return state;
}