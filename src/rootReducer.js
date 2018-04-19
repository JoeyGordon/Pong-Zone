import { combineReducers } from 'redux';

import user from './reducers/user';

const pongZone = combineReducers({
    user,
})

const rootReducer = (state, action) => {
    return pongZone(state, action);
};

export default rootReducer;