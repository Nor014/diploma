import React from 'react';
import DateInput from '../DateInput/DateInput';

export default class FindTickets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: {
        fromLocation: '',
        toLocation: ''
      },
      date: {
        fromDate: null,
        toDate: null
      }
    }
  }

  changeDate = (data) => {
    let { inputTargetValue, date } = data;

    this.setState(prevState => {
      let newDate = { ...prevState.date, [inputTargetValue]: date };
      return { ...prevState, date: newDate }
    }, () => console.log(this.state))
  }

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
              <div className='find-tickets__input-wrap'>
                <input type="text" className='input find-tickets__input input_type_direction' placeholder='Откуда' />
                <label></label>
              </div>
              <button className='btn find-tickets__change-direction-btn' />
              <div className='find-tickets__input-wrap'>
                <input type="text" className='input find-tickets__input input_type_direction' placeholder='Куда' />
                <label></label>
              </div>
            </div>
          </div>

          <div className="find-tickets__content">
            <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Дата</p>
            <div className="find-tickets__input-group">
              <DateInput inputClass='find-tickets__input' changeDate={this.changeDate} inputTargetValue='fromDate' />
              <DateInput inputClass='find-tickets__input' changeDate={this.changeDate} inputTargetValue='toDate' />
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