import * as types from './types'

export function addTodo() {
  return {
    type: types.ADD_TODO,
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
