import React from 'react';
import { connect } from 'react-redux';

import CoachClassBtn from './CoachClassBtn/CoachClassBtn';
import CoachWagons from './CoachWagons/CoachWagons';
import CoachDetails from './CoachDetails/CoachDetails';
import SvgIcon from '../../GeneralBlocks/SvgIcon/SvgIcon';
import OptionCheckBox from '../../GeneralBlocks/OptionCheckBox/OptionCheckBox';
import CoachScheme from '../CoachScheme/CoachScheme';

import { changeCoachClass, changeCoachWagon } from '../../../Redux/actions/actions';

import { ReactComponent as SecondClassScheme } from '../Coach/coach_scheme_second-class.svg';


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
        {/* информация о вагоне */}
        {activeCoach
          ? <CoachDetails activeCoach={activeCoach} />
          : null
        }

        <CoachScheme seatsData={seatsData}>
          <SecondClassScheme className='coach-scheme__svg' />
        </CoachScheme>
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