import React from 'react';
import DateInput from '../DateInput/DateInput';
import DirectionInput from '../DirectionInput/DirectionInput';
import { connect } from 'react-redux';
import { changeListsValues } from '../../../Redux/actions/actions';

class FindTickets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: { fromLocation: '', toLocation: '' },
      date: { fromDate: null, toDate: null }
    }
  }

  changeDate = (data) => {
    let { name, value } = data;

    this.setState(prevState => {
      let newDate = { ...prevState.date, [name]: value };
      return { ...prevState, date: newDate }
    })
  }

  changeDirection = (event) => {
    const { name, value } = event.target

    this.setState(prevState => {
      let newDirection = { ...prevState.direction, [name]: value }
      return { ...prevState, direction: newDirection }
    })
  }

  changeDirectionValues = () => {
    this.props.changeListsValues();

    this.setState(prevState => {
      let newFromLocation = prevState.direction.toLocation,
        newToLocation = prevState.direction.fromLocation,
        changedDirection = { ...prevState.direction, fromLocation: newFromLocation, toLocation: newToLocation };

      return { ...prevState, direction: changedDirection };
    })
  }

  selectDirectionFromList = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => {
      let newDirection = { ...prevState.direction, [name]: value }
      return { ...prevState, direction: newDirection }
    })
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
              <DirectionInput
                parentClass='find-tickets__direction-input'
                inputClass='input_size_big input_type_direction'
                placeholder='Откуда'
                name='fromLocation'
                value={this.state.direction.fromLocation}
                onChange={this.changeDirection}
                selectFromList={this.selectDirectionFromList} />

              <button className='btn find-tickets__change-direction-btn' type='button' onClick={this.changeDirectionValues} />

              <DirectionInput
                parentClass='find-tickets__direction-input'
                inputClass='input_size_big input_type_direction'
                placeholder='Куда'
                name='toLocation'
                value={this.state.direction.toLocation}
                onChange={this.changeDirection}
                selectFromList={this.selectDirectionFromList} />
            </div>
          </div>

          <div className="find-tickets__content">
            <p className="find-tickets__label text text_theme_white text_level_third text_weight_300">Дата</p>
            <div className="find-tickets__input-group">
              <DateInput inputClass='input_size_big' changeDate={this.changeDate} name='fromDate' />
              <DateInput inputClass='input_size_big' changeDate={this.changeDate} name='toDate' fromDate={this.state.date.fromDate} />
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
  const { directionState } = state
  return {
    directionState: directionState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeListsValues: () => dispatch(changeListsValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTickets)