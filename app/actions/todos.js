import * as types from './types'

export function addTodo() {
  return {
    type: types.ADD_TODO,
  }
}
export function setActiveDurations(newActiveDurations) {
  return {
    type: types.SET_ACTIVE_DURATIONS,
    state: newActiveDurations
  }
}
export function setTravelDates(newTravelDates) {
  return {
    type: types.SET_TRAVEL_DATES,
    state: newTravelDates
  }
}
export function setActiveUsers(newActiveUsers) {
  return {
    type: types.SET_ACTIVE_USERS,
    state: newActiveUsers
  }
}
export function setUserFilteredTodos(newTodos) {
  return {
    type: types.SET_USER_FILTERED_TODOS,
    state: newTodos
  }
}
export function setActiveTranslate(newActiveTranslate) {
  return {
    type: types.SET_ACTIVE_TRANSLATE,
    state: newActiveTranslate
  }
}
export function setFilteredTranslations(newTranslations) {
  return {
    type: types.SET_FILTERED_TRANSLATIONS,
    state: newTranslations
  }
}
