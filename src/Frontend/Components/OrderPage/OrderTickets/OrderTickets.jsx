import React from 'react';
import { connect } from 'react-redux';
import { sortTickets } from '../../../Redux/actions/actions';

import Tickets from '../Tickets/Tickets';
import Preloader from '../../GeneralBlocks/Preloader/Preloader';
import HoverDropDown from '../../GeneralBlocks/HoverDropDown/HoverDropDown';

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
    const { data, loading, filters } = this.props.ticketsData;
    const filterValue = filters.find(el => el.active).innerText;
    const items = data.items;

    // console.log(data, this.props);

    return (
      <div className="order-tickets">
        {loading
          ? <Preloader />
          : null}

        {data.items &&
          <>
            <div className="order-tickets__inner">
              <p className='order-tickets__text order-tickets__total-count'>найдено {data.total_count}</p>
              {data.items.length > 1 && // фильтры не нужны если билет всего один
                <>
                  <div className="order-tickets__filter">
                    <p className="order-tickets__text order-tickets__filter-text">сортировать по:</p>
                    <HoverDropDown
                      currentValue={filterValue}
                      listItems={filters}
                      selectItem={(event) => this.onFilterBtn(event.target.value)} />
                  </div>

                  <div className="order-tickets__filter">
                    <p className="order-tickets__text order-tickets__filter-text">сортировать по:</p>
                    <div className="order-tickets__filter-inner">
                      {this.state.ticketsToShow.map((filter, index) =>
                        <button key={index}
                          type='button'
                          className={filter.active ? "btn order-tickets__filter-btn order-tickets__btn_active" : "btn order-tickets__filter-btn"}
                          value={filter.value}
                          onClick={() => this.onTicketsToShowBtn(filter.value)}>{filter.value}</button>)}
                    </div>
                  </div>
                </>}
            </div>

            <Tickets data={items} fromConfirmation={false}
              maxTicketsToShow={this.state.ticketsToShow.find(el => el.active).value} />
          </>}
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