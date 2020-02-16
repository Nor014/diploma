import React from 'react';
import { connect } from 'react-redux';

class Passengers extends React.Component {
  constructor(props) {
    super(props)

    this.adultRef = React.createRef();
    this.childrenRef = React.createRef();
    this.withoutTicketsRef = React.createRef();
  }

  onInputFocus = (ref) => {
    ref.current.classList.add('form-item_active');
  }

  onInputBlur = (ref) => {
    ref.current.classList.remove('form-item_active');
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    
  }

  render() {
    const { passengersAmount } = this.props.orderDetailsData;
    console.log(passengersAmount)

    return (
      <div className="passengers">
        <h2 className="passengers__title">Количество билетов</h2>

        <form action="" className="passengers__form">
          <div className="passengers__form-item" ref={this.adultRef}>
            <input type="text"
              className="passengers__input input_type_adult"
              value={`Взрослых — ${passengersAmount.adult.value}`}
              onFocus={() => this.onInputFocus(this.adultRef)}
              onBlur={() => this.onInputBlur(this.adultRef)}
              onChange={this.onInputChange} />

            <p className="passengers__form-hint">Можно добавить еще {passengersAmount.adult.maxValue - passengersAmount.adult.value} пассажиров</p>
          </div>

          <div className="passengers__form-item" ref={this.childrenRef}>
            <input type="text"
              className="passengers__input input_type_children"
              value={`Детских — ${passengersAmount.children.value}`}
              onFocus={() => this.onInputFocus(this.childrenRef)}
              onBlur={() => this.onInputBlur(this.childrenRef)}
              onChange={this.onInputChange} />

            <p className="passengers__form-hint">Можно добавить еще {passengersAmount.children.maxValue - passengersAmount.children.value} пассажиров</p>
          </div>

          <div className="passengers__form-item" ref={this.withoutTicketsRef}>
            <input type="text"
              className="passengers__input input_type_adult"
              value={`Детских "без места" — ${passengersAmount.withoutTicket}`}
              onFocus={() => this.onInputFocus(this.withoutTicketsRef)}
              onBlur={() => this.onInputBlur(this.withoutTicketsRef)} />
          </div>
        </form>
      </div>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Passengers)