import React from 'react';
import { connect } from 'react-redux';

import CoachClassBtn from './Components/CoachClassBtn/CoachClassBtn';
import CoachWagons from './Components/CoachWagons/CoachWagons';
import CoachDetails from './Components/CoachDetails/CoachDetails';

import { changeCoachClass, changeCoachWagon } from '../../../../../Redux/actions/actions';


class Coach extends React.Component {

  onChangeClassBtn = (event) => {
    const coachClass = event.currentTarget.dataset.class;
    this.props.changeCoachClass(coachClass);
  }

  onChangeWagonBtn = (event) => {
    const wagonId = event.currentTarget.dataset.id;
    this.props.changeCoachWagon(wagonId);
  }

  render() {
    const seatsData = this.props.seatsData;
    const activeCoachClass = seatsData.find(el => el.active);
    const renderCoachCondition = activeCoachClass && activeCoachClass.data.length > 0;
    const activeCoach = activeCoachClass ? activeCoachClass.data.find(el => el.coach.active) : null;

    // console.log(seatsData, activeCoach)

    return (
      <div className="coach">
        <h2 className="coach__title">Тип вагона</h2>

        {/* выбор класса */}
        <div className="coach__classes">
          {seatsData.map((el, index) => {
            return <CoachClassBtn key={index} data={el} onClick={this.onChangeClassBtn} />
          })}
        </div>

        {/* выбор вагона */}
        {renderCoachCondition
          ? <CoachWagons activeCoachClass={activeCoachClass} onClick={this.onChangeWagonBtn} />
          : null
        }

        {/* информация о вагоне, выбор мест */}
        {activeCoach
          ? <CoachDetails activeCoach={activeCoach} activeCoachClass={activeCoachClass.name} />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCoachClass: (coachClass) => dispatch(changeCoachClass(coachClass)),
    changeCoachWagon: (id) => dispatch(changeCoachWagon(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coach)