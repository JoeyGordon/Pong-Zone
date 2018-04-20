import * as usersActionTypes from '../actionTypes/users';

const getInitialState = () => ([]);

export default function users(state = getInitialState(), action = {}) {
  switch (action.type) {
    case usersActionTypes.SET_ALL_USERS:
      return action.data
    default:
      return state;
  }
}