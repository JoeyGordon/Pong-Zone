import * as teamsActionTypes from '../actionTypes/teams';

const getInitialState = () => ([]);

export default function teams(state = getInitialState(), action = {}) {
  switch (action.type) {
    case teamsActionTypes.SET_ALL_teams:
      return action.data
    default:
      return state;
  }
}