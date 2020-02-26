// загрузка глобального состояния из sessionStorage
export function loadState() {
  try {
    const serializedState = sessionStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  }
  catch (err) {
    return undefined
  }
}

// сохранение состояния в sessionStorage
export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)
    sessionStorage.setItem('state', serializedState)
  }
  catch (err) {
    // ignore
  }
}

