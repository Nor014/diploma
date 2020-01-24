import React from "react";
import { ReactComponent as OpenIcon } from './drop-down__icon.svg';

export default class DropDown extends React.Component {
  constructor() {
    super()

    this.state = {
      active: false
    }
  }

  onBtnClick = () => {
    this.setState(prevState => {
      return { ...prevState, active: !prevState.active }
    })
  }

  render() {
    const { headContent, className } = this.props;
    const dropDownClass = this.state.active ? `drop-down drop-down_active ${className}` : `drop-down ${className}`;
    const dropDownTitleClass = headContent.titleClass ? `drop-down__title ${headContent.titleClass}` : 'drop-down__title';

    return (
      <div className={dropDownClass}>
        <div className="drop-down__head">
          <p className={dropDownTitleClass}>{headContent.title}</p>
          <button className="btn drop-down__btn" onClick={this.onBtnClick}>
            <OpenIcon className='drop-down__icon' />
          </button>
        </div>

        <div className='drop-down__body'>
          <div className="drop-down__body-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}