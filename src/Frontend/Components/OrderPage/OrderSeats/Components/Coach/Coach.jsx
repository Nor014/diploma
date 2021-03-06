import React from 'react';
import { connect } from 'react-redux';

import CoachClassBtn from './Components/CoachClassBtn/CoachClassBtn';
import CoachWagons from './Components/CoachWagons/CoachWagons';
import CoachDetails from './Components/CoachDetails/CoachDetails';

import { changeCoachClass, changeCoachWagon } from '../../../../../Redux/actions/actions';


class Coach extends React.Component {
  onChangeClassBtn = (event) => {
    const coachClass = event.currentTarget.dataset.class;
    this.props.changeCoachClass(coachClass, this.props.direction);
  }

  onChangeWagonBtn = (event) => {
    const wagonId = event.currentTarget.dataset.id;
    this.props.changeCoachWagon(wagonId, this.props.direction);
  }

  render() {
    const seatsData = this.props.seatsData.data.find(el => el.name === this.props.direction).directionSeatsData;
    const activeCoachClass = seatsData.find(el => el.active);
    const renderCoachCondition = activeCoachClass && activeCoachClass.data.length > 0;
    const activeCoach = activeCoachClass ? activeCoachClass.data.find(el => el.coach.active) : null;

    return (
      <div className="coach">
        <h2 className="coach__title">Тип вагона</h2>

        <div className="coach__classes">
          {seatsData.map((el, index) => { /* кнопки выбора класса */
            return <CoachClassBtn key={index} data={el} onClick={this.onChangeClassBtn} />
          })}
        </div>

        {renderCoachCondition /* выбор вагона */
          ? <CoachWagons
            activeCoachClass={activeCoachClass}
            onClick={this.onChangeWagonBtn} />
          : null}

        {activeCoach /* информация о вагоне, выбор мест */
          ? <CoachDetails
            activeCoach={activeCoach}
            activeCoachClass={activeCoachClass.name}
            direction={this.props.direction} />
          : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { seatsData } = state
  return {
    seatsData: seatsData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCoachClass: (coachClass, direction) => dispatch(changeCoachClass(coachClass, direction)),
    changeCoachWagon: (id, direction) => dispatch(changeCoachWagon(id, direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coach)