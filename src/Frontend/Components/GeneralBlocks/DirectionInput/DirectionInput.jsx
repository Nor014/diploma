import React from 'react';
import { connect } from 'react-redux';
import { getLocations, clearDirectionList, setCity, setDirectionInputValue } from '../../../Redux/actions/actions';

class DirectionInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listState: 'hidden'
    }
  }

  inputOnFocus = () => {
    this.setState(prevState => ({ ...prevState, listState: 'visible' }),
      () => document.addEventListener('mousedown', this.closeList))
  }

  closeList = (event) => {
    if (!this.directionInput.contains(event.target)) {
      this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
        () => document.removeEventListener('mousedown', this.closeList))
    }
  }

  selectFromList = (event, id) => {
    const { name, value } = event.target;

    this.props.setCity(id, name === 'fromLocation' ? 'from_city_id' : 'to_city_id');
    this.props.setInputValue(value, name);
    this.props.clearList(name);

    this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
      () => document.removeEventListener('mousedown', this.closeList))
  }

  onListBlur = () => {
    this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
      () => document.removeEventListener('mousedown', this.closeList))
  }

  onInputChange = (event) => {
    let { value } = event.target;
    let { name } = this.props;

    this.props.setInputValue(value, name);

    if (value.length > 0) {
      let fromComponent = 'directionInput';
      let url = `https://netology-trainbooking.herokuapp.com/routes/cities?name=${value}`;

      this.props.getLocations(fromComponent, url, name);
    } else {
      this.props.clearList(name);
    }
  }

  // checkInList = () => {
  // }

  render() {
    const { parentClass, inputClass, placeholder, name } = this.props;
    const directionList = this.props.directionState[name].list;
    const inputValue = this.props.directionState[name].value;

    const parentClassName = parentClass ? `direction-input ${parentClass}` : 'direction-input';
    const inputClassName = inputClass ? `input ${inputClass}` : 'input';
    const listClassName = this.state.listState === 'visible'
      ? 'direction-input__list'
      : 'direction-input__list direction-input__list_hidden'

    return (
      <div className={parentClassName} ref={(element) => { this.directionInput = element; }} >
        <input type="text"
          className={inputClassName}
          placeholder={placeholder}
          value={inputValue}
          name={name}
          onFocus={this.inputOnFocus}
          onChange={(event) => this.onInputChange(event)}
          autoComplete='off' />

        {directionList.length > 0 &&
          <ul className={listClassName}>
            {directionList.map((el, index) =>
              <li className="direction-input__list-item" key={el._id}>
                {index === directionList.length - 1
                  ? <button className='btn direction-input__list-btn'
                    type='button' onClick={(event) => this.selectFromList(event, el._id)} name={name} value={el.name}
                    onBlur={this.onListBlur}>{el.name}</button>
                  : <button className='btn direction-input__list-btn'
                    type='button' onClick={(event) => this.selectFromList(event, el._id)} name={name} value={el.name}>{el.name}</button>}
              </li>)}
          </ul>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { directionState } = state;
  return {
    directionState: directionState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLocations: (fromComponent, url, name) => dispatch(getLocations(fromComponent, url, name)),
    clearList: (name) => dispatch(clearDirectionList(name)),
    setCity: (id, paramsName) => dispatch(setCity(id, paramsName)),
    setInputValue: (value, name) => dispatch(setDirectionInputValue(value, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionInput)