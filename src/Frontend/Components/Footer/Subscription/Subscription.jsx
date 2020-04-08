import React from 'react';
import { connect } from 'react-redux';
import { validateParams } from '../../../index';
import { setError, subscribe } from '../../../Redux/actions/actions';

import { ReactComponent as YoutubeIcon } from './subscription_icon_youtube.svg';
import { ReactComponent as InIcon } from './subscription_icon_in.svg';
import { ReactComponent as GoogleIcon } from './subscription_icon_google.svg';
import { ReactComponent as FacebookIcon } from './subscription_icon_facebook.svg';
import { ReactComponent as TwiterIcon } from './subscription_icon_twiter.svg';

import RegistrationInput from '../../GeneralBlocks/RegistrationInput/RegistrationInput';


class Subscription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  onInputChange = (event) => {
    const value = event.target.value;
    this.setState({ email: value });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (validateParams.email.pattern.test(this.state.email)) {
      const url = `https://netology-trainbooking.herokuapp.com/subscribe?email=${this.state.email}`;
      this.props.subscribe('subscription', url);
    } else {
      this.props.setError('error', validateParams.email.errorMessage);
    }
  }

  render() {

    return (
      <div className="subscription">
        <h2 className='subscription__title text text_level_third text_theme_white'>Подписка</h2>
        <p className='subscription__subtitle'>Будьте в курсе событий</p>

        <form action="" onSubmit={this.onFormSubmit} className='subscription__form'>
          <RegistrationInput
            id='email'
            className='input input_size_big subscription__input'
            placeholder='email'
            paramsName='email'
            value={this.state.email}
            onChange={this.onInputChange}
          />

          <button className="btn subscription__btn btn_theme_transparent btn_size_middle" type='submit'>отправить</button>
        </form>

        <h2 className="subscription__title text text_level_third text_theme_white">Подписывайтесь на нас</h2>

        <ul className="subscription__list">
          <li className="subscription__list-item">
            <a href="#" className="link subscription__list-link"><YoutubeIcon className='subscription__icon' /></a>
          </li>
          <li className="subscription__list-item">
            <a href="#" className="link subscription__list-link"><InIcon className='subscription__icon' /></a>
          </li>
          <li className="subscription__list-item">
            <a href="#" className="link subscription__list-link"><GoogleIcon className='subscription__icon' /></a>
          </li>
          <li className="subscription__list-item">
            <a href="#" className="link subscription__list-link"><FacebookIcon className='subscription__icon' /></a>
          </li>
          <li className="subscription__list-item">
            <a href="#" className="link subscription__list-link"><TwiterIcon className='subscription__icon' /></a>
          </li>
        </ul>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setError: (error_type, message) => dispatch(setError(error_type, message)),
    subscribe: (fromComponent, url) => dispatch(subscribe(fromComponent, url))
  }
}

export default connect(null, mapDispatchToProps)(Subscription)