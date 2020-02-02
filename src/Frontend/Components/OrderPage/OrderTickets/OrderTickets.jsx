import React from 'react';
import { connect } from 'react-redux';
import { sortTickets } from '../../../Redux/actions/actions';

import Tickets from '../Tickets/Tickets';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';

class OrderPage extends React.Component {
  constructor() {
    super()
    this.state = {
      ticketsToShow: 5,
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
        },
      ],
    }
  }

  onFilterBtn = (value) => {
    let netState = this.state.filters
      .map(el => {
        el.active = el.value === value ? true : false;
        return el
      })
      .sort((a, b) => b.active - a.active)

    this.setState(prevState => ({ ...prevState, filters: netState }));
    this.props.sortTickets(value);
  }

  onTicketsToShowBtn = (value) => {
    this.setState(prevState => ({ ...prevState, ticketsToShow: value }));
  }

  render() {
    const { data, loading, error } = this.props.ticketsData;
    const filterValue = this.state.filters.find(el => el.active).innerText;
    const items = data.items;
    console.log(data)

    return (
      <div className="order-tickets">

        {loading ? <Preloader /> : null}

        {data.items &&
          <div className="order-tickets__inner">
            <p className='order-tickets__text order-tickets__tital-count'>найдено {data.total_count}</p>
            <div className="order-tickets__filter">
              <p className="order-tickets__text order-tickets__filter-text">сортировать по:</p>
              <div className='psevdo'>
                <p className='order-tickets__filter-current-value'>{filterValue}</p>
                <div className='order-tickets__drop-down'>
                  {this.state.filters.map((el, index) =>
                    <button key={index}
                      type='button'
                      className="btn order-tickets__drop-down-item"
                      value={el.value}
                      onClick={(event) => this.onFilterBtn(event.target.value)}>{el.innerText}
                    </button >)}
                </div>
              </div >
            </div>

            <div className="order-tickets__filter">
              <p className="order-tickets__text order-tickets__filter-text">сортировать по:</p>
              <div className="order-tickets__filter-inner">
                <button type='button' className="btn order-tickets__filter-btn" value='2'
                  onClick={(event) => this.onTicketsToShowBtn(event.target.value)}>2</button>
                <button type='button' className="btn order-tickets__filter-btn" value='4'
                  onClick={(event) => this.onTicketsToShowBtn(event.target.value)}>4</button>
                <button type='button' className="btn order-tickets__filter-btn" value='5'
                  onClick={(event) => this.onTicketsToShowBtn(event.target.value)}>5</button>
              </div>
            </div>
          </div>
        }

        {data.items
          ? <Tickets data={items} maxTicketsToShow={this.state.ticketsToShow} />
          : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { ticketsData } = state;

  return {
    ticketsData: ticketsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortTickets: (filter) => dispatch(sortTickets(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)