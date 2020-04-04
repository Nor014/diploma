const initState = {
  steps: [
    {
      stepName: 'Билеты',
      stepIndex: 1,
      active: true,
      bigBlockSize: true,
      complete: false,
      path: '/order'
    },
    {
      stepName: 'Пассажиры',
      stepIndex: 2,
      active: false,
      bigBlockSize: false,
      complete: false,
      path: '/order/registration'
    },
    {
      stepName: 'Оплата',
      stepIndex: 3,
      active: false,
      bigBlockSize: false,
      complete: false,
      path: '/order/payment'
    },
    {
      stepName: 'Проверка',
      stepIndex: 4,
      active: false,
      bigBlockSize: true,
      complete: false,
      path: '/order/confirmation'
    },
  ]
}

export default function orderStepsReducer(state = initState, action) {
  if (action.type === 'CHANGE_ORDER_STEP') {
    const currentStepIndex = action.payload;

    const newState = state.steps.map(el => {
      el.active = el.stepIndex <= currentStepIndex ? true : false
      return el
    })

    return { ...state, steps: newState }
  }

  return state
}