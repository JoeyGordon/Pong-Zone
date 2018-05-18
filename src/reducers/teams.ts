import * as teamsActionTypes from '../actionTypes/teams';

const getInitialState = () => ([]);

export default function teams(state = getInitialState(), action) {
  switch (action.type) {
    case teamsActionTypes.SET_ALL_TEAMS:
      return action.data;
    case teamsActionTypes.ADD_TEAM:
      return state.push(action.data);
    case teamsActionTypes.UPDATE_TEAMS:
    // we'll send in the entire team, replace the existing representation with the one passed in
    default:
      return state;
  }
}