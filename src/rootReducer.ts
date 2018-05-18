import { combineReducers } from 'redux';

import user from './reducers/user';
import users from './reducers/users';
import matches from './reducers/matches';
import teams from './reducers/teams';
import loading from './reducers/loading';
import User from './models/user';

export interface RootState {
    user: User
}

const pongZone = combineReducers({
    user,
    users,
    matches,
    teams,
    loading,
})

const rootReducer = (state, action) => {
    return pongZone(state, action);
};

export default rootReducer;