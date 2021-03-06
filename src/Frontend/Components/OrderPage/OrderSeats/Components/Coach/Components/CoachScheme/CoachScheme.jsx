import React from 'react';
import { connect } from 'react-redux';

import { chooseSeat, setTicketDetails, removeTicketDetails } from '../../../../../../../Redux/actions/actions';

import { ReactComponent as FirstClassScheme } from '../CoachScheme/coach_scheme_first-class.svg';
import { ReactComponent as SecondClassScheme } from '../CoachScheme/coach_scheme_second-class.svg';
import { ReactComponent as ThirdClassScheme } from '../CoachScheme/coach_scheme_third-class.svg';
import { ReactComponent as FourthClassScheme } from '../CoachScheme/coach_scheme_fourth-class.svg';

class CoachScheme extends React.Component {
  constructor(props) {
    super(props)
    this.coachSchemeRef = React.createRef();
  }

  componentDidMount = () => {
    this.setSvgSchemeData(true)
  }

  componentDidUpdate = () => {
    this.refreshSvgSchemeData();
    this.setSvgSchemeData()
  }

  refreshSvgSchemeData = () => { // очищаем svg-схему вагона 
    let schemeSeats = this.coachSchemeRef.current.querySelectorAll('.coach-seat');
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
    let schemeSeats = this.coachSchemeRef.current.querySelectorAll('.coach-seat');
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
      ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active),
      direction = this.props.direction,
      currentAmountOfTickets = direction === 'departure'
        ? ticketCategory.currentDepartureAmountOfTickets
        : ticketCategory.currentArrivalAmountOfTickets

    const maxAmountOfTickets = direction === 'departure' // если направление arrival, максимальное количество билетов - текущее значение билетов для departure 
      ? ticketCategory.maxAmountOfTickets
      : ticketCategory.currentDepartureAmountOfTickets

    if (selectedSeat === 'false' && currentAmountOfTickets < maxAmountOfTickets) {
      this.props.chooseSeat(index, ticketCategory.categoryName, direction); // выбираем место 

      // формируем информацию о билете
      const ticketPrice = Math.floor(seat.dataset.price * ticketCategory.categoryDiscountСoefficient);
      let totalCost = ticketPrice;
      this.props.selectedServises.forEach(service => totalCost += service.price);

      const ticketDetails = {
        coachId: this.props.coachId,
        ticketCategory: ticketCategory.categoryName,
        ticketDirection: direction,
        coachClass: this.props.coachClassName,
        wagonName: this.props.wagonName,
        seatNumber: seat.dataset.number,
        seatType: seat.dataset.type,
        ticketPrice: ticketPrice,
        services: this.props.selectedServises,
        totalCost: totalCost,
      }

      console.log(this.props)

      this.props.setTicketDetails(ticketDetails); // dispatch всех данных о билете

    } else if (selectedSeat === 'true') {
      this.props.chooseSeat(index, ticketCategory.categoryName, direction); // убираем выбор с места
      this.props.removeTicketDetails(index, ticketCategory.categoryName, direction); // убираем ранее выбранное место из reducer
    }
  }

  showHint = (event) => {
    const type = event.target.dataset.type;
    const ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active);
    const price = Math.floor(event.target.dataset.price * ticketCategory.categoryDiscountСoefficient);

    const hint = this.coachSchemeRef.current.querySelector('.coach-scheme__hint');
    hint.innerHTML = `Место - ${type} <br> Категория - ${ticketCategory.categoryHint} <br> Цена - ${price} ₽`;

    hint.style.left = event.offsetX + 20 + 'px';
    hint.style.top = event.offsetY + 25 + 'px';
    hint.style.display = 'block';
  }

  hideHint = () => {
    const hint = this.coachSchemeRef.current.querySelector('.coach-scheme__hint');
    hint.style.display = 'none';
  }

  render() {
    const { coachClass, orderDetailsData, direction } = this.props;
    let totalCost = 0;

    orderDetailsData.ticketCategories.forEach(category => {
      category.ticketsData.forEach(ticketDirection => {
        if (ticketDirection.name === direction) {
          ticketDirection.data.forEach(ticket => totalCost += ticket.totalCost)
        }
      })
    })

    console.log(orderDetailsData)

    return (
      <div className='coach-scheme' ref={this.coachSchemeRef}>
        <div className="coach-scheme__wrap">
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

          <div className="coach-scheme__hint"></div>
        </div>

        <p className="coach-scheme__total-cost price price_with_ruble-icon">{totalCost}</p>
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
    chooseSeat: (seatIndex, ticketCategory, direction) => dispatch(chooseSeat(seatIndex, ticketCategory, direction)),
    setTicketDetails: (ticketDetails) => dispatch(setTicketDetails(ticketDetails)),
    removeTicketDetails: (seatIndex, ticketCategory, direction) => dispatch(removeTicketDetails(seatIndex, ticketCategory, direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoachScheme)