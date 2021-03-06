import React from 'react';
import { connect } from 'react-redux';
import { getLocations, clearDirectionList, setCityParams, setDirectionInputValue, clearDirectionInput, clearCityParams, cancelFetchData } from '../../../Redux/actions/actions';

class DirectionInput extends React.Component {
  constructor(props) {
    super(props)
    this.directionInputRef = React.createRef();
  }

  inputOnFocus = () => { // отслеживаем клик 
    document.addEventListener('mousedown', this.closeList)
  }

  closeList = (event) => {
    if (!this.directionInputRef.current.contains(event.target)) {
      // если в инпуте произошли изменения выбираем первый вариант из списка или очищаем инпут при отсутствии списка
      if (this.props.findTicketsState[this.props.paramsName] === null) {
        this.setFirstLocationInList();
      }
      document.removeEventListener('mousedown', this.closeList)
    }
  }

  selectFromList = (value, id) => {
    const name = this.props.name;

    this.props.setCityParams(id, this.props.paramsName);
    this.props.setDirectionInputValue(value, name);
    this.props.clearList(name);

    document.removeEventListener('mousedown', this.closeList)
  }

  inputValueToValidView = (value) => {
    let result = [];

    value.split('').forEach((letter, index) => {
      result.push(index === 0 ? letter.toUpperCase() : letter.toLowerCase())
    })

    return result.join('');
  }

  onInputChange = (event) => {
    const { value, name } = event.target;

    const validValue = this.inputValueToValidView(value); // Первая буква большая, остальные маленькие - для совпадения с подсказкой при вводе
    this.props.setDirectionInputValue(validValue, name);

    // удаляем id предыдущего выбранного города, если такой установлен, так как значение изменилось
    if (this.props.findTicketsState[this.props.paramsName] !== null) {
      this.props.clearCityParams(this.props.paramsName);
    }

    const fromComponent = 'directionInput';
    const url = `https://netology-trainbooking.herokuapp.com/routes/cities?name=${value.toLowerCase()}`;

    if (value.length !== 0) {
      this.props.getLocations(fromComponent, url, name);
    } else { // если нет значения инпута, отменяем прошлый запрос, очищаем лист доступных городов
      this.props.cancelFetchData(name);
      this.props.clearList(name);
    }
  }

  setFirstLocationInList = () => {
    const firstLocationInList = this.props.directionState[this.props.name].list[0] || null;
    const value = this.props.directionState[this.props.name].value;

    if (firstLocationInList) {
      this.selectFromList(firstLocationInList.name, firstLocationInList._id)
    } else if (value !== '') {
      // если списка нет очищаем инпут, отменяем последний запрос на сервер
      this.props.clearDirectionInput(this.props.name);
      this.props.cancelFetchData(this.props.name);
    }
  }

  onListBlur = () => {
    this.setFirstLocationInList();
    document.removeEventListener('mousedown', this.closeList)
  }

  onInputBlur = () => {
    if (this.props.directionState[this.props.name].list.length === 0) {
      this.closeList(false);
    }
  }

  render() {
    const { parentClass, inputClass, placeholder, name, directionState, findTicketsState } = this.props;
    const directionList = directionState[name].list;
    const inputValue = directionState[name].value;
    const loading = directionState[name].loading;
    const showHint = inputValue !== '' && findTicketsState[this.props.paramsName] === null && !loading;
    const firstLocationInList = directionList[0] !== undefined ? directionList[0].name : null;

    const inputClassName = inputClass ? `input ${inputClass}` : 'input';
    const parentClassName = parentClass
      ? `direction-input ${parentClass} ${loading
        ? 'list-preloader'
        : 'list-preloader list-preloader_hidden'}`
      : `direction-input ${loading
        ? 'list-preloader'
        : 'list-preloader list-preloader_hidden'}`;

    return (
      <div className={parentClassName} ref={this.directionInputRef} >
        <input type="text"
          className={inputClassName}
          placeholder={placeholder}
          value={inputValue}
          name={name}
          onFocus={this.inputOnFocus}
          onChange={(event) => this.onInputChange(event)}
          autoComplete='off'
          required
          onBlur={this.onInputBlur} />

        <span className='direction-input__hint-span'>{firstLocationInList}</span>

        <ul className='direction-input__list'>
          {directionList.length > 0
            ? directionList.map((direction, index) =>
              <li className="direction-input__list-item" key={direction._id}>
                <button className='btn direction-input__list-btn'
                  type='button'
                  onClick={(event) => this.selectFromList(event.target.value, direction._id)}
                  name={name}
                  value={direction.name}
                  onBlur={index === directionList.length - 1 ? this.onListBlur : null}>{direction.name}</button>
              </li>)
            : showHint && <p className='direction-input__hint'>Направления не найдены</p>}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { directionState, findTicketsState } = state;
  return {
    directionState: directionState,
    findTicketsState: findTicketsState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLocations: (fromComponent, url, name) => dispatch(getLocations(fromComponent, url, name)),
    clearList: (name) => dispatch(clearDirectionList(name)),
    clearDirectionInput: (name) => dispatch(clearDirectionInput(name)),
    clearCityParams: (name) => dispatch(clearCityParams(name)),
    setCityParams: (id, paramsName) => dispatch(setCityParams(id, paramsName)),
    setDirectionInputValue: (value, name) => dispatch(setDirectionInputValue(value, name)),
    cancelFetchData: (params) => dispatch(cancelFetchData(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionInput)