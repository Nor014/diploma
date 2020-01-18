import React from 'react';

export default class Contacts extends React.Component {

  render() {
    return (
      <div className="contacts" id='contacts'>
        <h2 className='contacts__title text text_level_third text_theme_white'>Свяжитесь с нами</h2>
        <ul className="contacts__list">
          <li className="contacts__list-item contacts_icon_phone"><a href="tel:88000000000" className="link">8 (800) 000 00 00</a></li>
          <li className="contacts__list-item contacts_icon_mail"><a href="mailto:inbox@mail.ru" className='link'>inbox@mail.ru</a></li>
          <li className="contacts__list-item contacts_icon_skape">tu.train.tickets</li>
          <li className="contacts__list-item contacts_icon_location">г. Москва <br />ул. Московская <br />27-35 555 555</li>
        </ul>
      </div>
    )
  }
}