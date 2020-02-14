import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { sortTickets } from '../../../Redux/actions/actions';

import Tickets from '../Tickets/Tickets';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';

class OrderTickets extends React.Component {
  constructor() {
    super()
    this.state = {
      ticketsToShow: [
        {
          value: 5,
          active: true
        },
        {
          value: 4,
          active: false
        },
        {
          value: 2,
          active: false
        },
      ],
    }
  }

  onFilterBtn = (value) => {
    this.props.sortTickets(value);
  }

  onTicketsToShowBtn = (value) => {
    const newState = this.state.ticketsToShow.map(el => {
      el.active = el.value === value ? true : false;
      return el
    })

    this.setState(prevState => ({ ...prevState, ticketsToShow: newState }));
  }

  render() {
    const { data, loading, error, filters } = this.props.ticketsData;
    const filterValue = filters.find(el => el.active).innerText;
    const items = data.items;
    console.log(data);

    return (
      <div className="order-tickets">
        {loading ? <Preloader /> : null}

        {data.items &&
          <div className="order-tickets__inner">
            <p className='order-tickets__text order-tickets__total-count'>найдено {data.total_count}</p>

            <div className="order-tickets__filter">
              <p className="order-tickets__text order-tickets__filter-text">сортировать по:</p>
              <div className='psevdo'>
                <p className='order-tickets__filter-current-value'>{filterValue}</p>
                <div className='order-tickets__drop-down'>
                  {filters.map((el, index) =>
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
                {this.state.ticketsToShow.map((el, index) =>
                  <button key={index} type='button'
                    className={el.active ? "btn order-tickets__filter-btn order-tickets__btn_active" : "btn order-tickets__filter-btn"}
                    value={el.value} onClick={() => this.onTicketsToShowBtn(el.value)}>{el.value}</button>
                )}
              </div>
            </div>
          </div>
        }

        {data.items
          ? <Tickets data={items} maxTicketsToShow={this.state.ticketsToShow.find(el => el.active).value} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderTickets)