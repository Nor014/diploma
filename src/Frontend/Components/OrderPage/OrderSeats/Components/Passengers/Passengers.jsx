import React from 'react';
import { connect } from 'react-redux';
import { changePassengersNumber, changePassengersCategory } from '../../../../../Redux/actions/actions';

class Passengers extends React.Component {

  onInputFocus = (event) => {
    const category = event.target.dataset.category;
    this.props.changePassengersCategory(category)
  }

  render() {
    const { ticketCategories } = this.props.orderDetailsData;
    const activeCategory = ticketCategories.find(category => category.active);
    const adultCategory = ticketCategories.find(category => category.categoryName === 'adult');
    const childrenCategory = ticketCategories.find(category => category.categoryName === 'children');

    console.log(ticketCategories, activeCategory)

    return (
      <div className="passengers">
        <h2 className="passengers__title">Количество билетов</h2>

        <form action="" className="passengers__form">
          <div className={activeCategory.categoryName === 'adult'
            ? 'passengers__form-item form-item_active'
            : 'passengers__form-item'}>

            <input type="text"
              className="passengers__input"
              data-category='adult'
              value={`Взрослых — ${adultCategory.currentAmountOfTickets}`}
              onFocus={this.onInputFocus}
              readOnly />

            <p className="passengers__form-hint">Можно добавить еще {adultCategory.maxAmountOfTickets - adultCategory.currentAmountOfTickets} пассажиров</p>
          </div>

          <div className={activeCategory.categoryName === 'children'
            ? 'passengers__form-item form-item_active'
            : 'passengers__form-item'} >

            <input type="text"
              className="passengers__input input_type_children"
              data-category='children'
              value={`Детских — ${childrenCategory.currentAmountOfTickets}`}
              onFocus={this.onInputFocus}
              readOnly />

            <p className="passengers__form-hint">Можно добавить еще {childrenCategory.maxAmountOfTickets - childrenCategory.currentAmountOfTickets} детей до 10 лет.Свое место в вагоне, как  взрослых, но дешевле   в среднем на 50-65%  </p>
          </div>

          <div className="passengers__form-item form-item_disabled">
            <input type="text"
              className="passengers__input"
              data-category='withoutTicket'
              value={`Детских "без места" - 0`}
              disabled />
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
    changePassengersNumber: (number, category) => dispatch(changePassengersNumber(number, category)),
    changePassengersCategory: (category) => dispatch(changePassengersCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Passengers)