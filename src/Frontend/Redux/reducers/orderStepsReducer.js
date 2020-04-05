const initState = {
  steps: [
    {
      stepName: 'Билеты',
      stepIndex: 1,
      active: true,
      bigBlockSize: true,
    },
    {
      stepName: 'Пассажиры',
      stepIndex: 2,
      active: false,
      bigBlockSize: false,
    },
    {
      stepName: 'Оплата',
      stepIndex: 3,
      active: false,
      bigBlockSize: false,
    },
    {
      stepName: 'Проверка',
      stepIndex: 4,
      active: false,
      bigBlockSize: true,
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

  if (action.type === 'RESET_REDUCERS') {
    return {
      steps: [
        {
          stepName: 'Билеты',
          stepIndex: 1,
          active: true,
          bigBlockSize: true,
        },
        {
          stepName: 'Пассажиры',
          stepIndex: 2,
          active: false,
          bigBlockSize: false,
        },
        {
          stepName: 'Оплата',
          stepIndex: 3,
          active: false,
          bigBlockSize: false,
        },
        {
          stepName: 'Проверка',
          stepIndex: 4,
          active: false,
          bigBlockSize: true,
        },
      ]
    }
  }

  return state
}