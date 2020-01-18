import React from 'react';

export default class DirectionInput extends React.Component {
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
    this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
      () => document.removeEventListener('mousedown', this.clickDetect))
  }

  onListBlur = (event) => {
    if (event.target.classList.contains('direction-input__last-btn')) {
      this.setState(prevState => ({ ...prevState, listState: 'hidden' }),
        () => document.removeEventListener('mousedown', this.clickDetect))
    }
  }

  render() {
    const { parentClass, inputClass, placeholder, value, name } = this.props;
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
          onBlur={this.inputOnBlur}
          onChange={(event) => this.props.onChange(event)}
          autoComplete='off'
          onKeyDown={this.inputOnKeyDown} />

        <ul className={listClassName}>
          <li className="direction-input__list-item">
            <button className='btn direction-input__list-btn'
              type='button' onClick={(event) => this.selectFromList(event)} name={name} value='Vjcnrf' >Vjcnrf</button>
          </li>
          <li className="direction-input__list-item">
            <button className='btn direction-input__list-btn'
              type='button' onClick={(event) => this.selectFromList(event)} name={name} value='Vjcnrf' >Vjcnrf</button>
          </li>
          <li className="direction-input__list-item">
            <button className='btn direction-input__list-btn direction-input__last-btn'
              type='button' onClick={(event) => this.selectFromList(event)} name={name} value='Vjcnrf' onBlur={this.onListBlur}>Vjcnrf</button>
          </li>
        </ul>
      </div>
    )
  }
}