import * as matchesActionTypes from '../actionTypes/matches';
import * as userActionTypes from '../actionTypes/user';

const getInitialState = () => ({
    matches: [],
});

export default function matches(state = getInitialState(), action = {}) {
    switch(action.type) {
        // TODO: add case statements to respond to actions
        case userActionTypes.LOG_OUT_USER:
            return getInitialState();
        case matchesActionTypes.SET_MATCHES:
            return action.data
        default:
            return state;
    }
}