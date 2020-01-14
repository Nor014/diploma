import React from 'react';
import Input from '../Input/Input';

export default class FindTickets extends React.Component {

  render() {
    let { fromComponent } = this.props;
    let componentClass = `find-tickets ${fromComponent === 'Welcome'
      ? 'find-tickets_direction_column'
      : 'find-tickets_direction_row'}`

    return (
      <form className={componentClass}>
        <div className='find-tickets__inner'>
          <div className="find-tickets__content">
            <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Направление</p>
            <div className="find-tickets__input-group">
              <Input className='find-tickets__input-wrap' placeholder='Откуда' withLabel='false' iconClass='input_type_direction' />
              <button className='btn find-tickets__change-direction-btn' />
              <Input className='find-tickets__input-wrap' placeholder='Куда' withLabel='false' iconClass='input_type_direction' />
            </div>
          </div>

          <div className="find-tickets__content">
            <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Дата</p>
            <div className="find-tickets__input-group">
              <Input className='find-tickets__input-wrap' placeholder='ДД/ММ/ГГ' withLabel='false' iconClass='input_type_data' />
              <Input className='find-tickets__input-wrap' placeholder='ДД/ММ/ГГ' withLabel='false' iconClass='input_type_data' />
            </div>
          </div>
        </div>

        <div className="find-tickets__btn-inner">
          <button className="btn btn_size_big btn_theme_yellow text text_transform_uppercase" type='button'>Найти билеты</button>
        </div>
      </form>
    )
  }
}