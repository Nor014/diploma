import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { resetReducers } from '../../Redux/actions/actions';

import Rating from './Components/Rating/Rating';

class FinalPage extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.location.state !== undefined) {
      this.props.resetReducers(); // так как заказ билетов успешно осуществлен, очищаем все данные


      this.ref.current.scrollIntoView({ // scroll to top
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  render() {

    if (this.props.location.state === undefined) { // если данные не были переданны со страницы подтвержения, значит заказ не был оформлен
      return <Redirect to='order/confirmation' />
    }

    const { name, price } = this.props.location.state;

    return (
      <div className="final-page" ref={this.ref}>
        <div className="final-page__body">
          <div className="final-page__inner container">
            <h2 className='final-page__title'>Благодарим Вас за заказ!</h2>

            <div className="final-page__content">
              <div className="final-page__header">
                <p className="final-page__order-number">№Заказа 285АА</p>
                <p className="final-page__order-price">сумма <span className='final-page__order-span price price_with_ruble-icon'>{price}</span></p>
              </div>

              <div className="final-page__instructions">
                <p className="final-page__instructions-item final-page__icon_type_email">билеты будут отправлены на ваш <b>e-mail</b></p>
                <p className="final-page__instructions-item final-page__icon_type_tickets"><b>распечатайте</b> и сохраняйте билеты до даты поездки</p>
                <p className="final-page__instructions-item final-page__icon_type_check"><b>предьявите</b> распечатанные билеты при посадке</p>
              </div>

              <div className='final-page__message'>
                <p className='final-page__message-name'>{name}!</p>
                <p className="final-page__message-text">Ваш заказ успешно оформлен. <br />В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                <p className="final-page__message-thanks">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
              </div>

              <div className='final-page__footer'>
                <Rating />
                <Link to='/' className='link btn btn_theme_transparent btn_size_small final-page__link' >Вернуться на главную</Link>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    resetReducers: () => dispatch(resetReducers())
  }
}

export default connect(null, mapDispatchToProps)(FinalPage);