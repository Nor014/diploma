import React from "react";

export default class HoverDropDown extends React.Component {
  render() {
    const { currentValue, listItems, selectItem, name } = this.props;

    return (
      <div className='hover-drop-down'>
        <p className='hover-drop-down__current-value'>{currentValue}</p>
        <div className='hover-drop-down__list'>
          {listItems.map((item, index) =>
            <button key={index}
              type='button'
              className="btn hover-drop-down__btn"
              value={item.value}
              data-name={name || null}
              onClick={selectItem}>{item.innerText}
            </button >)}
        </div>
      </div >
    )
  }
}