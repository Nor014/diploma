import React from 'react';
import { ReactComponent as YoutubeIcon } from './subscription_icon_youtube.svg';
import { ReactComponent as InIcon } from './subscription_icon_in.svg';
import { ReactComponent as GoogleIcon } from './subscription_icon_google.svg';
import { ReactComponent as FacebookIcon } from './subscription_icon_facebook.svg';
import { ReactComponent as TwiterIcon } from './subscription_icon_twiter.svg';


export default class Subscription extends React.Component {

  render() {

    return (
      <div className="subscription">
        <h2 className='subscription__title text text_level_third text_theme_white'>Подписка</h2>
        <p className='subscription__subtitle'>Будьте в курсе событий</p>

        <form action="" className='subscription__form'>
          <input type="text" className='input input_size_big subscription__input' placeholder='email' />
          <button className="btn subscription__btn btn_theme_transparent btn_size_middle" type='button'>отправить</button>
        </form>

        <h2 className="subscription__title text text_level_third text_theme_white">Подписывайтесь на нас</h2>

        <ul className="subscription__list">
          <li className="subscription__list-item"><a href="#" className="link subscription__list-link">
            <YoutubeIcon className='subscription__icon' />
          </a></li>
          <li className="subscription__list-item"><a href="#" className="link subscription__list-link">
            <InIcon className='subscription__icon' />
          </a></li>
          <li className="subscription__list-item"><a href="#" className="link subscription__list-link">
            <GoogleIcon className='subscription__icon' />
          </a></li>
          <li className="subscription__list-item"><a href="#" className="link subscription__list-link">
            <FacebookIcon className='subscription__icon' />
          </a></li>
          <li className="subscription__list-item"><a href="#" className="link subscription__list-link">
            <TwiterIcon className='subscription__icon' />
          </a></li>
        </ul>
      </div>
    )
  }
}