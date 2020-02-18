import React from 'react';
import { connect } from 'react-redux';

import { chooseSeat } from '../../../../../../../Redux/actions/actions';
import { ReactComponent as SecondClassScheme } from '../CoachScheme/coach_scheme_second-class.svg';

class CoachScheme extends React.Component {
  componentDidMount = () => {
    this.setSvgSchemeData(true)
  }

  componentDidUpdate = () => {
    this.setSvgSchemeData()
  }

  componentWillUpdate = () => {
    // очищаем svg 
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

    // присваеваем каждому месту показатель selected
    if (firstInit) {
      schemeSeats.forEach(seat => seat.dataset.selected = false);
    }

    seatsData.forEach(seat => {
      // закидываем данные в svg для выбора места
      if (seat.index === Number(schemeSeats[seat.index - 1].dataset.number) && seat.available) {
        const currentTicketCategory = this.props.orderDetailsData.ticketCategories
          .find(category => category.active).categoryName;

        if (seat.available[currentTicketCategory]) {
          schemeSeats[seat.index - 1].dataset.type = seat.type;
          schemeSeats[seat.index - 1].dataset.price = seat.price;

          schemeSeats[seat.index - 1].classList.add('available-seat');

          if (seat.selected.adult) {
            schemeSeats[seat.index - 1].classList.add('selected-seat_by_adult');
            schemeSeats[seat.index - 1].dataset.selected = true;
          }

          if (seat.selected.children) {
            schemeSeats[seat.index - 1].classList.add('selected-seat_by_children')
            schemeSeats[seat.index - 1].dataset.selected = true;
          };

          // подсказка при наведении
          schemeSeats[seat.index - 1].addEventListener('mouseenter', (event) => this.showHint(event));
          schemeSeats[seat.index - 1].addEventListener('mouseleave', (event) => this.hideHint(event));
          // выбор места
          schemeSeats[seat.index - 1].addEventListener('click', this.selectSeat);
        } else {
          schemeSeats[seat.index - 1].classList.add('disabled-seat')
        }
      }
    })
  }

  selectSeat = (event) => {
    const seat = event.currentTarget;
    const index = seat.dataset.number;
    const ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active).categoryName;
    const selectedSeat = seat.dataset.selected;

    if (selectedSeat === false) {
      // dispatch всех данных о билете
      const ticketPrice = ticketCategory === 'children' ? Math.floor(seat.dataset.price * 0.4) : Number(seat.dataset.price)
      let totalCost = ticketPrice;

      this.props.selectedServises.forEach(service => {
        totalCost += service.price;
      })

      const ticketDetails = {
        ticketCategory: ticketCategory,
        coachClass: this.props.coachClassName,
        wagonName: this.props.wagonName,
        seatNumber: seat.dataset.number,
        seatType: seat.dataset.type,
        ticketPrice: ticketPrice,
        services: this.props.selectedServises,
        totalCost: totalCost,
      }

      console.log(ticketDetails, 1111)
    } else {
      // убираем ранее выбранное место из reducer
      console.log(1111)
    }

    console.log(selectedSeat);

    //меняем стейт-данные 
    this.props.chooseSeat(index, ticketCategory);

  }

  showHint = (event) => {
    const type = event.target.dataset.type;
    const price = event.target.dataset.price;
    const ticketCategory = this.props.orderDetailsData.ticketCategories.find(category => category.active).categoryHint;
    const hint = document.querySelector('.coach-scheme__hint');

    hint.innerHTML = `место - ${type} <br> категория - ${ticketCategory} <br> цена - ${price}₽`;
    hint.style.left = event.pageX + 'px';
    hint.style.top = event.pageY + 25 + 'px';
    hint.style.display = 'block';
  }

  hideHint = () => {
    const hint = document.querySelector('.coach-scheme__hint');
    hint.style.display = 'none';
  }

  render() {
    const { coachClass } = this.props;

    return (
      <div className='coach-scheme'>
        <div className="coach-scheme__hint"></div>

        {coachClass === 'second'
          ? <SecondClassScheme className='coach-scheme__svg' />
          : null
        }
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
    chooseSeat: (seatIndex, ticketCategory) => dispatch(chooseSeat(seatIndex, ticketCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoachScheme)