import React from 'react';
import Logo from '../GeneralBlocks/Logo/Logo';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header" id='header'>
        <div className="header__logo-inner container"><Logo /></div>
        <nav className="header__nav">
          <ul className="header__nav-list container">
            <li className="header__nav-list-item"><a href="#about-us" className='link header__link'>О нас</a></li>
            <li className="header__nav-list-item"><a href="#how-it-works" className='link header__link'>Как это работает</a></li>
            <li className="header__nav-list-item"><a href="#reviews" className='link header__link'>Отзывы</a></li>
            <li className="header__nav-list-item"><a href="#contacts" className='link header__link'>Контакты</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}