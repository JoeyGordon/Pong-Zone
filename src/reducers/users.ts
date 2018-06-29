import * as usersActionTypes from '../actionTypes/users';

const getInitialState = () => ([]);

export default function users(state = getInitialState(), action) {
  switch (action.type) {
    case usersActionTypes.SET_ALL_USERS:
      return action.data;
    case usersActionTypes.UPDATE_USER_MATCHES:
      const newMatch = action.data;
      newMatch.players.forEach(player => {
        const user = state.find((user) => user.id === player.id);
        user.matches.push(newMatch);
      });
      return state;
    default:
      return state;
  }
}