import React from 'react';

import OptionCheckBox from '../../../../../../GeneralBlocks/OptionCheckBox/OptionCheckBox';
import SvgIcon from '../../../../../../GeneralBlocks/SvgIcon/SvgIcon';
import CoachScheme from '../CoachScheme/CoachScheme';


export default class CoachDetails extends React.Component {
  render() {
    const { activeCoach, activeCoachClass } = this.props;
    const selectedAdditionalServices = activeCoach.servicesInfo.filter(service => {
      if (service.available && !service.inTicketCost && service.checked) {
        return service
      }
    })

    console.log(activeCoach)

    return (
      <React.Fragment>
        <div className="coach__details">
          <div className="coach__details-wagon coach__details-item">
            <div className="coach__details-wagon-inner">
              <p className="coach__details-wagon-name">{activeCoach.coach.name}</p>
              <p className="coach__details-wagon-label">Вагон</p>
            </div>
          </div>

          <div className="coach__details-seats coach__details-item">
            <p className="coach__section-title">Места <span className='coach__seats-amount'>{activeCoach.coach.available_seats}</span></p>
            {activeCoach.seatsInfo.map((el, index) => {
              return <p key={index} className='coach__text'>{el.name} <span className='coach__seats-amount'>{el.amount}</span></p>
            })}
          </div>

          <div className="coach__details-cost coach__details-item">
            <p className="coach__section-title">Стоимость</p>
            {activeCoach.seatsInfo.map((el, index) => {
              return <p key={index} className='coach__text coach__cost-value'>{el.cost} <span className='coach__seats-ruble'>₽</span></p>
            })}
          </div>

          <div className="coach__details-services coach__details-item">
            <p className="coach__section-title">Обслуживание</p>
            <div className="coach__details-services-list ">
              {activeCoach.servicesInfo
                .filter(service => service.available)
                .map((service, index) => {
                  return (
                    <OptionCheckBox key={index}
                      className='coach__details-service-item'
                      hint={service.hint}
                      disabled={service.inTicketCost}
                      name={service.name}
                      checked={service.checked}>
                      <SvgIcon icon={service.name} className='option-checkbox__icon' />
                    </OptionCheckBox>)
                })
              }
            </div>
          </div>
        </div>

        <CoachScheme
          seatsData={activeCoach.seats}
          wagonName={activeCoach.coach.name}
          coachClass={activeCoach.coach.class_type}
          coachClassName={activeCoachClass}
          selectedServises={selectedAdditionalServices}
          changes={activeCoach.seats.filter(el => el.selected)}
        />
        
      </React.Fragment>
    )
  }
} 