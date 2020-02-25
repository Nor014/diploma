import React from "react";
import { ReactComponent as OpenIcon } from './drop-down__icon.svg';

export default class DropDown extends React.Component {
  constructor() {
    super()
    this.state = { active: false }
    this.dropDownBodyContentRef = React.createRef();
  }

  onBtnClick = () => {
    this.setState(prevState => {
      return { ...prevState, active: !prevState.active }
    })

    // Вычисление высоты drop-down
    const dropDownBody = this.dropDownBodyContentRef.current.parentNode;
    const dropDownBodyHeight = this.dropDownBodyContentRef.current.offsetHeight;

    dropDownBody.style.height = this.state.active ? 0 : dropDownBodyHeight + 'px';
  }

  render() {
    const { headContent, className } = this.props;
    const dropDownClass = this.state.active ? `drop-down drop-down_active ${className}` : `drop-down ${className}`;
    const dropDownTitleClass = headContent.titleClass ? `drop-down__title ${headContent.titleClass}` : 'drop-down__title';

    return (
      <div className={dropDownClass}>
        <div className="drop-down__head">
          <p className={dropDownTitleClass}>{headContent.title}</p>

          {headContent.date
            ? <span className='drop-down__date-span'>{headContent.date}</span>
            : null}

          <button className="btn drop-down__btn" onClick={this.onBtnClick}>
            <OpenIcon className='drop-down__icon' />
          </button>
        </div>

        <div className='drop-down__body'>
          <div className="drop-down__body-content" ref={this.dropDownBodyContentRef}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}