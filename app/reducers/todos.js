import createReducer from '../lib/createReducer'
import DateHelper from '../lib/DateHelper'
import * as types from '../actions/types'

const GLOBAL = require("./Globals")

let init = GLOBAL.init

export const todoCount = createReducer(0, {
  [types.ADD_TODO](state, action) {
    return state + 1;
  }
});

export const activeDurations = createReducer(init.DURATIONS, {
  [types.SET_ACTIVE_DURATIONS](state, action) {
    return action.state;
  }
});
export const travelDates = createReducer([""], {
  [types.SET_TRAVEL_DATES](state, action) {
    return action.state;
  }
});
export const activeUsers = createReducer(init.USERS, {
  [types.SET_ACTIVE_USERS](state, action) {
    return action.state;
  },
  [types.SET_USERS](state, action) {
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
