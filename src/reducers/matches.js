import * as matchesActionTypes from '../actionTypes/matches';
import * as userActionTypes from '../actionTypes/user';


export default function matches(state = [], action = {}) {
    switch(action.type) {
        // TODO: add case statements to respond to actions
        case userActionTypes.LOG_OUT_USER:
            return [];
        case matchesActionTypes.ADD_MATCH:
            state.push(action.data);
            return state;
        case matchesActionTypes.SET_MATCHES:
            return action.data
        default:
            return state;
    }
}