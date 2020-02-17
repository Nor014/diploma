import React from 'react';
import { connect } from 'react-redux';

import { chooseSeat } from '../../../../../../../Redux/actions/actions';
import { ReactComponent as SecondClassScheme } from '../CoachScheme/coach_scheme_second-class.svg';

class CoachScheme extends React.Component {
  componentDidMount = () => {
    this.setSvgSchemeData()
  }

  componentDidUpdate = () => {
    this.setSvgSchemeData()
  }

  componentWillUpdate = () => {
    let schemeSeats = document.querySelectorAll('.coach-seat');
    schemeSeats.forEach(el => {
      el.classList.remove('available-seat');
      el.classList.remove('selected-seat')
      el.removeEventListener('click', this.selectSeat);
      
    })
  }

  setSvgSchemeData = () => {
    let schemeSeats = document.querySelectorAll('.coach-seat');
    let seatsData = this.props.seatsData.seats;

    seatsData.forEach(seat => {
      // закидываем данные в svg для выбора места
      if (seat.index === Number(schemeSeats[seat.index - 1].dataset.number) && seat.available) {
        schemeSeats[seat.index - 1].dataset.type = seat.type;
        schemeSeats[seat.index - 1].dataset.price = seat.price;

        schemeSeats[seat.index - 1].classList.add('available-seat');

        if (seat.selected) {
          schemeSeats[seat.index - 1].classList.add('selected-seat');
        } else {
          // подсказка при наведении
          schemeSeats[seat.index - 1].addEventListener('mouseenter', (event) => this.showHint(event));
          schemeSeats[seat.index - 1].addEventListener('mouseleave', (event) => this.hideHint(event));
        }

        // выбор места
        schemeSeats[seat.index - 1].addEventListener('click', this.selectSeat);
      }
    })
  }

  selectSeat = (event) => {
    const index = event.currentTarget.dataset.number;
    this.props.chooseSeat(index);
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
    const { seatsData, coachClass } = this.props;

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
    chooseSeat: (seatIndex) => dispatch(chooseSeat(seatIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoachScheme)