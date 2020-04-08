import React from 'react';
import Logo from '../GeneralBlocks/Logo/Logo';
import { resetReducers } from '../../Redux/actions/actions';

import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';


class Header extends React.Component {

  onLinkClick = () => {
    if (window.location.pathname !== '/') { // если переход не с главной страницы очищаем редьюсеры, сбрасываем шаги оформления заказа
      this.props.resetReducers();
    }
  }

  render() {
    return (
      <header className="header" id='header'>
        <div className="header__logo-inner"><Logo /></div>
        <nav className="header__nav">
          <ul className="header__nav-list container">
            <li className="header__nav-list-item"><Link to="/#about-us" className='link header__link' onClick={this.onLinkClick}>О нас</Link></li>
            <li className="header__nav-list-item"><Link to="/#how-it-works" className='link header__link' onClick={this.onLinkClick}>Как это работает</Link></li>
            <li className="header__nav-list-item"><Link to="/#reviews" className='link header__link' onClick={this.onLinkClick}>Отзывы</Link></li>
            <li className="header__nav-list-item"><Link to="/#contacts" className='link header__link' onClick={this.onLinkClick}>Контакты</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    resetReducers: () => dispatch(resetReducers())
  }
}


export default connect(null, mapDispatchToProps)(Header)