import React from 'react';
import { connect } from 'react-redux';

import { chooseSeat, setTicketDetails, removeTicketDetails } from '../../../../../../../Redux/actions/actions';
import { ReactComponent as SecondClassScheme } from '../CoachScheme/coach_scheme_second-class.svg';

class CoachScheme extends React.Component {
  componentDidMount = () => {
    this.setSvgSchemeData(true)
  }

  componentDidUpdate = () => {
    this.setSvgSchemeData()
  }

  componentWillUpdate = () => {
    // очищаем svg-схему вагона 
    let schemeSeats = document.querySelectorAll('.coach-seat');
    schemeSeats.forEach(el => {
      el.classList.remove('available-seat');
      el.classList.remove('selected-seat_by_adult');
      el.classList.remove('selected-seat_by_children');
      el.classList.remove('disabled-seat');
      el.dataset.selected = false;

      el.removeEventListener('click', this.selectSeat);
    })
  }

  setSvgSchemeData = (firstInit = false) => {
    let schemeSeats = document.querySelectorAll('.coach-seat');
    let seatsData = this.props.seatsData;

    if (firstInit) { // присваеваем каждому месту показатель selected при первой инициализации
      schemeSeats.forEach(seat => seat.dataset.selected = false);
    }

    seatsData.forEach(seat => {
      const index = seat.index - 1;
      // закидываем данные в svg для выбора места
      if (seat.index === Number(schemeSeats[index].dataset.number) && seat.available) {
        const currentTicketCategory = this.props.orderDetailsData.ticketCategories
          .find(category => category.active).categoryName;

        if (seat.available[currentTicketCategory]) {
          schemeSeats[index].dataset.type = seat.type;
          schemeSeats[index].dataset.price = seat.price;

          schemeSeats[index].classList.add('available-seat');

          if (seat.selected.adult) {
            schemeSeats[index].classList.add('selected-seat_by_adult');
            schemeSeats[index].dataset.selected = true;
          }

          if (seat.selected.children) {
            schemeSeats[index].classList.add('selected-seat_by_children')
            schemeSeats[index].dataset.selected = true;
          };

          // подсказка при наведении
          schemeSeats[index].addEventListener('mouseenter', (event) => this.showHint(event));
          schemeSeats[index].addEventListener('mouseleave', (event) => this.hideHint(event));
          // выбор места
          schemeSeats[index].addEventListener('click', this.selectSeat);
        } else {
          schemeSeats[index].classList.add('disabled-seat')
        }
      }
    })
  }

  selectSeat = (event) => {
    const seat = event.currentTarget,
      index = seat.dataset.number,
      ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active),
      selectedSeat = seat.dataset.selected;

    if (selectedSeat === 'false' && ticketCategory.currentAmountOfTickets < ticketCategory.maxAmountOfTickets) {
      //меняем стейт-данные 
      this.props.chooseSeat(index, ticketCategory.categoryName);

      // dispatch всех данных о билете
      const ticketPrice = Math.floor(seat.dataset.price * ticketCategory.categoryDiscountСoefficient);
      let totalCost = ticketPrice;

      this.props.selectedServises.forEach(service => totalCost += service.price);

      const ticketDetails = {
        ticketCategory: ticketCategory.categoryName,
        coachClass: this.props.coachClassName,
        wagonName: this.props.wagonName,
        seatNumber: seat.dataset.number,
        seatType: seat.dataset.type,
        ticketPrice: ticketPrice,
        services: this.props.selectedServises,
        totalCost: totalCost,
      }

      this.props.setTicketDetails(ticketDetails);
    } else if (selectedSeat === 'true') {
      //меняем стейт-данные 
      this.props.chooseSeat(index, ticketCategory.categoryName);
      // убираем ранее выбранное место из reducer
      this.props.removeTicketDetails(index, ticketCategory.categoryName);
    }
  }

  showHint = (event) => {
    const type = event.target.dataset.type;
    const ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active);
    const price = Math.floor(event.target.dataset.price * ticketCategory.categoryDiscountСoefficient);
    const hint = document.querySelector('.coach-scheme__hint');

    hint.innerHTML = `место - ${type} <br> категория - ${ticketCategory.categoryHint} <br> цена - ${price} ₽`;
    hint.style.left = event.pageX + 'px';
    hint.style.top = event.pageY + 25 + 'px';
    hint.style.display = 'block';
  }

  hideHint = () => {
    const hint = document.querySelector('.coach-scheme__hint');
    hint.style.display = 'none';
  }

  render() {
    const { coachClass, orderDetailsData } = this.props;
    let totalCost = 0;

    orderDetailsData.ticketCategories.forEach(category => {
      category.ticketsData.forEach(ticket => totalCost += ticket.totalCost);
    })

    console.log(orderDetailsData)

    return (
      <div className='coach-scheme'>
        <div className="coach-scheme__hint"></div>

        {coachClass === 'second'
          ? <SecondClassScheme className='coach-scheme__svg' />
          : null
        }

        <p className="coach-scheme__total-cost">{totalCost} <span className='coach__seats-ruble'>₽</span></p>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  const { orderDetailsData } = state;
  return {
    orderDetailsData: orderDetailsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseSeat: (seatIndex, ticketCategory) => dispatch(chooseSeat(seatIndex, ticketCategory)),
    setTicketDetails: (ticketDetails) => dispatch(setTicketDetails(ticketDetails)),
    removeTicketDetails: (seatIndex, ticketCategory) => dispatch(removeTicketDetails(seatIndex, ticketCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoachScheme)