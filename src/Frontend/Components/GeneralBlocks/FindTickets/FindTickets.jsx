import React from 'react';
import Input from '../Input/Input';

export default class FindTickets extends React.Component {

  render() {
    let { fromComponent } = this.props;
    let componentClass = `find-tickets ${fromComponent === 'Welcome' && 'find-tickets_column-direction'}`

    return (
      <form action="" className={componentClass}>
        <div className="find-tickets__inner">
          <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Направление</p>
          <div className="find-tickets__input-group">
            <Input className='find-tickets__input input_type_direction' placeholder='Откуда' />
            <Input className='find-tickets__input input_type_direction' placeholder='Куда' />
          </div>
        </div>

        <div className="find-tickets__inner">
          <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Дата</p>
          <div className="find-tickets__input-group">
            <Input className='find-tickets__input input_type_data' placeholder='ДД/ММ/ГГ' />
            <Input className='find-tickets__input input_type_data' placeholder='ДД/ММ/ГГ' />
          </div>
        </div>


      </form>
    )
  }
}