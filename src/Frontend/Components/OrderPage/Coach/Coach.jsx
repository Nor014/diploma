import React from 'react';
import { connect } from 'react-redux';

import OptionCheckBox from '../../GeneralBlocks/OptionCheckBox/OptionCheckBox';
import CoachScheme from '../CoachScheme/CoachScheme';

import { changeCoachClass } from '../../../Redux/actions/actions';

import { ReactComponent as FirstClassIcon } from '../Coach/coach_icon_first-class.svg';
import { ReactComponent as SecondClassIcon } from '../Coach/coach_icon_second-class.svg';
import { ReactComponent as ThirdClassIcon } from '../Coach/coach_icon_third-class.svg';
import { ReactComponent as FourthClassIcon } from '../Coach/coach_icon_fourth-class.svg';
import { ReactComponent as AirIcon } from '../Coach/coach_icon_condi.svg';
import { ReactComponent as WifiIcon } from '../Coach/coach_icon_wifi.svg';
import { ReactComponent as LinensIcon } from '../Coach/coach_icon_linens.svg';
import { ReactComponent as EatingIcon } from '../Coach/coach_icon_eating.svg';
import { ReactComponent as SecondClassScheme } from '../Coach/coach_scheme_second-class.svg';


class Coach extends React.Component {

  onChangeClassBtn = (event) => {
    const coachClass = event.currentTarget.dataset.class;
    this.props.changeCoachClass(coachClass)
  }

  render() {
    const seatsData = this.props.seatsData;
    const activeCoachClass = seatsData.find(el => el.active);

    console.log(seatsData)

    return (
      <div className="coach">
        <h2 className="coach__title">Тип вагона</h2>

        <div className="coach__classes">
          {seatsData.map((el, index) => {
            return (
              <button
                className={el.active ? 'coach__class-btn btn coach_btn_active' : 'coach__class-btn btn'}
                key={index}
                onClick={this.onChangeClassBtn}
                data-class={el.class} >

                {el.class === 'fourth'
                  ? <FourthClassIcon className='coach__class-icon' />
                  : null}

                {el.class === 'third'
                  ? <ThirdClassIcon className='coach__class-icon' />
                  : null}

                {el.class === 'second'
                  ? <SecondClassIcon className='coach__class-icon' />
                  : null}

                {el.class === 'first'
                  ? <FirstClassIcon className='coach__class-icon' />
                  : null}

                <p className="coach__class-name">{el.name}</p>
              </button>
            )
          })}
        </div>


        {activeCoachClass && activeCoachClass.data.length > 0
          ? <div className="coach__wagons">
            <div className="coach__wagons-inner">
              <p className="coach__wagons-lable">Вагоны</p>
              <ul className="coach__wagons-list">
                {activeCoachClass.data.map((el, index) => {
                  return <li key={index} className={index === 0 ? 'coach__wagons-item coach_wagon_active' : 'coach__wagons-item'}>
                    <button className='btn coach__wagons-btn'>{el.coach.name}</button>
                  </li>
                })}
              </ul>
            </div>
            <p className="coach__wagons-text">Нумерация вагонов начинается с головы поезда</p>
          </div>
          : null
        }

        

        <div className="coach__details">
          <div className="coach__details-wagon coach__details-item">
            <div className="coach__details-wagon-inner">
              <p className="coach__details-wagon-name">UTNF-152</p>
              <p className="coach__details-wagon-label">Вагон</p>
            </div>
          </div>

          <div className="coach__details-seats coach__details-item">
            <p className="coach__section-title">Места <span className='coach__seats-amount'>11</span></p>
            <p className="coach__text">Верхние <span className='coach__seats-amount'>5</span></p>
            <p className="coach__text">Нижние <span className='coach__seats-amount'>6</span></p>
          </div>

          <div className="coach__details-cost coach__details-item">
            <p className="coach__section-title">Стоимость</p>
            <p className="coach__text coach__cost-value">2890 <span className='coach__seats-ruble'>₽</span></p>
            <p className="coach__text coach__cost-value">5500 <span className='coach__seats-ruble'>₽</span></p>
          </div>

          <div className="coach__details-services coach__details-item">
            <p className="coach__section-title">Обслуживание</p>

            <div className="coach__details-services-list ">
              <OptionCheckBox className='coach__details-service-item' hint='кондиционер' disabled={false}>
                <AirIcon className='option-checkbox__icon' />
              </OptionCheckBox>

              <OptionCheckBox className='coach__details-service-item' hint='wi-fi' disabled={false}>
                <WifiIcon className='option-checkbox__icon' />
              </OptionCheckBox>

              <OptionCheckBox className='coach__details-service-item' hint='белье' disabled={false}>
                <LinensIcon className='option-checkbox__icon' />
              </OptionCheckBox>

              <OptionCheckBox className='coach__details-service-item' hint='питание' disabled={true}>
                <EatingIcon className='option-checkbox__icon' />
              </OptionCheckBox>
            </div>
          </div>
        </div>

        <CoachScheme seatsData={seatsData}>
          <SecondClassScheme className='coach-scheme__svg' />
        </CoachScheme>

      </div >
    )
  }
}

const mapStateToProps = (state) => {

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCoachClass: (coachClass) => dispatch(changeCoachClass(coachClass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coach)