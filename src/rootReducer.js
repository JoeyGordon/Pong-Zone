import { combineReducers } from 'redux';

import user from './reducers/user';
import users from './reducers/users';

const pongZone = combineReducers({
    user,
    users,
})

const rootReducer = (state, action) => {
    return pongZone(state, action);
};

export default rootReducer;