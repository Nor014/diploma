import React from 'react';


export default class CoachWagons extends React.Component {
  render() {
    const { activeCoachClass } = this.props;

    return (
      <div className="coach__wagons">
        <div className="coach__wagons-inner">
          <p className="coach__wagons-lable">Вагоны</p>
          <ul className="coach__wagons-list">
            {activeCoachClass.data.map((wagon, index) => {
              return (
                <li key={index} className={wagon.coach.active ? 'coach__wagons-item coach_wagon_active' : 'coach__wagons-item'}>
                  <button
                    className='btn coach__wagons-btn'
                    data-id={wagon.coach._id}
                    onClick={this.props.onClick}>{wagon.coach.name}</button>
                </li>)
            })}
          </ul>
        </div>
        <p className="coach__wagons-text">Нумерация вагонов начинается с головы поезда</p>
      </div>
    )
  }
} 