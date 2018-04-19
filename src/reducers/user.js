import * as userActionTypes from '../actionTypes/user';

const getInitialState = () => ({
    userId: null,
    createdDate: null,
    matchess: [],
    rating: null,
    wins: null,
    losses: null,
});

export default function user(state = getInitialState(), action = {}) {
    switch(action.type) {
        // TODO: add case statements to respond to actions
        case userActionTypes.SET_USER:
        console.log('action.data', action.data);
            // do some stuff
            return {

            }
        default:
            return state;
    }
}