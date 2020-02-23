import React from 'react';
import { connect } from 'react-redux';

import { chooseSeat, setTicketDetails, removeTicketDetails } from '../../../../../../../Redux/actions/actions';

import { ReactComponent as FirstClassScheme } from '../CoachScheme/coach_scheme_first-class.svg';
import { ReactComponent as SecondClassScheme } from '../CoachScheme/coach_scheme_second-class.svg';
import { ReactComponent as ThirdClassScheme } from '../CoachScheme/coach_scheme_third-class.svg';
import { ReactComponent as FourthClassScheme } from '../CoachScheme/coach_scheme_fourth-class.svg';

class CoachScheme extends React.Component {
  componentDidMount = () => {
    this.setSvgSchemeData(true)
  }

  componentDidUpdate = () => {
    this.refreshSvgSchemeData();
    this.setSvgSchemeData()
  }

  refreshSvgSchemeData = () => { // очищаем svg-схему вагона 
    let schemeSeats = document.querySelectorAll('.coach-seat');
    schemeSeats.forEach(el => {
      el.classList.remove('available-seat');
      el.classList.remove('selected-seat_by_adult');
      el.classList.remove('selected-seat_by_children');
      el.classList.remove('disabled-seat');
      el.dataset.selected = false;

      el.removeEventListener('click', this.selectSeat);
      el.removeEventListener('mouseenter', this.showHint);
      el.removeEventListener('mouseleave', this.hideHint);
    })
  }

  setSvgSchemeData = (firstInit = false) => {
    let schemeSeats = document.querySelectorAll('.coach-seat');
    let seatsData = this.props.seatsData;

    if (firstInit) { // присваеваем каждому месту дата-атрибут selected при первой инициализации
      schemeSeats.forEach(seat => seat.dataset.selected = false);
    }

    // сортируем svg-места в возрастающем порядке
    schemeSeats = Array.from(schemeSeats).sort((a, b) => a.dataset.number - b.dataset.number);

    seatsData.forEach(seat => { // закидываем все необходимые данные в svg для выбора места
      const index = seat.index - 1;
      if (seat.index === Number(schemeSeats[index].dataset.number) && seat.available) {
        const currentTicketCategory =
          this.props.orderDetailsData.ticketCategories.find(category => category.active).categoryName;

        if (seat.available[currentTicketCategory]) { // место доступно для данной категории
          schemeSeats[index].dataset.type = seat.type;
          schemeSeats[index].dataset.price = seat.price;
          schemeSeats[index].classList.add('available-seat');

          if (seat.selected[currentTicketCategory]) { // если место выбранно, задаем класс для идентификации и дата атрибут
            schemeSeats[index].classList.add(`selected-seat_by_${currentTicketCategory}`);
            schemeSeats[index].dataset.selected = true;
          }
          // подсказка при наведении
          schemeSeats[index].addEventListener('mouseenter', this.showHint);
          schemeSeats[index].addEventListener('mouseleave', this.hideHint);
          // выбор места
          schemeSeats[index].addEventListener('click', this.selectSeat);
        } else {
          schemeSeats[index].classList.add('disabled-seat') // если место не доступно для данной категории - дизейблим его
        }
      }
    })
  }

  selectSeat = (event) => {
    const seat = event.currentTarget,
      index = seat.dataset.number,
      selectedSeat = seat.dataset.selected,
      ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active);

    if (selectedSeat === 'false' && ticketCategory.currentAmountOfTickets < ticketCategory.maxAmountOfTickets) {
      this.props.chooseSeat(index, ticketCategory.categoryName); // выбираем место 

      // формируем информацию о билете
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

      this.props.setTicketDetails(ticketDetails); // dispatch всех данных о билете

    } else if (selectedSeat === 'true') {
      this.props.chooseSeat(index, ticketCategory.categoryName); // убираем выбор с места
      this.props.removeTicketDetails(index, ticketCategory.categoryName); // убираем ранее выбранное место из reducer
    }
  }

  showHint = (event) => {
    const type = event.target.dataset.type;
    const ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active);
    const price = Math.floor(event.target.dataset.price * ticketCategory.categoryDiscountСoefficient);

    const hint = document.querySelector('.coach-scheme__hint');
    hint.innerHTML = `Место - ${type} <br> Категория - ${ticketCategory.categoryHint} <br> Цена - ${price} ₽`;

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

        {coachClass === 'first'
          ? <FirstClassScheme className='coach-scheme__svg' />
          : null}

        {coachClass === 'second'
          ? <SecondClassScheme className='coach-scheme__svg' />
          : null}

        {coachClass === 'third'
          ? <ThirdClassScheme className='coach-scheme__svg' />
          : null}

        {coachClass === 'fourth'
          ? <FourthClassScheme className='coach-scheme__svg' />
          : null}
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