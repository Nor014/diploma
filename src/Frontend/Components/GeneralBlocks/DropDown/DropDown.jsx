import React from "react";

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
    const dropDownClass = className ? `drop-down ${className}` : 'drop-down';
    const dropClass = this.state.active ? 'drop-down__body drop-down__body_active' : 'drop-down__body';

    return (
      <div className={dropDownClass}>
        <div className="drop-down__head">
          <p className="drop-down__title">{headContent.title}</p>
          <button className="btn drop-down__btn" onClick={this.onBtnClick} />
        </div>

        <div className={dropClass}>
          <ul className="">
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
          </ul>
        </div>
      </div>
    )
  }
}