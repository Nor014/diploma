import React from 'react';
import Logo from '../GeneralBlocks/Logo/Logo';
import Subscription from './Subscription/Subscription';
import Contacts from './Contacts/Contacts';


export default class Footer extends React.Component {

  render() {
    return (
      <footer className="footer">
        <div className="footer__top container">
          <div className="footer__top-content ">
            <Contacts />
          </div>
          <div className="footer__top-content">
            <Subscription />
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-inner container">
            <Logo />
            <a href='#header' className="link footer__to-header-link"></a>
            <p className='footer__year'>2020 WEB</p>
          </div>
        </div>
      </footer>
    )
  }
}