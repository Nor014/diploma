import React from 'react';
import { connect } from 'react-redux';
import { changeOrderStep } from '../../../Redux/actions/actions';

class OrderSteps extends React.Component {
  componentDidMount = () => {
    window.addEventListener('popstate', this.locationDetect);
  }

  componentWillUnmount = () => {
    window.removeEventListener('popstate', this.locationDetect);
  }

  locationDetect = (event) => { // при нажатии кнопок назад/вперед отслеживаем текущий адрес страницы для изменения текущего шага заказа
    const currentLocation = event.target.location.pathname;
    let currentStepIndex;

    if (currentLocation === '/order/confirmation') {
      currentStepIndex = 4;
    } else if (currentLocation === '/order/payment') {
      currentStepIndex = 3;
    } else if (currentLocation === '/order/registration') {
      currentStepIndex = 2;
    } else {
      currentStepIndex = 1;
    }

    this.props.changeOrderStep(currentStepIndex);
  }

  render() {
    const { steps } = this.props.orderStepsData;

    return (
      <div className="order-steps">
        {steps.map((step, index) => {
          return (
            <div key={index}
              className={`order-step__item ${step.bigBlockSize
                ? 'order-steps_size_big'
                : 'order-steps_size_small'} ${step.active ? 'order-steps_active' : null}`}>
              <p className="order-step__text text text_theme_white text_level_third">{step.stepName}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { orderStepsData } = state;
  return {
    orderStepsData: orderStepsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeOrderStep: (stepIndex) => dispatch(changeOrderStep(stepIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSteps)