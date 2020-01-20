import React from 'react';
import DateInput from '../DateInput/DateInput';
import DirectionInput from '../DirectionInput/DirectionInput';
import { connect } from 'react-redux';
import { changeDirectionValues } from '../../../Redux/actions/actions';

class FindTickets extends React.Component {
  render() {
    let { fromComponent } = this.props;
    let componentClass = `find-tickets ${fromComponent === 'Welcome'
      ? 'find-tickets_direction_column'
      : 'find-tickets_direction_row'}`

    // console.log(this.props)

    return (
      <form className={componentClass}>
        <div className='find-tickets__inner'>
          <div className="find-tickets__content">
            <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Направление</p>
            <div className="find-tickets__input-group">
              <DirectionInput
                parentClass='find-tickets__direction-input'
                inputClass='input_size_big input_type_direction'
                placeholder='Откуда'
                name='fromLocation' />

              <button className='btn find-tickets__change-direction-btn' type='button'
                onClick={() => this.props.changeDirectionValues()} />

              <DirectionInput
                parentClass='find-tickets__direction-input'
                inputClass='input_size_big input_type_direction'
                placeholder='Куда'
                name='toLocation' />
            </div>
          </div>

          <div className="find-tickets__content">
            <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Дата</p>
            <div className="find-tickets__input-group">
              <DateInput inputClass='input_size_big' name='fromDate' />
              <DateInput inputClass='input_size_big' name='toDate' />
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

const mapStateToProps = (state) => {
  const { directionState, findTicketsStore } = state;
  return {
    findTicketsStore: findTicketsStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDirectionValues: () => dispatch(changeDirectionValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTickets)