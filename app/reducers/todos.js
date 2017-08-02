import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

const GLOBAL = require("../reducers/Globals")

let init = GLOBAL.init

export const todoCount = createReducer(0, {
  [types.ADD_TODO](state, action) {
    return state + 1;
  }
});

export const activeUsers = createReducer(init.USERS, {
  [types.SET_ACTIVE_USERS](state, action) {
    return action.state;
  }
});

export const userFilteredTodos = createReducer(init.FIELDS, {
  [types.SET_USER_FILTERED_TODOS](state, action) {
    return action.state;
  }
});
export const activeTranslate = createReducer(init.TRANSLATE, {
  [types.SET_ACTIVE_TRANSLATE](state, action) {
    return action.state;
  }
});
export const filteredTranslations = createReducer({}, {
  [types.SET_FILTERED_TRANSLATIONS](state, action) {
    return action.state;
  }
});
