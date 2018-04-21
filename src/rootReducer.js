import { combineReducers } from 'redux';

import user from './reducers/user';
import users from './reducers/users';
import matches from './reducers/matches';

const pongZone = combineReducers({
    user,
    users,
    matches,
})

const rootReducer = (state, action) => {
    return pongZone(state, action);
};

export default rootReducer;