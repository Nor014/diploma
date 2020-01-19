import React from 'react';
import { connect } from 'react-redux';
import { getLocations, clearDirectionList } from '../../../Redux/actions/actions';

class DirectionInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listState: 'hidden',
    }
  }

  inputOnFocus = () => {
    this.setState(prevState => ({ ...prevState, listState: 'visible' }),
      () => document.addEventListener('mousedown', this.closeList))
  }

  closeList = (event) => {
    if (!this.directionInput.contains(event.target)) {
      this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
        () => document.removeEventListener('mousedown', this.clickDetect))
    }
  }

  selectFromList = (event) => {
    this.props.selectFromList(event);

    const { name } = event.target;
    this.props.clearList(name);

    this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
      () => document.removeEventListener('mousedown', this.clickDetect))
  }

  onListBlur = (event) => {
    this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
      () => document.removeEventListener('mousedown', this.clickDetect))  
  }

  onInputChange = (event) => {
    this.props.onChange(event);

    let { value } = event.target;
    let { name } = this.props;

    if (value.length > 0) {
      let fromComponent = 'directionInput';
      let url = `https://netology-trainbooking.herokuapp.com/routes/cities?name=${value}`;

      this.props.getLocations(fromComponent, url, name);
    } else {
      this.props.clearList(name);
    }
  }

  render() {
    const { parentClass, inputClass, placeholder, value, name } = this.props;
    const directionList = this.props.directionState[name];
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
          value={value}
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
                    type='button' onClick={(event) => this.selectFromList(event)} name={name} value={el.name}
                    onBlur={this.onListBlur}>{el.name}</button>
                  : <button className='btn direction-input__list-btn'
                    type='button' onClick={(event) => this.selectFromList(event)} name={name} value={el.name}>{el.name}</button>}
              </li>)}
          </ul>}
      </div>
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
    getLocations: (fromComponent, url, name) => dispatch(getLocations(fromComponent, url, name)),
    clearList: (name) => dispatch(clearDirectionList(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionInput)