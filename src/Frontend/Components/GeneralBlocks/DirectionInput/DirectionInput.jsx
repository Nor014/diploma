import React from 'react';

export default class DirectionInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listState: 'hidden'
    }
  }

  inputOnFocus = () => {
    this.setState(prevState => ({ ...prevState, listState: 'visible' }))
  }

  inputOnBlur = () => {
    this.setState(prevState => ({ ...prevState, listState: 'hidden' }))
  }

  render() {
    const { parentClass, inputClass, placeholder, value } = this.props;
    const parentClassName = parentClass ? `direction-input ${parentClass}` : 'direction-input';
    const inputClassName = inputClass ? `input ${inputClass}` : 'input';
    const listClassName = this.state.listState === 'visible'
      ? 'direction-input__list'
      : 'direction-input__list direction-input__list_hidden'

    return (
      <div className={parentClassName}>
        <input type="text"
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onFocus={this.inputOnFocus}
          onBlur={this.inputOnBlur} />
        <label></label>

        <ul className={listClassName}>
          <li className="direction-input__list-item">
            <button className='btn direction-input__list-btn'>Vjcnrf</button>
          </li>
          <li className="direction-input__list-item">
            <button className='btn direction-input__list-btn'>Vjcnrf</button>
          </li>
          <li className="direction-input__list-item">
            <button className='btn direction-input__list-btn'>Vjcnrf</button>
          </li>
        </ul>
      </div>
    )
  }
}